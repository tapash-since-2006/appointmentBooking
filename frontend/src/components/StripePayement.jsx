import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// --- Payment Form Component ---
const CheckoutForm = ({ clientSecret, appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/my-appointments", // jaha redirect garne ho success ma  tyaha ko url halni
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      try {
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/user/verify-stripe", // verify garne url halne backend ko
          {
            appointmentId,
            paymentIntentId: paymentIntent.id,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        if (response.data.success) {
          toast.success("Payment successful!");
        } else {
          toast.error(response.data.message || "Verification failed");
        }

        navigate("/my-appointments"); // jaha redirect garne ho success ya fail bhayema tyaha ko url halni
      } catch (err) {
        toast.error("Server error confirming payment");
        console.log(err);
      }
    } else {
      toast.error("Payment failed or was not completed");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 p-6 border shadow rounded"
    >
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// --- Main Stripe Payment Wrapper ---
const StripePayment = () => {
  const { appointmentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clientSecret = queryParams.get("clientSecret");

  // yo sabai cheez haru url bata painxa kina bhane yo dynmic  information ho 
  // jun chai backend bata payement intent bhaye paxi aaunxa


  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };


  if (!clientSecret) {
    return (
      <p className="text-center mt-12 text-red-600">
        Missing payment information.
      </p>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} appointmentId={appointmentId} />
    </Elements>
  );
};

export default StripePayment;
