import {Component} from "react";
import {
    AlertStatic as Alert,
    FlatList,
    Image,
    ScrollView,
    Text, ToastAndroidStatic as ToastAndroid,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    DeviceEventEmitter, SectionList
} from "react-native";
import React from "react";
import style from "../styles/StyleSheet";
import Detials from "./DetailsScreen";
import {createStackNavigator} from "react-navigation";
import Geolocation from 'Geolocation';
import City from "./CityTest";

import data from "../locales/City.json";

let positionCity = '';//城市列表返回的城市
let CityId = 290;//城市列表返回的城市的id
// let sourceUrl='';


class HomePage extends Component {
    static navigationOptions = {
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            flex: 1,
        },
        headerTitle: "猫眼电影"
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            changeType: "Showing",
            longitude: '',
            latitude: '',
            City: '',//获取到的城市
            sourceUrl: "https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=",
            positionCity: '',//城市列表返回的城市
            CityId: '',//城市列表返回的城市的id


        };
        // this.fetchData = this.fetchData.bind(this);
    }

    componentWillMount() {
        DeviceEventEmitter.addListener("returnData", (rowData, Id) => {
            // this.setState({
            //     positionCity: rowData,
            //     CityId: Id
            // })
            positionCity = rowData;
            CityId = Id;
            this.fetchData(CityId);
            this.forceUpdate();
        })
        this.fetchData(CityId);
        this.getCityLocation();
    }

    /*  componentDidMount() {
          DeviceEventEmitter.addListener("returnData", (rowData, Id) => {
              console.log("id=" + Id);
               /!*this.setState({
                   positionCity:rowData,
                   CityId:Id
               })*!/
              CityId = Id;
              this.fetchData(CityId);
              this.forceUpdate();

          })
          this.getCityLocation();
          // this.fetchData(CityId);

      };*/

    componentWillUnmount() {
        this.setState = (data, loading) => {
            data = [];
            loading = false;

        };
        // this._isMounted=false;
    }

    //获取经纬度
    getLongitudeAndLatitude = () => {
        //获取位置再得到城市先后顺序，通过Promise完成
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                location => {
                    //可以获取到的数据
                    let result = "速度：" + location.coords.speed +
                        "\n经度：" + location.coords.longitude +
                        "\n纬度：" + location.coords.latitude +
                        "\n准确度：" + location.coords.accuracy +
                        "\n行进方向：" + location.coords.heading +
                        "\n海拔：" + location.coords.altitude +
                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
                        "\n时间戳：" + location.timestamp;
                    // ToastAndroid.show("UTIl" + location.coords.longitude, ToastAndroid.SHORT);
                    console.log("wang-tag result=" + result);
                    resolve([location.coords.longitude, location.coords.latitude]);
                    this.setState({
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude
                    })
                },
                error => {
                    // Alert.alert("获取位置失败：" + error, "")
                    reject(error);
                }
            );
        })
    };
    ErrorDeal: '';

    getCityLocation() {
        return new Promise((resolve, reject) => {
            this.getLongitudeAndLatitude()
            //获取经纬度的方法返回的是经纬度组成的数组
                .then((locationArr) => {
                    // Alert.alert("", "" + locationArr[1]);
                    let longitude = locationArr[0];
                    let latitude = locationArr[1];
                    let BaiduMap_URL = "https://api.map.baidu.com/geocoder/v2/?output=json&ak=7UFcr4CLV6Gdkl9aadrnRZnWND6M8ftd&location=" + latitude + ',' + longitude;
                    console.log("wang-tag BaiduMap_URL=" + BaiduMap_URL);
                    this.getNetData(BaiduMap_URL + latitude + "," + longitude)
                        .then((data) => {
                            if (data.status === 0) {
                                resolve(data);
                                console.log(data);
                                this.setState({
                                    City: data.result.addressComponent.district
                                });
                                console.log("wang-tag City=" + this.state.City);
                            } else {
                                reject(this.ErrorDeal.getError(data.code));
                            }
                        }).catch((data) => {
                        reject(this.ErrorDeal.getError(data.code));
                    })

                }).catch((data) => {
                reject(this.ErrorDeal.getError(data.code));
            })

        })
    };

