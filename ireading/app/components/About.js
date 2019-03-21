import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation';

import LoginPage from './Login';

class AboutPage extends Component {
  static navigationOptions ={
    header:null
  }
  constructor(props){
    super(props);
    console.log("wang-tag test 333"+this.props.titlle)
  }

  render() {
    return (
      <View style={{justifyContent:'center'}}>
        <Text> textInComponent </Text>
        <Button title="登陆/注册" onPress={() =>{
          this.props.navigation.push('LoginPage')
        }} />
      </View>
    )
  }
}

const RootAbout = createStackNavigator({
  AboutPage:{screen:AboutPage},
  LoginPage:{screen:LoginPage},
})
export default (About = createAppContainer(RootAbout))