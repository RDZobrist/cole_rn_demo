import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  Animated,
  RefreshControl,
  TouchableOpacity,
  TextInput,
} from "react-native";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [tab, setTabs] = useState([
    "All assets",
    "Tradable",
    "Gainers",
    "Losers",
  ]);

  const [data, setData] = useState([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ]);

  const [selectedTab, setSelectedTab] = useState(0);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [isAnimated, setIsAnimated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [limit, setLimit] = useState(height * 0.1);
  const [myRefresh, setMyRefresh] = useState(0);

  useEffect(() => {}, [tab]);

  function handlePressTab(index) {
    setSelectedTab(index);
  }

  function fadeInText() {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // setIsAnimated(true);
      setFadeAnim(new Animated.Value(1));
    });
  }

  function fadeOutText() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // setIsAnimated(false);
      setFadeAnim(new Animated.Value(0));
    });
  }

  function onScroll(e) {
    console.log("limit =>", limit);
    console.log("height =>", e.nativeEvent.contentOffset.y);

    if (e.nativeEvent.contentOffset.y > limit && isAnimated == true) {
      console.log("if");
    } else if (e.nativeEvent.contentOffset.y > limit) {
      console.log("else if 1");
      fadeInText();
      setIsAnimated(true);
    } else if (e.nativeEvent.contentOffset.y < limit && isAnimated == false) {
      console.log("else if 2");
      // fadeOutText()
    } else if (e.nativeEvent.contentOffset.y < limit && isAnimated == true) {
      console.log("else if 3");
      fadeOutText();
      setIsAnimated(false);
    }
  }

  function onRefresh() {
    if (refreshing == false) {
      setRefreshing(true);

      setTimeout(() => {
        setData([...data, ...data]);
        setRefreshing(false);
      }, 2000);
    }
  }

  function onPressSearch() {
    setIsSearch((prev) => !prev);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <View
          style={{
            height: height * 0.035,
            width: "100%",
            backgroundColor: null,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text
            style={{ opacity: fadeAnim, fontWeight: "bold", fontSize: 16 }}
          >
            Market is up +4.07%
          </Animated.Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEventThrottle={0.01}
          onScroll={onScroll}
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[1]}
        >
          <View
            style={{
              height: height * 0.1,
              width: "100%",
              backgroundColor: null,
              flexDirection: "row",
            }}
          >
            {isSearch ? (
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  width: "80%",
                  height: "70%",
                  marginStart: width * 0.03,
                }}
                placeholder="Search here"
              />
            ) : (
              <View style={{ flex: 8, justifyContent: "center" }}>
                <Text style={{ marginLeft: "5%" }}>in the past 24 Hours</Text>

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
                    style={{ fontSize: 18, color: "green", fontWeight: "bold" }}
                  >
                    +4.04%
                  </Text>
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => onPressSearch()}
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: isSearch
                    ? "https://cdn.iconscout.com/icon/free/png-256/close-1912235-1617704.png"
                    : "https://image.shutterstock.com/image-vector/search-icon-any-purposes-260nw-1697401045.jpg",
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

          <View
            style={{
              height: height * 0.05,
              width: "100%",
              backgroundColor: "tan",
              // flexDirection: 'row',
              // alignItems: 'center',
            }}
          >
            <ScrollView
              style={{ height: height * 0.05 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {tab.map((item, index) => {
                return (
                  <Text
                    onPress={() => handlePressTab(index)}
                    key={index}
                    style={{
                      textAlign: "center",
                      backgroundColor: selectedTab == index ? "#F3F7FD" : null,
                      marginRight: 5,
                      padding: 5,
                      borderRadius: 10,
                      width: 100,
                    }}
                  >
                    {item}
                  </Text>
                );
              })}
            </ScrollView>
          </View>

          {data.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  height: height * 0.1,
                  width: "100%",
                  backgroundColor: "orange",
                  marginTop: height * 0.004,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: width * 0.1,
                    height: width * 0.1,
                    borderRadius: (height + width) / 2,
                    marginStart: width * 0.03,
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{
                      uri: "https://bitcoin.org/img/icons/opengraph.png?1644775669",
                    }}
                    resizeMode="cover"
                  />
                </View>

                <View style={{ marginStart: width * 0.03 }}>
                  <Text>Bitcoin</Text>
                  <Text>BTC</Text>
                </View>

                <View
                  style={{
                    position: "absolute",
                    right: 15,
                  }}
                >
                  <Text>{index}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