//获取网络数据
    getNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                    console.log("wang-tag responseData=" + responseData);
                })
                .catch((error) => {
                    reject(this.ErrorDeal.getError(NetWork_Error))
                })
                .done()
        })
    }

    fetchData(x) {
        console.log("x=" + x)
        fetch(this.state.sourceUrl + x).then(response => response.json())
            .then(responeJosn => {
                console.log(responeJosn.ms);
                    this.setState({
                        data: responeJosn.ms,
                        isLoading: true
                    });
            });
    };

    renderMovie({item}) {
        return (
            <View>
                <TouchableNativeFeedback onPress={() =>
                    this.props.navigation.navigate("Details", {
                        movieId: item.id,
                    })
                }
                >
                    <View style={style.flex_row}>
                        <View style={style.movie_image}>
                            <Image
                                source={{uri: item.img}}
                                style={style.image}
                            />
                        </View>
                        <View style={style.movie_item}>
                            <View style={style.movie_item_title}>
                                <Text style={{fontSize: 20, marginRight: 10}}>{item.t}</Text>
                                <Text
                                    style={item.is3D === true ? style.movie_item_3D : ""}>{item.is3D === true ? "3D" : " "}</Text>
                                <Text
                                    style={item.isIMAX3D === true ? style.movie_item_IMAX : ""}>{item.isIMAX3D === true ? "IMAX" : ""}</Text>
                            </View>
                            <Text style={{marginTop: 5}}>{item.r > -1 ? "时光网评分：" + item.r : "该影片暂无评分"}</Text>
                            <Text style={{marginTop: 1}}>上映时间：{item.year}</Text>
                            <Text style={{marginTop: 1}}>影片类型：{item.movieType}</Text>
                            <Text numberOfLines={1} style={{marginTop: 1}}>主演：{item.actors}</Text>
                            <Text style={{marginTop: 1}}>今天{item.cC}家影院放映{item.NearestShowtimeCount}场</Text>
                        </View>
                        <View style={style.movie_buy}>
                            <Text>购票</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    chooseTab(e) {
        if (e !== this.state.type) {
            this.setState({
                changeType: e,
            })
        }
        console.log("wang-tag changeType=" + this.state.changeType);
    };

    goToList = () => {
        let {
            navigate
        } = this.props.navigation;
        if (navigate) {
            navigate("City", {
                positionCity: positionCity === '' ? this.state.City : positionCity,
            });
        }
    }

    render() {
        console.log("City1111=" + CityId);
        return (
            <View style={{backgroundColor: "#fff", marginBottom: 30}}>
                <View style={style.header}>
                    <TouchableOpacity
                        onPress={this.goToList.bind(this)}
                    >
                        <Text style={{flex: 2, textAlign: "center", lineHeight: 50}}>
                            {positionCity === '' ? this.state.City : positionCity}
                        </Text>
                    </TouchableOpacity>

                    <View style={{flex: 8, flexDirection: "row", marginLeft: 80}}>
                        <TouchableOpacity onPress={() => {
                            this.chooseTab("Showing")
                        }}>
                            <Text style={{lineHeight: 50, borderColor: "#f5f", borderWidth: 1}}>正在上映</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.chooseTab("Coming")
                        }}>
                            <Text style={{lineHeight: 50}}>即将上映</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderMovie.bind(this)}
                    keyExtractor={(item, index) => item.id+ CityId}
                />
            </View>

        );
    }
}

const HomeScreen = createStackNavigator({
    Home: {screen: HomePage},
    Details: {screen: Detials},
    City: {screen: City}
});
module.exports = HomeScreen;