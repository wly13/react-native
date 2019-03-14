import React, {Component} from 'react';
import {Text, View, TextInput,Button} from 'react-native';

export default class Register extends Component {
  render() {
    return (
      <View>
        <View>
          <TextInput placeholder="邮箱/手机号" />
          <TextInput placeholder="请设置密码" />
          <TextInput placeholder="请确认密码" />
        </View>
        <Button title='注册'/>
      </View>
    );
  }
}
