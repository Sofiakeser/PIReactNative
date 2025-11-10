import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Comentarios from "../screens/Comentarios";
const Stack = createNativeStackNavigator();

function NavComment() {
    return (
        <Stack.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Comments' component={Comentarios}/>
        </Stack.Navigator>
    );
}

export default NavComment;