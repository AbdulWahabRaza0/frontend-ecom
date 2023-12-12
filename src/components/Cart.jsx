import { useState } from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";
const Cart = () => {
  const navigate = useNavigate();
  const { isEmpty, items, cartTotal, removeItem } = useCart();
  const [checkout, setCheckout] = useState(false);

  const jwt = localStorage.getItem("jwt");
  if (checkout) {
    return (
      <>
        {" "}
        <h4>Payment page</h4>
        <Checkout />
        <br />
        <button
          className="btn red"
          onClick={() => {
            setCheckout(false);
          }}
        >
          Cancel
        </button>
      </>
    );
  }
  if (isEmpty) return <h1>Your Cart is empty</h1>;
  // if (items) console.log("I am here ", items);
  return (
    <>
      <div className="row">
        <ul className="collection col m7 ">
          {items.map((item, index) => {
            return (
              <li key={index} className="collection-item avatar">
                <img src={item.img} alt={item.name} className="circle" />
                <span className="title">{item.name}</span>
                <p className="green-text">
                  Price - $ {item.price} x {item.quantity}= $ {item.itemTotal}
                </p>
                <div className="secondary-content red-text">
                  <i
                    style={{ cursor: "pointer" }}
                    className="material-icons"
                    onClick={() => {
                      removeItem(item.id);
                    }}
                  >
                    remove_circle
                  </i>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          className="col m4 offset-m1"
          style={{ position: "sticky", top: "5px" }}
        >
          <h3>Total Price</h3>
          <h3>$ {cartTotal}</h3>
          {jwt ? (
            <>
              <button
                className="btn blue"
                onClick={() => {
                  if (jwt) {
                    setCheckout(true);
                  } else {
                    alert("something went wrong");
                    navigate("/");
                  }
                }}
              >
                checkout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn red"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Please login to checkout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
