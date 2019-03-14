import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';

import storage from '../store/DataStore';


const _saveData = () => {//测试react-native-storage+AsyncStorage
  let obj = {}
    obj.name = '张三'
    obj.age = 20
    obj.sex = 'man'

    // 存
    storage.save({
      key:'userinfo',
      data:obj,
      expires:null
    })

    // 取
    storage.load({
      key:'userinfo',
      autoSync:true,
      syncInBackground:true
    }).then(ret =>{
      console.log("wang-tag name="+ret.name)
    })
}


export default class Suggest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Header title={this.props.title} />
        <Button title={'测试'} onPress={() =>{
          alert(1)
        }} />
        <Button title={"存储数据"} onPress={_saveData} />
      </View>
    );
  }
}
