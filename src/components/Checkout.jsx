import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  //   PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useCart } from "react-use-cart";
import { BACKEND_URL } from "../helpers";
const stripePromise = loadStripe(
  "pk_test_51O7fT2ERrSNJB0EaTcqZmQ8NAkoQ62cUumQ0RoRQcbHAP5iMxjKHdkWzP7sjLL0qkrhW8FNq1fYjTgC15p7yUGOQ00ofpdEdIU"
);
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, items, emptyCart } = useCart();
  const [formData, setFormData] = useState({});
  const [payProcessing, setPayProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const [payBtn, setPayBtn] = useState(true);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const makePaymentRequest = async (allFormData) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(allFormData),
      });
      if (res.status != 200) throw new Error("Payment failed");
      return await res.json();
    } catch (e) {
      console.log(e);
      // alert("payment failed");
      setError(true);

      alert("payment failed");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const payload = await stripe.createToken(cardElement);
    const allFormData = {
      ...formData,
      token: payload.token.id,
      amount: cartTotal,
      items: items,
    };
    setPayProcessing(true);
    await makePaymentRequest(allFormData);
    setPayProcessing(false);
    setDone(true);

    emptyCart();
  };
  if (error)
    return (
      <>
        <h1 className="red-text">Payment Error</h1>
      </>
    );
  if (done)
    return (
      <>
        <h1 className="green-text">Payment done</h1>
      </>
    );

  if (payProcessing) return <h1>Payment is processing...</h1>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="shipping address"
          name="shippingAddress"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="state"
          name="state"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="pin code"
          name="pin"
          onChange={handleChange}
          required
        />
        <CardElement
          onChange={(e) => {
            if (e.complete) {
              setPayBtn(false);
            } else {
              setPayBtn(true);
            }
          }}
        />
        <br />
        <button
          className="blue btn"
          type="submit"
          disabled={!stripe || !elements || payBtn}
        >
          Pay
        </button>
      </form>
    </>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
export default Checkout;
