import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

// @ts-ignore: if you use typescript you need to add the extension to tsconfig
import webview from "./example.webview";

export default function App() {
  let [contents, setContents] = React.useState("");

  React.useEffect(() => {
    async function loadContentsAsync() {
      // Ensure it's on local file system rather than accessed over network
      const asset = Asset.fromModule(webview);
      await asset.downloadAsync();

      // Now that it's on FileSystem we can read the data
      const data = await FileSystem.readAsStringAsync(asset.localUri!);
      setContents(data);
    }

    loadContentsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{contents ? contents : "loading"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
