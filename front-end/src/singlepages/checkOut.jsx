import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantityAction,
  increaseQuantityAction,
  placeOrderAction,
  removeFromCart,
} from "../shop/cartSlice";
import Swal from "sweetalert2";

export default function Checkout() {
  const cart = useSelector((store) => store.cartReducer.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancel = () => {
    cart.forEach((product) => {
      dispatch(removeFromCart(product));
    });
    navigate("/shop");
  };
  const placeOrder = () => {
    dispatch(placeOrderAction(cart));
    navigate("/ordershipped");
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const increaseQuantity = (product) => {
    dispatch(
      increaseQuantityAction({ id: product.id, quantity: product.quantity })
    )
      .unwrap()
      .catch((error) => {
        Swal.fire({
          title: error,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const decreaseQuantity = (product) => {
    dispatch(decreaseQuantityAction({ id: product.id }));
    if (product.quantity === 1) {
      dispatch(removeFromCart(product));
    }
  };

  return (
    <div className="container mb-3 checkout-page" style={{ marginTop: "86px" }}>
      <h1 className="text-center my-4">Your Cart</h1>
      {cart.length === 0 ? (
        <h4 className="text-center">Your cart is empty</h4>
      ) : (
        <>
          {cart.map((product) => (
            <Card key={product.id} className="mb-3 w-100 ">
              <Card.Body className="d-flex align-items-center">
                <img
                  className="me-3"
                  src={product.imgUrl}
                  alt={product.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ width: "100%" }}>
                  <Card.Title className="mb-3">{product.name}</Card.Title>

                  <div className="product-details d-flex justify-content-between">
                    <Card.Text>
                      <span className="fw-bold">Price:</span> {product.price} $
                    </Card.Text>
                    <Card.Text>
                      <span className="fw-bold">Quantity:</span>
                      <button
                        className="btn btn-success btn  py-1 px-3 mx-2"
                        onClick={() => increaseQuantity(product)}
                      >
                        +
                      </button>
                      {product.quantity}
                      <button
                        className="btn btn-danger btn py-1 px-3 mx-2"
                        onClick={() => decreaseQuantity(product)}
                      >
                        -
                      </button>
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
          <div className=" text-success total-price">
            {" "}
            <span className=" fw-bold fs-5 text-warning">
              Total Price:
            </span>{" "}
            <span className="price">{totalPrice} $</span>
          </div>
          <div className="d-flex justify-content-around my-5">
            <button
              className="btn btn-success px-4 py-2 fw-bold"
              onClick={placeOrder}
            >
              Place Order
            </button>
            <button className="btn btn-danger px-4 fw-bold" onClick={cancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
