import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import MealItem from "./MealItem";
const MealList = ({ data, navigation }) => {
    
    const renderMealItem = (itemData) => {

      return (
        <MealItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          duration={itemData.item.duration}
          complexity={itemData.item.complexity}
          affordability={itemData.item.affordability}
          onSelectMeal={() =>
            navigation.push("MealDetails", {
              title: itemData.item.title,
              mealID: itemData.item.id,
              image: itemData.item.imageUrl,
              duration: itemData.item.duration,
              complexity: itemData.item.complexity,
              affordability: itemData.item.affordability,
              steps: itemData.item.steps,
              ingredients: itemData.item.ingredients,
            })
          }
        />
      );
    };
  return (
    <View style={styles.screen}>
      <FlatList
        style={{ width: "100%" }}
        data={data}
        renderItem={renderMealItem}
        keyExtractor={(item, index) => index}
      />
    </View>
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

export default MealList;
