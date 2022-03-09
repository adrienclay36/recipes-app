import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from 'react-redux'

import MealList from "../components/MealList";
const CategoryMealsScreen = ({ navigation, route }) => {
  const availableMeals = useSelector(state => state.meals.filteredMeals)
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(route.params.categoryId) >= 0
  );

  

  

  return (
    <MealList navigation={navigation} data={displayedMeals} />
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
export default CategoryMealsScreen;
