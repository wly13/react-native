import React,{Component} from "react";
import TabNavigator from "react-native-tab-navigator";
import HomeScreen from "./app/src/HomeScreen";
// import DetailsScreen from "./app/DetailsScreen";
import SettingsScreen from "./app/src/SettingsScreen";
import Cinema from "./app/src/ProfileScreen";
import {View,StyleSheet} from "react-native";

const dataSource=[
    {
        tabPage:"Home",
        tabName:"电影",
        component:HomeScreen
    },
    {
        tabPage:"Profile",
        tabName:"影院",
        component:Cinema
    },
    {
        tabPage:"Settings",
        tabName:"我的",
        component:SettingsScreen
    }

];
let navigation=null;
export default class App extends Component{
    constructor(props){
        super(props);
        navigation=this.props.navigation;//
        this.state={//设置默认选中
            selectedTab:"Home"
        }
    };
    render(){
        let tabViews=dataSource.map((item,index) => {
            return(
                <TabNavigator.Item
                    title={item.tabName}
                    selected={this.state.selectedTab===item.tabPage}
                    titleStyle={{color:'#999999',fontSize:20}}
                    selectedTitleStyle={{color:'#ED5100'}}
                    tabStyle={{alignSelf:'center'}}
                    onPress = {() => {this.setState({selectedTab:item.tabPage})}}
                    key={index}
                >
                    {/*根据component的值来跳转*/}
                    <item.component navigation={navigation}/>
                </TabNavigator.Item>
            );
        });
        return(
            <View style={styles.container}>
                <TabNavigator
                    hidesTabTouch={true}
                >
                    {tabViews}
                </TabNavigator>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        fontSize:20,
        height:30,
    }
});