import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import firebase from 'react-native-firebase';

import { increaseCount } from '../store/actions';

import Entry from '../components/Entry';

export class YourPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stays: [],
    };
  }

  componentDidMount() {
    this.getStays();
  }

  getStays = () => {
    firebase.firestore().collection('users').doc('iOzpZbYYFDcBEZbW6tkz').get()
    .then(snapshot => {
      let allStays = [];
      snapshot._data.stays.forEach(stay => firebase.firestore().collection('stays').doc(stay).get()
      .then(result => {
        allStays.push(result._data);
      })
      .catch((e) => console.log(e))
      )
      this.setState({ stays: allStays });
    })
    .catch((e) => console.log(e));
  }

  getComponents = () => {
    const returnViews = [];
    this.state.stays.forEach(stay => {
      console.log(stay);
      returnViews.push(<Text>Nick</Text>)
    });
    console.log(this.state);
    return returnViews;
  }

  render() {
    return (
      <View>
        {this.getComponents()}
      </View>
    );
  }
}

export default YourPath;
