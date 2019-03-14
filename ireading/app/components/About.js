import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Header from "./Header";
import Login from './Login';

export default class About extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{justifyContent:'center'}}>
        <Header title = {this.props.title} />
        {/* <Text> textInComponent </Text> */}
        <Login />
      </View>
    )
  }
}

