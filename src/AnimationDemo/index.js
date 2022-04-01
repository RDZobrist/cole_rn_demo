import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  SafeAreaView,
  useWindowDimensions,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import ContactList from "./ContactList";

const { height, width } = Dimensions.get("window");
const HEADER_HEIGHT = 150;
const COLLAPSED_HEIGHT = 42 + 10;
const SCROLLABLE_HEIGHT = HEADER_HEIGHT - COLLAPSED_HEIGHT;

export default function AnimatedTabView() {
  const layout = useWindowDimensions();
  //

  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  const scroll = new Animated.Value(0);

  const FirstRoute = () => {
    return (
      <ContactList
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      />
    );
  };

  const SecondRoute = () => {
    return (
      <ContactList
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      />
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderLabel = ({ route, focused, color }) => (
    <Text
      style={{
        color: "black",
      }}
    >
      {route.title}
    </Text>
  );

  const renderTabBar = (props) => {
    console.log("props ===>", props);

    const translateY = scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [0, -SCROLLABLE_HEIGHT + 20],
      extrapolate: "clamp",
    });

    const translateYMinus = scroll.interpolate({
      inputRange: [0, SCROLLABLE_HEIGHT],
      outputRange: [-SCROLLABLE_HEIGHT, SCROLLABLE_HEIGHT - 20],
      extrapolate: "clamp",
    });

    return (
      <>
        <Animated.View
          style={[styles.header, { transform: [{ translateY: translateY }] }]}
        >
          <View style={[styles.cover]}>
            <View style={styles.overlay}>
              <View>
                <Text style={{ marginLeft: "5%", color: "black" }}>
                  in the past 24 Hours
                </Text>

                <Text
                  style={{
                    fontSize: 18,
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "5%",
                  }}
                >
                  Market is up{" "}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    +4.04%
                  </Text>
                </Text>
              </View>

              <TouchableOpacity onPress={() => {}} style={{ marginRight: 20 }}>
                <Image
                  source={{
                    uri: "https://image.shutterstock.com/image-vector/search-icon-any-purposes-260nw-1697401045.jpg",
                  }}
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 12.5,
                    borderWidth: 1,
                    borderColor: "black",
                  }}
                />
              </TouchableOpacity>
            </View>

            <Animated.View
              style={[
                styles.header,
                {
                  transform: [{ translateY: translateYMinus }],
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Market is up +4.07%
              </Text>
            </Animated.View>

            <TabBar
              {...props}
              style={styles.tabbar}
              renderLabel={renderLabel}
              indicatorStyle={styles.indicatorStyle}
              contentContainerStyle={styles.tabContainer}
              tabStyle={{}}
            />
          </View>
        </Animated.View>
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={{ flex: 1 }}>
        <TabView
          style={styles.container}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cover: {
    height: HEADER_HEIGHT,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  tabbar: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0,
    height: 35,
  },
  indicatorStyle: {
    backgroundColor: "cyan",
    height: 35,
    borderRadius: 10,
  },
  tabContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
