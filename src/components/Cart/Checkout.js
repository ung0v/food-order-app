import { useForm } from "react-hook-form";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const confirmHandler = (data) => {
    props.onConfirm(data);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(confirmHandler)}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Name is required" })}
        />
        {/* {errors.name && <p>Name is required.</p>} */}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          {...register("street", { required: true })}
        />
        {errors.street && <p>Street is required.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          {...register("postalCode", { required: true })}
        />
        {errors.postalCode && <p>Postal Code is required.</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          {...register("city", { required: true })}
        />
        {errors.city && <p>city is required.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
