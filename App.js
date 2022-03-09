import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Text, Platform, View, Share } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryMealsScreen from "./screens/CategoryMealsScreen";
import MealDetailsScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FiltersScreen from "./screens/FiltersScreen";
import { Colors } from "react-native-paper";
import { enableScreens } from "react-native-screens";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import {
  Provider as PaperProvider,
  Appbar,
  Menu,
  Modal,
  Portal,
  Text as PaperText,
  Button,
} from "react-native-paper";
import { createStore, combineReducers } from "redux";

import mealsReducer from "./store/reducers/meals";
enableScreens();
const Stack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();
const Filters = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MaterialTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
import { useDispatch, useSelector, Provider } from "react-redux";
import { toggleFavorite } from "./store/actions/meal";
import FilteredMeals from "./screens/FilteredMeals";
import { addListener } from "expo-updates";

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

const CustomNavigationBar = ({ title, navigation, back, route, id }) => {
  const [visible, setVisible] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const favMeals = useSelector((state) => state.meals.favoriteMeals);
  const isFavorite = favMeals.find((meal) => meal.id === id);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = () => {
    if (id) {
      setVisible(false);
      dispatch(toggleFavorite(id));
      setShowModal(true);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "The Recipe's App - A test of React Native.",
        url: "exp://exp.host/@adrienclay/meals-app",
        title: "Check out my Recipe's!",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }

      setVisible(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Appbar.Header
      style={{
        backgroundColor: Platform.OS === "android" ? Colors.teal400 : "white",
      }}
    >
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
            {!isFavorite ? "Removed From Favorites" : "Added To Favorites"}
          </Text>
        </Modal>
      </Portal>
      {back ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      <Appbar.Content
        color={Platform.OS === "ios" ? Colors.teal400 : "white"}
        titleStyle={{ fontFamily: "open-sans-bold" }}
        title={title}
      />
      {useRoute().name === "Categories" && (
        <Appbar.Action
          icon={"menu"}
          style={{ position: "absolute", top: 3, right: 8 }}
          size={28}
          color={Platform.OS === "android" ? "white" : "black"}
          onPress={() => navigation.openDrawer()}
        />
      )}
      {route.name === "Filters" && (
        <Appbar.Action
          icon={"menu"}
          style={{ position: "absolute", top: 3, right: 8 }}
          size={28}
          color={Platform.OS === "android" ? "white" : "black"}
          onPress={() => navigation.openDrawer()}
        />
      )}
      {route.name === "FavoritesScreen" && (
        <Appbar.Action
          icon={"menu"}
          size={28}
          style={{ position: "absolute", top: 3, right: 8 }}
          color={Platform.OS === "android" ? "white" : "black"}
          onPress={() => navigation.openDrawer()}
        />
      )}
      {route.name === "CategoryMeals" && (
        <Appbar.Action
          icon={"menu"}
          size={28}
          color={Platform.OS === "android" ? "white" : "black"}
          onPress={() => navigation.openDrawer()}
        />
      )}

      {route.name === "MealDetails" && (
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              icon="heart"
              size={28}
              color={Colors.red400}
              onPress={() => setVisible(true)}
            />
          }
        >
          <Menu.Item icon="share" onPress={() => onShare()} title="Share" />
          <Menu.Item
            icon={isFavorite ? "cancel" : "star"}
            onPress={toggleFavoriteHandler}
            contentStyle={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            title={isFavorite ? "Remove From Favorites" : "Add To Favorites"}
          />
        </Menu>
      )}
    </Appbar.Header>
  );
};

function CategoriesTab() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          header: (props) => (
            <CustomNavigationBar
              route={route}
              {...props}
              title={route.params?.title || "Categories"}
              id={route.params?.mealID}
            />
          ),
        })}
      >
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen
          name="CategoryMeals"
          options={({ route }) => ({ title: route.params.title })}
          component={CategoryMealsScreen}
        />
        <Stack.Screen
          name="MealDetails"
          options={({ route }) => ({ title: route.params.title })}
          component={MealDetailsScreen}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function FavoritesTab() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <FavoritesStack.Navigator
        screenOptions={({ route }) => ({
          header: (props) => (
            <CustomNavigationBar
              route={route}
              {...props}
              title={route.params?.title || "Favorites"}
              id={route.params?.mealID}
            />
          ),
        })}
      >
        <FavoritesStack.Screen
          name="FavoritesScreen"
          component={FavoritesScreen}
        />
        <FavoritesStack.Screen
          name="MealDetails"
          options={({ route }) => ({ title: route.params.title })}
          component={MealDetailsScreen}
        />
      </FavoritesStack.Navigator>
    </View>
  );
}

function FiltersStack() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Filters.Navigator
        screenOptions={({ route }) => ({
          header: (props) => (
            <CustomNavigationBar
              route={route}
              {...props}
              title={route.params?.title || "Filtered Meals"}
              id={route.params?.mealID}
            />
          ),
        })}
      >
        <Filters.Screen name="Filters" component={FiltersScreen} />
        <Filters.Screen name="FilteredMeals" component={FilteredMeals} />
        <Filters.Screen name="MealDetails" component={MealDetailsScreen} />
      </Filters.Navigator>
    </View>
  );
}

function MainTabNavigator() {
  if (Platform.OS === "android") {
    return (
      <MaterialTab.Navigator activeColor="white" shifting={true}>
        <MaterialTab.Screen
          options={{
            tabBarLabel: (
              <Text style={{ fontFamily: "open-sans-bold" }}>Recipes</Text>
            ),

            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="silverware"
                color={color}
                size={26}
              />
            ),
            tabBarColor: Colors.teal500,
          }}
          name="Meals"
          component={CategoriesTab}
        />
        <MaterialTab.Screen
          options={{
            tabBarLabel: (
              <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
            ),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="star" color={color} size={26} />
            ),
            tabBarColor: Colors.blueGrey600,
          }}
          name="Favorites"
          component={FavoritesTab}
        />
      </MaterialTab.Navigator>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Meals") {
            iconName = focused ? "ios-restaurant" : "ios-restaurant-outline";
          } else if (route.name === "FavoritesTab") {
            iconName = focused ? "ios-star" : "ios-star-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.teal500,
        tabBarInactiveTineColor: "gray",
        headerShown: false,
        tabBarLabel: route.name === "Meals" ? "Recipes" : "Favorites",
        tabBarLabelStyle: { fontFamily: "open-sans-bold" },
      })}
    >
      <Tab.Screen name="Meals" component={CategoriesTab} />
      <Tab.Screen name="FavoritesTab" component={FavoritesTab} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loaded, error] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return (
      <Text style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Loading...
      </Text>
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerActiveBackgroundColor: Colors.teal500,
              drawerActiveTintColor: "#fff",
              drawerInactiveTintColor: Colors.blueGrey100,
              drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: "open-sans-bold",
                fontSize: 15,
              },
            }}
          >
            <Drawer.Screen
              options={{
                drawerIcon: ({ color }) => (
                  <Ionicons name="ios-restaurant" size={22} color={color} />
                ),
              }}
              name="Recipes"
              component={MainTabNavigator}
            />
            <Drawer.Screen
              options={{
                title: "Filter",
                drawerIcon: ({ color }) => (
                  <Ionicons name="filter" size={22} color={color} />
                ),
              }}
              name="Filter Stack"
              component={FiltersStack}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
