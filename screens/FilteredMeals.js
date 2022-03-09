import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'
const FilteredMeals = ({ navigation, route }) => {
    const availablMeals = useSelector(state => state.meals.filteredMeals);
  return (
    <MealList data={availablMeals} navigation={navigation}/>
  )
}

export default FilteredMeals

const styles = StyleSheet.create({})