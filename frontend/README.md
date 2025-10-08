# TaskMaster - To-Do List Application

A full-featured, responsive to-do list application built with React.js and Supabase.

## Features

- 🔐 User authentication with Supabase (email/password)
- ✅ Complete task management (create, edit, delete, and complete tasks)
- 🏷️ Task organization with priority levels and categories
- 🔍 Advanced search, filtering, and sorting
- 📅 Due dates and time reminders
- 🌓 Dark/light mode with persistent preferences
- 📱 Fully responsive design for all devices

## Tech Stack

- **Frontend**: React.js, React Router, Framer Motion, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database & Auth**: Supabase

## Getting Started

### Prerequisites

- Node.js 16+
- A Supabase account (free tier works perfectly)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/taskmaster.git
   cd taskmaster
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   SERVER_PORT=3001
   ```

4. Set up the Supabase database:
   - Connect to Supabase
   - Execute the SQL migrations in the `supabase/migrations` directory

5. Start the development server:
   ```
   npm run dev
   ```

6. In a separate terminal, start the backend server:
   ```
   npm run server
   ```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── lib/             # Utility functions and API clients
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── server/              # Express.js backend
├── supabase/
│   └── migrations/      # Database migrations
└── package.json         # Project dependencies
```

## Database Schema

### User Settings
- `id`: UUID (Primary Key)
- `user_id`: UUID (References auth.users)
- `theme`: Text (light/dark)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Tasks
- `id`: UUID (Primary Key)
- `user_id`: UUID (References auth.users)
- `title`: Text
- `description`: Text
- `due_date`: Timestamp
- `priority`: Text (low/medium/high)
- `category`: Text
- `completed`: Boolean
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Categories
- `id`: UUID (Primary Key)
- `user_id`: UUID (References auth.users)
- `name`: Text
- `color`: Text
- `created_at`: Timestamp

## License

This project is licensed under the MIT License.