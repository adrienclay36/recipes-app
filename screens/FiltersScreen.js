import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { Colors, Modal, Portal } from "react-native-paper";
import { Button } from "react-native-paper";
import { setFilters } from "../store/actions/meal";
import { useDispatch } from "react-redux";
const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.teal200, false: "#ccc" }}
        thumbColor={Platform.OS === "android" ? Colors.teal600 : "white"}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};
const FiltersScreen = ({ navigation, route }) => {
  const [glutenFree, setGlutenFree] = useState(false);
  const [lactoseFree, setLactoseFree] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  
  const setFilterHandler = () => {
    setShowModal(true);
    dispatch(setFilters({glutenFree, lactoseFree, vegetarian, vegan}));
    setTimeout(() => {
      navigation.navigate('FilteredMeals');
    }, 500)
    
  }

  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={{
            backgroundColor: "#fff",
            alignSelf: "center",
            width: "80%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            shadowColor: "black",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <Text>
            Set Filters!
          </Text>
        </Modal>
      </Portal>

      <FilterSwitch
        label="Gluten Free"
        state={glutenFree}
        onChange={(newValue) => setGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose Free"
        state={lactoseFree}
        onChange={(newValue) => setLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={vegan}
        onChange={(newValue) => setVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={vegetarian}
        onChange={(newValue) => setVegetarian(newValue)}
      />
      <View>
        <Button
          onPress={setFilterHandler}
          mode="contained"
          color={Colors.teal600}
          icon={"content-save"}
        >
          Apply Filters
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});
export default FiltersScreen;
