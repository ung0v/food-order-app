import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const price = `$${props.meal.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.name,
      price: props.meal.price,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <MealItemForm id={props.meal.id} onAddToCart={addItemToCartHandler} />
    </li>
  );
};
export default MealItem;
