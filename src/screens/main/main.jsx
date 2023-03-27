import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { Button } from "../../components/button";
import { removeIsUserLoggedIn } from "../../utils/help";

function Main({ navigation }) {
  const attemptToLogout = () => {
    removeIsUserLoggedIn();
    navigation.replace("Login");
  };

  const [users, setUsers] = useState();

  useEffect(() => {
    const scrapData = [];
    getDocs(collection(db, "users"))
      .then((response) => {
        response.forEach((doc) => {
          scrapData.push(doc.data());
        });

        // Sort the data alphabetically by first name
        scrapData.sort((a, b) => a.firstName.localeCompare(b.firstName));

        setUsers(scrapData);
      })
      .catch((error) => {});
  }, []);

  const __renderItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        margin: 10,
        flexDirection: "row",
      }}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 20, marginRight: 5 }}
        src={item.profileImgUrl}
      />
      <View>
        <Text style={{ fontSize: 20 }}>{item.firstName}</Text>
        <Text style={{ fontSize: 20 }}>{item.lastName}</Text>
        <Text style={{ fontSize: 20 }}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ justifyContent: "center", flex: 1, marginTop: 30 }}>
      <FlatList data={users} renderItem={__renderItem} />

      <View style={{ flexDirection: "row" }}>
        <Button primary title={"Log out"} onPress={attemptToLogout} />
      </View>
    </View>
  );
}

export { Main };
