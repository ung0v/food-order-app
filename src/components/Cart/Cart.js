import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [submitLoading, setSubmitLoaing] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.items.length > 0;
  const cartItems = ctx.items;

  const addItemHandler = (item) => {
    ctx.addItem({
      ...item,
      amount: 1,
    });
  };

  const submitHandler = async (userData) => {
    setSubmitLoaing(true);
    try {
      await fetch(
        "https://food-order-6b89a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            order: ctx.items,
          }),
        }
      );
      setSubmitLoaing(false);
      setDidSubmit(true);
      ctx.clearItem();
    } catch (error) {
      throw new Error("Smth w r");
    }
  };

  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemsEl = (
    <ul className={classes["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={() => removeItemHandler(item.id)}
        />
      ))}
    </ul>
  );
  const checkoutHandler = () => {
    setIsCheckout(true);
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );
  const checkoutModalContent = (
    <>
      {hasItem && cartItemsEl}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitHandler} />}
      {!isCheckout && modalActions}
    </>
  );
  const submitLoadingContent = <p>Submit loading...</p>;

  const didSubmitContent = (
    <>
      <p>Submit successfully !!!</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!submitLoading && !didSubmit && checkoutModalContent}
      {submitLoading && submitLoadingContent}
      {!submitLoading && didSubmit && didSubmitContent}
    </Modal>
  );
};
export default Cart;
