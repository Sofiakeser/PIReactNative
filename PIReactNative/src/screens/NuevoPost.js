import { View, Text, StyleSheet, TextInput, Pressable} from "react-native";
import { Component } from "react";
import { db, auth } from "../firebase/config";

class NuevoPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: '',
            error: '',
            likes: [],
        }
    }
     
    subirPost() {
        const user = auth.currentUser;
            if (!user) {
                this.setState({ error: "Tenés que estar logueado para postear" });
            }
            else{
                db.collection("posts").add({
                    mensaje: this.state.mensaje,
                    email: auth.currentUser.email,
                    likes: [],
                    createdAt: Date.now(),
                })
                .then( res => this.setState({
                    mensaje: '', 
                    error: ''
                }) )
                .catch( error => this.setState({error: 'Error al subir el post'}) )
                }
            }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Nuevo Post</Text>
        
                <TextInput
                    keyboardType="default"
                    placeholder="Mensaje"
                    onChangeText={(text) => this.setState({ mensaje: text })}
                    value={this.state.mensaje}
                    style={styles.text2}
                />
        
                {this.state.error ? (
                <Text style={styles.datos2}>{this.state.error}</Text>
                ) : null}
        
                <Pressable onPress={() => this.subirPost()}>
                <Text style={styles.text1}>Postear</Text>
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

export default NuevoPost;