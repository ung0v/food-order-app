import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealsItem/MealItem";
import { useEffect, useState } from "react";
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-order-6b89a-default-rtdb.asia-southeast1.firebasedatabase.app/meal.json"
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      console.log(resData);
      const loadMeals = [];
      for (const key in resData) {
        loadMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section>
        <p style={{ textAlign: "center", color: "#fff" }}>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section>
        <p style={{ textAlign: "center", color: "red" }}>{httpError}</p>
      </section>
    );
  }
  const listMeal = meals.map((meal) => (
    <MealItem key={meal.id} name={meal.name} meal={meal}></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{listMeal}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
