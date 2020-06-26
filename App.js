import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

class VideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jitsiVisible: false,
      isLoading: true
    }
    // this.onConferenceTerminated = this.onConferenceTerminated.bind(this);
    // this.onConferenceJoined = this.onConferenceJoined.bind(this);
    // this.onConferenceWillJoin = this.onConferenceWillJoin.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const url = 'https://meet.radiologex.com/123'; // can also be only room name and will connect to jitsi meet servers
      const userInfo = { displayName: 'User', email: 'user@example.com', avatar: 'https:/gravatar.com/avatar/abc123' };
      JitsiMeet.call(url, userInfo);
      this.setState({
        jitsiVisible: true,
        isLoading: false
      })
      /* You can also use JitsiMeet.audioCall(url) for audio only call */
      /* You can programmatically end the call with JitsiMeet.endCall() */
    }, 1000);
  }

  onConferenceTerminated = (nativeEvent) => {
    /* Conference terminated event */
    console.log("onConferenceTerminated>>>>>", nativeEvent)
  }

  onConferenceJoined = (nativeEvent) => {
    /* Conference joined event */
    console.log("onConferenceJoined>>>>>", nativeEvent)
  }

  onConferenceWillJoin = (nativeEvent) => {
    /* Conference will join event */
    console.log("onConferenceWillJoin>>>>>", nativeEvent)
  }

  render() {
    return (
      <View style={{ backgroundColor: 'black',flex: 1 }}>
        {this.state.jitsiVisible && (
            <JitsiMeetView
              onConferenceTerminated={this.onConferenceTerminated}
              onConferenceJoined={this.onConferenceJoined}
              onConferenceWillJoin={this.onConferenceWillJoin}
              style={{ flex: 1, height: '100%', width: '100%', backgroundColor: 'transparent' }} />
          )}
          {this.state.isLoading && (
            <View style={styles.loadingBackground}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
          )}
        {/* <JitsiMeetView onConferenceTerminated={this.onConferenceTerminated} onConferenceJoined={this.onConferenceJoined} onConferenceWillJoin={this.onConferenceWillJoin} style={{ flex: 1, height: '100%', width: '100%' }} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default VideoCall;
