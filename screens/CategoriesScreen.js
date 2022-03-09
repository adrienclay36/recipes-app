import React from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CATEGORIES } from "../data/dummy-data";
import { Appbar } from "react-native-paper";
import CategoryGridTile from "../components/CategoryGridTile";
const CategoriesScreen = ({ navigation }) => {


  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() =>
          navigation.navigate("CategoryMeals", {
            categoryId: itemData.item.id,
            title: itemData.item.title,
          })
        }
      />
    );
  };


  return (
    <>
    <FlatList numColumns={2} renderItem={renderGridItem} data={CATEGORIES} keyExtractor={item => item.id} />
    </>
  );
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
});
export default CategoriesScreen;
