import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Header from "./Header";

export default class About extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
        <Header title = {this.props.title} />
        <Text> textInComponent </Text>
      </View>
    )
  }
}

