import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// import Header from './Header';
import WebViewPage from './WebViewPage';

var data = [
  {
    id: 1,
    name: '体育迷',
    url: 'http://api.tianapi.com/tiyu/?',
    logogram: 'tiyu',
  },
  {
    id: 2,
    name: '养生堂',
    url: 'http://api.tianapi.com/health/?',
    logogram: 'health',
  },
  {
    id: 3,
    name: '科技咖',
    url: 'http://api.tianapi.com/keji/?',
    logogram: 'keji',
  },
];
var key = '33457bbadb1179dc572fad4aff06b369';
// var cols = data.length;
var {height, width} = Dimensions.get('screen');
class HomePage extends Component {
  static navigationOptions = {
    headerTitle:'首页',
  };
  constructor(props) {
    super(props);
    // console.log("wang-tag this.props:"+this.props.title);
    this.state = {
      dataList: [],
      tabUrl: data[0].url + 'key=' + key,
    };
  }
  componentDidMount() {
    this.FetchData(this.state.tabUrl);
  }
  FetchData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
          console.log(responseJson.newslist);
          this.setState({
            dataList: responseJson.newslist
          });
        })
        .catch(error => {
          reject(error);
        })
        .done();
    });
  }
  renderData({item}) {
    // console.log(item);
    return (
      <TouchableNativeFeedback
        onPress={() => this.props.navigation.navigate('WebViewPage',{
          url:item.url
        })}
      >
        <View
          style={{flex: 1, flexDirection: 'row', padding: 5, paddingBottom: -5}}
        >
          <View style={{flex: 1}}>
            <Image
              source={{uri: item.picUrl}}
              style={{width: 145, height: 105}}
            />
          </View>
          <View style={{flex: 2}}>
            <View>
              <Text style={{fontSize: 20, fontWeight: ('bold', '600')}}>
                {item.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                marginTop: 25,
              }}
            >
              <Text style={{fontSize: 16, color: '#79bcff'}}>
                {item.description}
              </Text>
              <Text style={{}}>{item.ctime}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
  render() {
    let tabs = data;
    return (
      <View style={{flex: 1}}>
        {/* <Header title={this.props.title} /> */}
        <ScrollableTabView
          renderTabBar={() => (
            <ScrollableTabBar
              tabStyle={styles.tab}
              textStyle={styles.tabText}
            />
          )}
          onChangeTab={obj => {
            console.log(tabs[obj.i].url + 'key=' + key);
            this.FetchData(tabs[obj.i].url + 'key=' + key);
          }}
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor="#3e9ce9"
          tabBarInactiveTextColor="#aaaaaa"
        >
          {tabs.map((item, index) => {
            return (
              <View tabLabel={item.name} key={index}>
                <FlatList
                  data={this.state.dataList}
                  renderItem={this.renderData.bind(this)}
                  // keyExtractor={(item,index) =>index}
                />
              </View>
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeMenu: {
    width: width / 3,
    height: 50,
    lineHeight: 50,
    textAlign: 'center',
  },
  menuContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 2,
  },
  tab: {
    paddingBottom: 0,
  },
  tabText: {
    fontSize: 16,
  },
});

const RootStack = createStackNavigator({
  HomePage: {screen: HomePage},
  WebViewPage: {screen: WebViewPage},
});
export default Home = createAppContainer(RootStack)
