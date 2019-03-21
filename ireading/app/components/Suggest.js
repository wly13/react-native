import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

import Header from './Header';
import TestSqlite from '../test/TestSqlite';

export default class Suggest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header title={this.props.title} />
        <Button
          title={'测试'}
          onPress={() => {
            alert(1);
          }}
        />
        <Button
          title={'存储数据'}
          onPress={() => {
            alert(2);
          }}
        />
        <TestSqlite />
      </View>
    );
  }
}
