import React, {
  Component
} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import {
  red
} from 'ansi-colors';

export default class Header extends Component {
  constructor(props) {
    super(props);
    // console.log("wang-tag title:" + this.props.title);
    this.state = {
      headTitle: '',
      titleIndex: ''
    }
  }
  componentWillMount() {
    const {
      title
    } = this.props;
    this.renderHead(title);
  }
  renderHead(head) {
    // if (head === "home") {
    //   this.setState({
    //     headTitle: "首页",
    //     titleIndex: 0
    //   })
    // } else 
    if (head === "category") {
      this.setState({
        headTitle: "分类",
        titleIndex: 1
      })
    } else if (head === "suggest") {
      this.setState({
        headTitle: "建议",
        titleIndex: 2
      })
    } else if (head === "about") {
      this.setState({
        headTitle: "关于我们",
        titleIndex: 3
      })
    }
  }
  render() {
    // console.log("wang-tag titleIndex=" + this.state.titleIndex)
    return (
    <View >
      <Text style = {[
        styles.publicStyle,
        // this.state.titleIndex === 0 ? styles.aa : null ||
        this.state.titleIndex === 1 ? styles.bb : null ||
        this.state.titleIndex === 2 ? styles.cc : null ||
        this.state.titleIndex === 3 ? styles.dd : null
      ]} > 
      { this.state.headTitle} 
      </Text> 
    </View>
    )
  }
}
const styles = StyleSheet.create({
  publicStyle:{
    height:50,
    lineHeight:50,
    backgroundColor: "#0780f8",
    fontSize: 20,
  },
  aa: {
    textAlign: 'center',
    color: "#ffffff"
  },
  bb: {
    color: "#ff0000",
  },
  cc: {
    color: "#ff0080"
  },
  dd: {
    color: "#000080"
  }
})