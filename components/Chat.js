import React from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
// import { View, Text, Button } from 'react-native';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
// import react native gesture handler
import 'react-native-gesture-handler';

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
         },
         {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
         },
      ]
    })
  }

  onSend(messages = []) {
    this.setState( (previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  renderBubble(props) {
    return (
      <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
      }}
      />
    )
    }
    
  
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      { Platform.OS === 'android' ? ( <KeyboardAvoidingView behavior="height" />) : null }
    
</View>
    );
}


  // render() {
     // let name = this.props.route.params.name; // OR let { name } = this.props.route.params;
     // this.props.navigation.setOptions({ title: name });
    // return (
      // <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        // <Text>Hello Screen2!</Text>
        // <Button
          // title="Go to Start"
          // onPress={() => this.props.navigation.navigate('Start')}
        // />
     // </View>
    // )
  // }
}
