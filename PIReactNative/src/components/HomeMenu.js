import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Perfil from "../screens/Perfil";
import NuevoPost from "../screens/NuevoPost";
import NavComment from "./NavComment";
const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name='NavComments' component={NavComment}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home-heart" size={24} color="black" />
                )
            }}/>

            <Tab.Screen name="NewPost" component={NuevoPost}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle-outline" size={size} color={color} />
                )
            }}/>

            <Tab.Screen name='Perfil' component={Perfil} options={{
                tabBarIcon: ({ color, size }) => (
                    <EvilIcons name="user" size={24} color={color} />
                )
            }}/>
        </Tab.Navigator>
    );
}

export default HomeMenu;