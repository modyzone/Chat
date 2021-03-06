import React from 'react';
// import { View, Text, Button } from 'react-native';
import { View, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { 
  GiftedChat, 
  Bubble,
  InputToolbar,
 } from 'react-native-gifted-chat'

import firebase from 'firebase';
import 'firebase/firestore';



  // web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyC4hkJWJiVeZA8l0jo-LMfGjbdStTj1R9M",
  authDomain: "test-279ee.firebaseapp.com",
  projectId: "test-279ee",
  storageBucket: "test-279ee.appspot.com",
  messagingSenderId: "174026807801",
  appId: "1:174026807801:web:a5efa74d58c3ac0e144528",
  measurementId: "G-XX9DBW1M7R"

    };

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
			user: {
				_id: '',
				name: '',
				avatar: '',
			},
    };

    
    // Initialize Firebase
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
  
  // reference to the Firestore messages collection
  this.referenceChatMessages = firebase.firestore().collection('messages');
}
   
onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    var data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: {
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar,
      },
    });
  });
  this.setState({
    messages: messages,
  });
};
  
   

    /* let { name } = this.props.route.params;
		this.props.navigation.setOptions({ title: name })

    componentWillUnmount() {
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribe();
    }*/
  

  
      componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        		// listens for updates in the collection
		this.unsubscribe = this.referenceChatMessages
    .orderBy('createdAt', 'desc')
    .onSnapshot(this.onCollectionUpdate);

  this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
    if (!user) {
      return await firebase.auth().signInAnonymously();
    }
    this.setState({
      uid: user.uid,
      messages: [],
      user: {
        _id: user.uid,
        name: name,
        avatar: 'https://placeimg.com/140/140/any',
      },
    });
  });
}
   
    // calback function for when user sends a message
  	componentWillUnmount() {
      // stop listening to authentication
      this.authUnsubscribe();
      // stop listening for changes
      this.unsubscribe();
    }
  
    addMessage() {
      const message = this.state.messages[0];
      // add a new message to the collection
      this.referenceChatMessages.add({
        _id: message._id,
        text: message.text || '',
        createdAt: message.createdAt,
        user: this.state.user,
      });
    }
  
    onSend(messages = []) {
      this.setState(
        previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }),
        () => {
          // this.saveMessage();
          this.addMessage();
        }
      );
    }
    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#dbb35a',
            },
            left: {
              backgroundColor: 'white',
            },
          }}
        />
      );
    }
    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return <InputToolbar {...props} />;
      }
    }
  render() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    let bgColor = this.props.route.params.bgColor;

    return (
      
        <View style={styles.container}>
        <View
					style={{ backgroundColor: bgColor, 
            width: '100%', 
            height: '100%' 
          }}
				>
        <GiftedChat
        style={styles.giftedChat}
        renderBubble={this.renderBubble.bind(this)}
        renderInputToolbar={this.renderInputToolbar.bind(this)}
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: this.state.user._id,
          name: this.state.name,
					avatar: this.state.user.avatar,
        }}
      />
      { Platform.OS === 'android' ? ( <KeyboardAvoidingView behavior="height" />) : null }
    </View>
</View>
    );
}

}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  },
  giftedChat: {
      color: '#000',
  },
});

 // listen to authentication events
    /*this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: 'Hello there',
      });
      // create a reference to the active user's documents (shopping lists)
      this.referenceShoppinglistUser = firebase
      .firestore()
      .collection('shoppinglists')
      .where("uid", "==", this.state.uid);
      // listen for collection changes for current user 
      this.unsubscribeListUser = this.referenceShoppinglistUser.onSnapshot(
        this.onCollectionUpdate
        );
      });
    // get username prop from Start.js
    
    
      /* this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);*/

        // listen for collection changes for current user
      /* this.unsubscribeListUser = this.referenceShoppinglistUser
      .onSnapshot(this.onCollectionUpdate); */

     /* this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)
    });
  }
  
    /*let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
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
  }*/
// add a new list to the collection
/*this.referenceShoppingLists.add({
  name: 'TestList',
  items: ['eggs', 'pasta', 'veggies'],
  uid: this.state.uid,
});
/* this.referenceShoppinglistUser = firebase.firestore().collection('shoppinglists').where("uid", "==", this.state.uid);*/
/*this.referenceChatMessages = firebase.firestore().collection("messages");
firebase.firestore().collection('shoppinglists').doc('list1');
onCollectionUpdate = (querySnapshot) => {
  const messages = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    let data = doc.data();
    messages.push({
      _id: data._id,
      text: data.text,
      createdAt: data.createdAt.toDate(),
      user: data.user,
    });
  });
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
 }*/
