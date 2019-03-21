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
import {createStackNavigator, createAppContainer} from 'react-navigation';

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
    headerTitle: '首页',
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
            dataList: responseJson.newslist,
          });
        })
        .catch(error => {
          reject(error);
        })
        .done();
    });
  }
  renderData({item, index}) {
    // console.log(index);
    return (
      <TouchableNativeFeedback
        onPress={() =>
          this.props.navigation.navigate('WebViewPage', {
            url: item.url,
          })
        }
      >
        <View style={{flexDirection: 'row', padding: 5,borderBottomWidth:1,borderBottomColor:"#cdcdcd"}}>
          <View style={{width: width / 3}}>
            <Image
              source={{uri: item.picUrl}}
              style={{width: width / 3, height: (width * 7) / 29}}
            />
          </View>
          <View
            style={{width: (width * 2) / 3, paddingLeft: 5, paddingRight: 5}}
          >
            <View>
              <Text numberOfLines={2} style={{fontSize: 18, fontWeight: ('bold', '600')}}>
                {item.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position:'absolute',
                bottom:0,
                left:0,
                padding:5,
              }}
            >
              <Text style={{fontSize: 16, color: '#79bcff'}}>
                {item.description}
              </Text>
              <Text style={{lineHeight:20,marginLeft:width/4}}>{item.ctime}</Text>
            </View>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
  render() {
    let tabs = data;
    return (
      // ScrollableTabView需要在弹性窗里
      <View style={{flex: 1}}> 
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
  box: {
    padding: 5,
  },
  box1: {
    padding: 0,
  },
});

const RootStack = createStackNavigator({
  HomePage: {screen: HomePage},
  WebViewPage: {screen: WebViewPage},
});
export default (Home = createAppContainer(RootStack));
