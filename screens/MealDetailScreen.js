import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useSelector } from "react-redux";


const ListItem = (props) => {
  

  return (
    <View style={styles.listItem}>
      <DefaultText styles={{textAlign: 'center'}}>{props.children}</DefaultText>
    </View>
  )
}

import DefaultText from "../components/DefaultText";
const MealDetailsScreen = ({ navigation, route }) => {
  const availableMeals = useSelector(state => state.meals.meals);

  const selectedMeal = availableMeals.find(meal => meal.id === route.params?.mealID);



  return (
    <ScrollView>
      <Image source={{ uri: route.params?.image }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{route.params?.duration}m</DefaultText>
        <DefaultText>{route.params?.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{route.params?.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      <View style={{ flex:1, marginVertical: 25}}>

      {route.params?.ingredients.map((item, index) => {
        return (
          <ListItem key={index}>
            {item}
          </ListItem>
        );
      })}
      </View>

      <Text style={styles.title}>Steps</Text>
      <View style={{ flex: 1, marginVertical: 25}}> 

      {route.params?.steps.map((item, index) => {
        return (
          <ListItem  key={index}>
            {index+ 1}. {item}
          </ListItem>
        );
      })}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,

  },
  details: {
    flexDirection: 'row',
    paddingHorizontal: 50,
    paddingVertical: 10,
    justifyContent: 'space-around',

  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    
  }
});
export default MealDetailsScreen;
