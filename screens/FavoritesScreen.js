import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MealList from "../components/MealList";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native-paper";
const FavoritesScreen = ({ navigation, route}) => {
  
  const favMeals = useSelector((state) => state.meals.favoriteMeals);
  if (favMeals.length > 0) {
    return (
      <MealList data={favMeals} navigation={navigation} />
    );

  } else { 
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20, textAlign: 'center', marginBottom: 25 }}>
          No favorites yet...
        </Text>
        <Text style={{ fontFamily: "open-sans-bold", fontSize: 20, textAlign: 'center', width: "60%" }}>
          Add some now by clicking the {<Ionicons name='heart' color={Colors.red500} size={30}/>} icon when viewing a recipe!
        </Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FavoritesScreen;
