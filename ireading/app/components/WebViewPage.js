import React, {Component} from 'react';
import { View,WebView} from 'react-native';

export default class WebViewPage extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions ={
    header:null
  }

  render() {
    const {params} = this.props.navigation.state;
    console.log(params)
    return (
      <View>
        <WebView
          source={{uri: params.url}}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          decelerationRate="normal"
        />
      </View>
    );
  }
}
