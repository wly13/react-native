import React,{Component} from "react";
import {Text, View} from "react-native";

class Cinema extends Component{

    // componentDidMount(){
    //     this.fetchData();
    // };
    // fetchData(){
    //     fetch(CinemaUrl).then(response => response.json())
    //         .then(responeJson =>{
    //             console.log("wang-tag value="+responeJson);
    //         })
    // };

    render(){
        return(
            <View>
                <Text>
                    this is ProfileScreen
                </Text>
            </View>
        )
    }
}
module.exports=Cinema;