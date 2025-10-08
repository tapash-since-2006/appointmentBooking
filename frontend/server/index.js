import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if Supabase credentials are available
const supabaseCredentialsAvailable = supabaseUrl && supabaseServiceKey;

let supabase;
if (supabaseCredentialsAvailable) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

// API routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    supabaseConnected: supabaseCredentialsAvailable
  });
});

// Task stats endpoint
app.get('/api/stats/:userId', async (req, res) => {
  try {
    if (!supabaseCredentialsAvailable) {
      return res.status(503).json({ error: 'Supabase connection not available' });
    }

    const { userId } = req.params;
    
    // Get total tasks count
    const { data: totalTasks, error: totalError } = await supabase
      .from('tasks')
      .select('id', { count: 'exact' })
      .eq('user_id', userId);
      
    if (totalError) throw totalError;
    
    // Get completed tasks count
    const { data: completedTasks, error: completedError } = await supabase
      .from('tasks')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('completed', true);
      
    if (completedError) throw completedError;
    
    // Get tasks completed today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: todayTasks, error: todayError } = await supabase
      .from('tasks')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('completed', true)
      .gte('updated_at', today.toISOString());
      
    if (todayError) throw todayError;
    
    // Calculate productivity metrics
    const totalCount = totalTasks?.length || 0;
    const completedCount = completedTasks?.length || 0;
    const todayCount = todayTasks?.length || 0;
    
    const completionRate = totalCount > 0 
      ? Math.round((completedCount / totalCount) * 100) 
      : 0;
    
    res.status(200).json({
      totalTasks: totalCount,
      completedTasks: completedCount,
      tasksCompletedToday: todayCount,
      completionRate: completionRate,
    });
    
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user statistics' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;