import { View, Text, StyleSheet, Pressable} from "react-native";
import { Component } from "react";
import { db, auth } from "../firebase/config";

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes:[]
        }
    }

    likear(postId){
        const user = auth.currentUser;
        const yaLikeado = this.state.likes.includes(postId);
        db.collection("posts").doc(postId)
        .update({
            likes: yaLikeado ? 
            firebase.firestore.FieldValue.arrayRemove(user.email) : 
            firebase.firestore.FieldValue.arrayUnion(user.email)
        })
        if(yaLikeado){
            this.setState({
                likes: this.state.likes.filter(id => id !== postId)
            });   
        } else {
            const likeado = this.state.likes;
            likeado.push(postId);
            this.setState({ likes: likeado });
        }
    }

    render() {
        return (
            <View key={this.props.post.id} style={styles.datos}>
                                <Text style={styles.datos1}>{this.props.post.data.email}</Text>
                                <Text style={styles.datos2}>{this.props.post.data.mensaje}</Text>
                                <Text> Likes: {this.props.post.data.likes.length} </Text>
                                <Pressable onPress={() => this.likear(this.props.post.id)}>
                                    <Text>{this.props.post.data.likes.includes(auth.currentUser.email) ? "No me gusta" : "Me gusta"}</Text>
                                </Pressable>
                                <Pressable onPress={() => this.props.navigation.navigate("NavComments", {screen: "Comments", params: {id: this.props.post.id, email: this.props.post.data.email, mensaje: this.props.post.data.mensaje, likes: this.props.post.data.likes, 
                                    comentarios:this.props.post.data.comentarios}})}>
                                    <Text>Comentar</Text>
                                </Pressable>
                            </View>
        );
    }
};

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

export default Posts;