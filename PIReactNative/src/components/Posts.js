import { View, Text, StyleSheet, Pressable} from "react-native";
import { Component } from "react";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Posts extends Component {
    constructor(props) {
        super(props);
    }

    likear(postId){
        const user = auth.currentUser;
        const yaLikeado = this.props.post.data.likes.includes(user.email);
        db.collection("posts").doc(postId)
        .update({
            likes: yaLikeado ? 
            firebase.firestore.FieldValue.arrayRemove(user.email) : 
            firebase.firestore.FieldValue.arrayUnion(user.email)
        })
    }

    render() {
        return (
            <View key={this.props.post.id} style={styles.datos}>
                                <Text style={styles.datos1}>{this.props.post.data.username}</Text>
                                <Text style={styles.datos2}>{this.props.post.data.mensaje}</Text>
                                <Text style={styles.datos2}> Likes: {this.props.post.data.likes.length} </Text>
                                <Pressable style={styles.likeButton} onPress={() => this.likear(this.props.post.id)}>
                                    <Text style={styles.botonLike}>{this.props.post.data.likes.includes(auth.currentUser.email) ? "No me gusta" : "Me gusta"}</Text>
                                </Pressable>
                                <Pressable style={styles.likeButton} onPress={() => this.props.navigation.navigate("NavComments", {screen: "Comments", params: {id: this.props.post.id, email: this.props.post.data.email, mensaje: this.props.post.data.mensaje, likes: this.props.post.data.likes, 
                                    comentarios:this.props.post.data.comentarios, username: this.props.post.data.username}})}>
                                    <Text style={styles.botonComentar}>Comentar</Text>
                                </Pressable>
                            </View>
        );
    }
};

const styles = StyleSheet.create({
    datos: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 15,
      marginHorizontal: 20,
      borderRadius: 16,
    },
    datos1: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#333',
      marginBottom: 8,
    },
    datos2: {
      fontSize: 16,
      color: '#555',
      marginBottom: 12,
    },
    likeButton: {
      backgroundColor: '#A8C6FF',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginTop: 5,
      marginBottom: 8,
      alignSelf: 'flex-start',
    },
    likeButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    },
    commentButton: {
      backgroundColor: '#34A853',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginTop: 5,
      alignSelf: 'flex-start',
    },
    commentButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    }
  });
  

export default Posts;