import React, {Component} from 'react';
import {Button, View, Text, Switch, TouchableNativeFeedback} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Home Screen</Text>
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Details')}>
                    <View>
                        <Text>go to details</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

class DetailsScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{marginBottom: 20}}>Details Screen</Text>
                {/*详情的详情*/}
                <TouchableNativeFeedback onPress={() => this.props.navigation.push("Details")}>//
                    <View>
                        <Text>go to Details again</Text>
                    </View>
                </TouchableNativeFeedback>
                {/*返回上一层*/}
                <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()}>
                    <View>
                        <Text>go to home</Text>
                    </View>
                </TouchableNativeFeedback>
                {/*直接返回home*/}
                <TouchableNativeFeedback onPress={() => this.props.navigation.navigate("Home")}>
                    <View>
                        <Text>go to home</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}
class SettingsScreen extends Component{
    render(){
        return(
            <View>
                <Text>SettingsScreen</Text>
            </View>
        )
    }
}
class ProfileScreen extends Component{
    render(){
        return(
            <View>
                <Text>this is ProfileScreen</Text>
            </View>
        )
    }
}
const Sim = createStackNavigator({
        Home: HomeScreen,
        Details: DetailsScreen

    },
    {
        initialRouteName: "Home"
    }
);
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Profile: ProfileScreen,
});
const TabNavigator = createBottomTabNavigator(
    {
        Home: Sim,
        Settings: SettingsStack,
    }
);

export default class App extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state =
    //         {
    //             value: false,
    //             changeTxt:'切换Switch',
    //         };
    // };
    render() {
        return <TabNavigator/>
        // return <Sim/>
        // return(
        //     <View>
        //         <Text>dasdsassd</Text>
        //         <View style={{flexDirection:"row"}}>
        //             <Text>{this.state.changeTxt}</Text>
        //             <Switch value={this.state.value} onValueChange={(value)=>{
        //                 this.setState({
        //                     value:value,
        //                     changeTxt:value?'switch 打开了':'switch 关闭了'
        //                 });
        //             }}/>
        //         </View>
        //     </View>
        // )
    }
}















