import React, {Component} from "react";
import {View, Text, FlatList, TouchableNativeFeedback} from "react-native";

const CityUrl = "https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api";

class City extends Component {

    static navigationOptions = {
        headerTitle: "当前城市-"
    };
    constructor(props) {
        super(props);
        this.state = {
            CityData: [],
            SortLetters: []
        };
        this.fetchCityData = this.fetchCityData.bind(this)
    };

    componentDidMount() {
        this.fetchCityData();
    };

    unique(arr){//数组去重
        let hashTable = {};
        let newArr = [];
        for(let i=0,l=arr.length;i<l;i++) {
            if(!hashTable[arr[i]]) {
                hashTable[arr[i]] = true;
                newArr.push(arr[i]);
            }
        }
        return newArr;
    };

    fetchCityData() {
        fetch(CityUrl, {method: "GET"}).then(response => response.json()).then(responseJson => {
            let SortLetter = [];
            console.log(responseJson.p.length);
            for (let i = 0; i < responseJson.p.length; i++) {
                SortLetter += responseJson.p[i].pinyinFull.charAt(0).toUpperCase()
            }
            this.setState({
                CityData: responseJson.p,
                SortLetters: this.unique(SortLetter)
            });
        });
    };

    sortLetters(arr){
        
    }

    renderCity(item) {
        return (
            <View>
                <TouchableNativeFeedback>
                    <Text>{item.item.n}</Text>
                </TouchableNativeFeedback>
            </View>
        )
    }

    render() {
        return (
            <View style={{paddingLeft: 10, paddingRight: 15, backgroundColor: "#fff"}}>
                <View>
                    <Text>当前城市</Text>
                    <Text></Text>
                </View>
                <View>
                    <Text>热门城市</Text>

                </View>
                <View style={{marginTop: 5}}>
                    <Text style={{fontSize: 20}}>城市列表</Text>
                    <FlatList
                        style={{backgroundColor: "#fff"}}
                        data={this.state.CityData}
                        renderItem={this.renderCity.bind(this)}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View>
        )
    }
}

module.exports = City;