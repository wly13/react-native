import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={{}}>
        <Text>免密码登陆</Text>
        <View>
          <TextInput
            style={{
              width: 300,
              height: 50,
              borderWidth: 1,
              borderBottomWidth: 0,
            }}
            placeholder="用户名/邮箱/手机号"
          />
          <TextInput
            style={{width: 300, height: 50, borderWidth: 1}}
            placeholder="密码"
          />
        </View>
        <Button title="登陆" />
        <Text>忘记密码？</Text>
      </View>
    );
  }
}
