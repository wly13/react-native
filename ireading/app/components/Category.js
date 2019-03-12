import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, Dimensions} from 'react-native';

import Header from './Header';
import CateJson from '../category';

var {width, height} = Dimensions.get ('screen');
console.log ('wang-tag width :' + width + ',height:' + height);

var cols = 3

export default class Category extends Component {
  constructor (props) {
    super (props);
    this.state = {
      CateJson: CateJson,
    };
  }
  renderList({item}) {
    console.log ('wang-tag item:' + item.name);
    return (
      <View>
        <Text style={styles.category_json}>{item.name}</Text>
      </View>
    );
  }
  render () {
    return (
      <View>
        <Header title={this.props.title} />
        {/* <Text> textInComponent </Text> */}
        <Text style={{textAlign: 'center',height:50,lineHeight:50,backgroundColor:"#fff"}}>请选择你感兴趣的3-5个类别</Text>
        <View style ={styles.category}>
          <FlatList
            style = {{marginTop:30}}
            data={this.state.CateJson}
            renderItem={this.renderList.bind (this)}
            keyExtractor={(item, index) => item.id}
            horizontal={false}
            numColumns={cols}
            columnWrapperStyle={styles.columnStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  category: {
    height:height,
    backgroundColor: '#e6e6e6',
  },
  category_json: {
    width: 80,
    height: 30,
    textAlign: 'center',
    borderWidth:1,
    borderRadius:20,
    marginLeft:10,
    lineHeight:30,
    backgroundColor:"#f6f6f6"
  },
  columnStyle:{
    marginLeft:(width-270)/2-5,
    marginRight:(width-270)/2+5,
    marginTop:20,
  }
});
