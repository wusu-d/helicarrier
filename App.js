import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import SearchContextProvider from "./src/context/SearchContext";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold,
} from "@expo-google-fonts/lato";
import Transactions from "./src/components/Transactions";
import { SafeArea } from "./src/utility/SafeArea";

const client = new ApolloClient({
  uri: "https://helicarrier-challenge-api.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default function App() {
  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!robotoLoaded || !latoLoaded) {
    return null;
  }
  return (
    <ApolloProvider client={client}>
      <SearchContextProvider>
        <SafeArea>
          <Transactions />
        </SafeArea>
      </SearchContextProvider>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 70,
  },
});
