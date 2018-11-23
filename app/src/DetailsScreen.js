import {Component} from "react";
import {FlatList, Image, ScrollView, Text, TouchableHighlight, TouchableNativeFeedback, View} from "react-native";
import React from "react";
import style from "../styles/StyleSheet";

class DetailsScreen extends Component {
    static navigationOptions = {
        headerTitle: "影片详情"
    };

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        let movieId = navigation.getParam("movieId");
        const Url = "https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=" + movieId;
        const commentUrl = "https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId=" + movieId;
        this.state = {
            basic: [],
            boxOffice: [],
            sourceUrl: Url,
            commentUrl: commentUrl
        };
    };

    componentDidMount() {
        this.fetchData();
    };

    fetchData() {
        fetch(this.state.sourceUrl).then(response => response.json()).then(responseJson => {
            this.setState({
                basic: responseJson.data.basic,
                boxOffice: responseJson.data.boxOffice
            });
        })
    };

    fetchComment() {
        fetch(this.state.commentUrl).then(response => response.json()).then(responseJson => {

        });
    };

    renderItem({item}) {
        return (
            <View>
                <TouchableNativeFeedback>
                    <View style={{width: 100, alignItems: "center"}}>
                        <View>
                            <Image source={{uri: item.img}} style={{width: 100, height: 120}}>

                            </Image>
                        </View>
                        <Text numberOfLines={1}>{item.name}</Text>
                        <Text numberOfLines={1}>{item.roleName}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    };

    renderStageImg({item}) {
        return (
            <View>
                <TouchableNativeFeedback>
                    <Image source={{uri: item.imgUrl}} style={style.movie_details_image}>

                    </Image>
                </TouchableNativeFeedback>
            </View>
        )
    }

    render() {
        const basic = this.state.basic;
        const boxOffice = this.state.boxOffice;
        return (
            <View style={{marginBottom:100}}>
                <View style={{padding: 15, backgroundColor: "#a6a6a6"}}>
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Image style={{width: 120, height: 170}} source={{uri: basic.img}}/>
                        </View>
                        <View style={style.movie_details_title}>
                            <Text style={{color: "#fff", fontSize: 20}}>{basic.name}</Text>
                            <Text style={{color: "#fff"}}>{basic.nameEn}</Text>
                            <Text style={{marginTop: 5}}>{basic.overallRating}</Text>
                            <Text>{basic.personCount}</Text>
                            <View style={{flexDirection:"row", marginTop:5}}>
                                <Text>{basic.type}</Text>
                                <View style={{flexDirection:"row",marginLeft:10}}>
                                    <Text>{basic.is3D === true ? "3D" : ""}</Text>
                                    <Text>{basic.isIMAX3D === true ? "IMAX" : ""}</Text>
                                </View>
                            </View>
                            <Text style={{marginTop:5}}>{basic.releaseArea + "/" + basic.mins}</Text>
                            <Text style={{marginTop:5}}>{basic.releaseDate}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", marginTop: 10, height: 30}}>
                        <Text style={{
                            flex: 1,
                            textAlign: "center",
                            borderWidth: 1,
                            borderColor: "#fff",
                            lineHeight: 30,
                            marginRight: 5
                        }}>想看</Text>
                        <Text style={{
                            flex: 1,
                            textAlign: "center",
                            borderWidth: 1,
                            borderColor: "#fff",
                            lineHeight: 30,
                            marginLeft: 5
                        }}>评分</Text>
                    </View>
                </View>
                <View>
                    <Text style={{padding:15}}>{basic.story}</Text>
                </View>
                <View style={{padding:15}}>
                    <Text style={{marginTop: 15}}>演职人员</Text>
                    <FlatList
                        data={basic.actors}
                        keyExtractor={(item, index) => item.actorId}
                        renderItem={this.renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{padding: 15}}
                    />
                </View>
                <View style={{padding:15}}>
                    <Text>票房</Text>
                    <View style={{flexDirection: "row"}}>
                        <View>
                            <Text>{boxOffice.ranking}</Text>
                            <Text>昨日票房排行</Text>
                        </View>
                        <View>
                            <Text>{boxOffice.todayBoxDes}</Text>
                            <Text>{boxOffice.todayBoxDesUnit}</Text>
                        </View>
                        <View>
                            <Text>{boxOffice.totalBoxDes}</Text>
                            <Text>{boxOffice.totalBoxUnit}</Text>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}>
                    <View>
                        <Text>视频和剧照</Text>
                        {/*<Text>{basic.stageImg.count}</Text>*/}
                    </View>
                    <View>
                        {/*<FlatList
                        data={basic.stageImg.list}
                        keyExtractor={(item,index) =>item.imgId}
                        renderItem={this.renderStageImg}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{padding:10}}
                        >

                        </FlatList>*/}
                    </View>
                </View>
                <View style={{padding:15}}>
                    <Text>观众评论</Text>
                </View>
            </View>
        )
    }
}


module.exports = DetailsScreen;