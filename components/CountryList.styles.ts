import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        margin: 10,
    },
    pressableCountry: {
        borderRadius: 10,
    },
    countryNameText: {
        fontSize: 50,
    },
    addButton: {
        width: 50,
        height: 50,
        alignSelf: "center",
    },
    dialog: {
        flexDirection: "column",
        justifyContent: "space-around",
    },
});
