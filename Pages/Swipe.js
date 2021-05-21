import React, { useState, useContext, useEffect, useRef } from "react";
import styled from '../node_modules/styled-components/native';
import { View, Dimensions, Image, Animated, PanResponder, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AuthContext from '../context/auth-context.js';


const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fff;
`
const StyledLabel = styled.Text`
  padding: 10px;
  font-family: "Avenir";
  font-size: 32px;
  color: black;
  align-self: center;
  border-width: 3px;
  font-weight: 900;
`
const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 32px;
  padding-bottom: 5px;
  color: white;
  font-weight: 800;
  align-self: flex-start;
`
const StyledSecondaryText = styled.Text`
  font-family: 'Avenir';
  font-size: 24px;
  padding-bottom: 5px;
  color: #2a9d8f;
  font-weight: 400;
  align-self: flex-start;
`
const StyledBottomBar = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-left: 25px;
  padding-right: 25px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 30px;
`


export default function Swipe(props, { navigation }) {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [delayedIndex, setDelayedIndex] = useState(0)
  const [activities, setActivities] = useState([])
  const [state, dispatch] = useContext(AuthContext)

  const SCREEN_HEIGHT = Dimensions.get('window').height
  const SCREEN_WIDTH = Dimensions.get('window').width

  const position = useRef(new Animated.ValueXY()).current
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })
  const saveOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })
  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  })
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.5, 1],
    extrapolate: 'clamp'
  })
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.95, 1],
    extrapolate: 'clamp'
  })

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: position.x, dy: position.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
            speed: 100,
            restSpeedThreshold: 100,
            restDisplacementThreshold: 40
          }).start(() => {
            setCurrentIndex(currentIndex => currentIndex + 1)
          })
        } else if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
            speed: 100,
            restSpeedThreshold: 100,
            restDisplacementThreshold: 40
          }).start(() => {
            setCurrentIndex(currentIndex => currentIndex + 1)
          })
        } else {
          Animated.spring(position, {
            toValue: {x: 0, y: 0},
            speed: 100,
            useNativeDriver: true
          }).start(position.setValue({ x: 0, y: 0 }))
        }
      }
    })
  ).current;


  useEffect(() => {
    grabUserLongitudeAndLatitude()
    console.log(activities[0])
  }, [])

  useEffect(() => {
    console.log("Current Index Counter: ", currentIndex)
    position.setValue({ x: 0, y: 0 })

    // the timeout is purely to allow smooth transitions so the rendering doesn't flicker on the user
    let timeout
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setDelayedIndex(delayedIndex => delayedIndex + 1)
    }, 100);
  }, [currentIndex])

  useEffect(() => {
    console.log("Current Delayed Counter: ", delayedIndex)
  }, [delayedIndex])

  const grabUserLongitudeAndLatitude = async () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const dataBeforeStringify = {"latitude": position.coords.latitude, "longitude": position.coords.longitude}
        const data = JSON.stringify(dataBeforeStringify)
        console.log("DATA: ", data)
        
        fetch('http://192.168.1.67:8080/swipe-activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },      
          body: data
        })
        .then((response) => {
          response.json().then((data) => {
            setActivities(data)
          });
        })
        .catch((error) => {
          console.error(error)
        });      
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  }  


  return (
      <StyledContainer>
        <View style={{ flex: 1 }}>
          {/* This is to render a fake card so it has a smooth transition */}
          {activities.length > delayedIndex ? 
            <Animated.View
              key={activities[delayedIndex].id}
              style={[
                {
                  height: SCREEN_HEIGHT - 120,
                  width: SCREEN_WIDTH,
                  padding: 10,
                  position: 'absolute',
                }
              ]}
            >
              <Image
                style={{
                  flex: 1,
                  height: null,
                  width: null,
                  resizeMode: "cover",
                  borderRadius: 30
                }}
                source={{uri: activities[delayedIndex].image_url}}
              />
            </Animated.View>
          :
            null
          }

          { activities.map((item, i) => {
            if (i < currentIndex) {
              return null
              // Create a splash screen with a message
            } else if (i == currentIndex) {
              return (
                <Animated.View
                  {...panResponder.panHandlers}
                  key={item.id}
                  style={[
                    { transform: [{translateX: position.x}, {translateY: position.y}, {rotate: rotate}] },
                    {
                      height: SCREEN_HEIGHT - 120,
                      width: SCREEN_WIDTH,
                      padding: 10,
                      position: 'absolute'
                    }
                  ]}
                >
                  <Animated.View
                    style={{
                    transform: [{ rotate: "-30deg" }],
                    opacity: saveOpacity,
                    position: "absolute",
                    top: 50,
                    left: 40,
                    zIndex: 1000
                    }}
                  >
                    <StyledLabel
                      style={{
                        borderColor: "green",
                        color: "green"
                      }}
                    >
                      SAVE
                    </StyledLabel>
                  </Animated.View>
                  <Animated.View
                    style={{
                    transform: [{ rotate: "30deg" }],
                    opacity: nopeOpacity,
                    position: "absolute",
                    top: 50,
                    right: 40,
                    zIndex: 1000
                    }}
                  >
                    <StyledLabel
                      style={{
                        borderColor: "red",
                        color: "red"
                      }}
                    >
                      NOPE
                    </StyledLabel>
                  </Animated.View>
                  <Animated.View
                    style={{
                    position: "absolute",
                    bottom: 10,
                    width: '100%',
                    height: '50%',
                    alignSelf: 'center',
                    zIndex: 1000,
                    }}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 10,
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        borderRadius: 30,
                      }}
                    >
                      <StyledText>{item.name}</StyledText>
                      <StyledSecondaryText>{item.rating}/5 from {item.review_count} reviews</StyledSecondaryText>
                      <StyledSecondaryText>{item.price}</StyledSecondaryText>

                    </LinearGradient>
                  </Animated.View>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 30
                    }}
                    source={{uri: item.image_url}}
                  />
                </Animated.View>
              )
            }
          }).reverse()}
        </View>
      </StyledContainer>
  );
};