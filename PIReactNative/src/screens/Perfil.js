import { View, Text, StyleSheet, Pressable, TextInput} from "react-native";
import { Component } from "react";
import { db,auth } from "../firebase/config";

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    logout(){
        auth.signOut()
        this.props.navigation.navigate("Login")
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Pressable onPress={() => this.logout()}>
                    <Text style={styles.text1}>Logout</Text>
                </Pressable>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 10,
    },    
    text1:{
        backgroundColor: 'lightgreen', 
        paddingHorizontal: 10,      
        paddingVertical: 6,         
        borderRadius: 4,            
        borderWidth: 1,             
        borderStyle: 'solid',       
        borderColor: 'lightgreen',     
        alignItems: 'center',  
        textAlign: 'center',     
        marginTop: 10,
        width: 250,
    },
    text2:{
        paddingVertical: 15,      
        paddingHorizontal: 10,    
        borderWidth: 1,           
        borderColor: '#ccc',      
        borderStyle: 'solid',     
        borderRadius: 6,          
        marginVertical: 10,
        width: 250,
    },
    datos:{
        backgroundColor: '#ecebebff', 
        paddingHorizontal: 10,      
        paddingVertical: 6,         
        borderRadius: 4,            
        borderWidth: 1,             
        borderStyle: 'solid',       
        borderColor: '#ecebebff',         
        marginTop: 10,
    },
    datos1:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    datos2:{
        fontSize: 14,
    },
});

export default Perfil;