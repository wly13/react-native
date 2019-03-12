import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from './app/components/Home';
import Suggest from './app/components/Suggest';
import About from './app/components/About';
import Category from './app/components/Category';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home', //默认选中的选项卡
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator tabBarStyle={{height: 60}}>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="首页"
            titleStyle={styles.titleStyle}
            selectedTitleStyle={{color: '#63B8FF'}}
            renderIcon={() => (
              <Image
                style={styles.icon}
                source={require('./app/images/home.png')}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.icon, {tintColor: '#63B8FF'}]}
                source={require('./app/images/home.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: 'home'})}
          >
            {/*选项卡对应的页面*/}
            <Home title="home" />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'category'}
            title="分类"
            titleStyle={styles.titleStyle}
            selectedTitleStyle={{color: '#63B8FF'}}
            renderIcon={() => (
              <Image
                style={styles.icon}
                source={require('./app/images/category.png')}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.icon, {tintColor: '#63B8FF'}]}
                source={require('./app/images/category.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: 'category'})}
          >
            {/* <View style={{backgroundColor:'#0F0',flex:1}}></View> */}
            <Category title="category" />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'suggest'}
            title="建议"
            titleStyle={styles.titleStyle}
            selectedTitleStyle={{color: '#63B8FF'}}
            renderIcon={() => (
              <Image
                style={styles.icon}
                source={require('./app/images/suggest.png')}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.icon, {tintColor: '#63B8FF'}]}
                source={require('./app/images/suggest.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: 'suggest'})}
          >
            {/* <CustomViewPage {...this.props} /> */}
            <Suggest title="suggest" />
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'about'}
            title="关于"
            titleStyle={styles.titleStyle}
            selectedTitleStyle={{color: '#63B8FF'}}
            renderIcon={() => (
              <Image
                style={styles.icon}
                source={require('./app/images/about.png')}
              />
            )}
            renderSelectedIcon={() => (
              <Image
                style={[styles.icon, {tintColor: '#63B8FF'}]}
                source={require('./app/images/about.png')}
              />
            )}
            onPress={() => this.setState({selectedTab: 'about'})}
          >
            {/* <MyPage {...this.props} /> */}
            <About title="about" />
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:80
  },
  icon: {
    width: 30,
    height: 30,
  },
  titleStyle:{
    fontSize:14
  }
});
