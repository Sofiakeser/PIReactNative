import { View, Text, StyleSheet, Pressable, TextInput} from "react-native";
import { Component } from "react";


class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
           comentario: ''
        };
    }

    onSubmit() {
        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput keyboardType="default" placeholder="Comentario" onChangeText={text => this.setState({comentario: text})} style={styles.text2} />
                <Pressable onPress={() => this.onSubmit()}>
                    <Text style={styles.text1}>Enviar</Text>
                </Pressable>
                <View style={styles.datos}>
                    <Text style={styles.datos1}>Comentarios:</Text>
                    <Text style={styles.datos2}>{this.state.comentario}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
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
    },
    text2:{
        paddingVertical: 15,      
        paddingHorizontal: 10,    
        borderWidth: 1,           
        borderColor: '#ccc',      
        borderStyle: 'solid',     
        borderRadius: 6,          
        marginVertical: 10,
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


export default Comentarios;