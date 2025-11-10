import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Pressable} from "react-native";
import Home from "../screens/Home";
import Perfil from "../screens/Perfil";
import NuevoPost from "../screens/NuevoPost";
const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name='Home' component={Home}/>
            <Tab.Screen name='Perfil' component={Perfil}/>
            <Tab.Screen name="NewPost" component={NuevoPost}/>
        </Tab.Navigator>
    );
}

export default HomeMenu;