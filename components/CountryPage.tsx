import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Country } from "../models/Country";
import { styles } from "./CountryPage.styles";
type CountryPageParam = {
  country: Country;
  close: () => void;
};
export const CountryPage: React.FC<CountryPageParam> = ({ country, close }) => {
  return (
    <View style={styles.container}>
      <Button buttonStyle={styles.closeButton} onPress={close}></Button>
      <Text>{country.name}</Text>
    </View>
  );
};
