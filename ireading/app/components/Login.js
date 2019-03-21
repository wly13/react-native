import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import SQLite from '../store/Sqlite';
import Register from './Register';
var sqLite = new SQLite();
var db;

export default class Login extends Component {
  // class LoginPage extends Component {
    static navigationOptions ={
      header:null
      // title:'登陆'
    }
  // static navigationOptions ={
  //   // header:null
  //   title:'登陆'
  // }

  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      name: '',
      passwd: '',
      userToken: false,
    };
    this.GetName = this.GetName.bind(this);
    this.GetPasswd = this.GetPasswd.bind(this);
  }

  componentWillMount() {}
  GetName(name) {
    this.setState({
      name: name,
    });
  }
  GetPasswd(passwd) {
    this.setState({
      passwd: passwd,
    });
  }

  _GetUserData = (name,passwd) =>{
    console.log('wang-tag test 111');
    if (!db) {
      db = sqLite.open();
    }
    sqLite.createTable();
    db.transaction(
      tx => {
        tx.executeSql('select * from user', [], (tx, results) => {
          var len = results.rows.length;
          // for (let i = 0; i < len; i++) {
          //   var u = results.rows.item(i);
          //   //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
          //   if (u.phone == name && u.passwd == passwd) {
          //     console.log('wang-tag test 222');
          //     // this.setState({
          //     //   userToken:true
          //     // })
          //   }
          // }
          
          this.props.navigation.pop()
        });
      },
      error => {
        //打印异常信息
        console.log(error);
      }
    );
  }

  // GetUserToken(){

  // }

  render() {
    // console.log('wang-tag name=' + this.state.name);
    // console.log('wang-tag passwd = ' + this.state.passwd);
    let {name,passwd} = this.state
    let {state} = this.props.navigation
    console.log(state)
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
            onChangeText={this.GetName}
          />
          <TextInput
            style={{width: 300, height: 50, borderWidth: 1}}
            placeholder="密码"
            onChangeText={this.GetPasswd}
          />
        </View>
        <Button title="登陆" onPress={() =>{
          this._GetUserData(name,passwd)
        }} />
        <Text>忘记密码？</Text>
        <Button title='注册' onPress={() =>{
          this.props.navigation.push('Register')
        }} />
      </View>
    );
  }
}
// const RootLogin = createStackNavigator({
//   LoginPage:{screen:LoginPage},
//   Register:{screen:Register}
// })

// export default (Login = createAppContainer(RootLogin))