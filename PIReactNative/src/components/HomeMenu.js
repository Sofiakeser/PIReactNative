import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Pressable} from "react-native";
import Perfil from "../screens/Perfil";
import NuevoPost from "../screens/NuevoPost";
import NavComment from "./NavComment";
const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name='NavComments' component={NavComment}/>
            <Tab.Screen name='Perfil' component={Perfil}/>
            <Tab.Screen name="NewPost" component={NuevoPost}/>
        </Tab.Navigator>
    );
}

export default HomeMenu;