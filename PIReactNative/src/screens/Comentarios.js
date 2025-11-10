import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { Component } from "react";
import { FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";


class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: "",
            comentarios: [],
            username: "",
        };
    }

    componentDidMount() {
        this.obtenerUsername();
        const postId = this.props.route.params.id;

        db.collection("posts")
            .doc(postId)
            .onSnapshot((doc) => {
                const data = doc.data();
                let comentarios = [];

                if (data && data.comentarios) {
                    comentarios = data.comentarios;
                }

                this.setState({
                    comentarios: comentarios
                });
            });
    }

    obtenerUsername() {
        const user = auth.currentUser;
        if (user) {
            db.collection("users")
                .where("email", "==", user.email)
                .onSnapshot((docs) => {

                    docs.forEach((doc) => {
                        const data = doc.data();
                        this.setState({ username: data.username });
                    });
                });
        }
    }


    onSubmit() {
        const user = auth.currentUser;

        db.collection("posts")
            .doc(this.props.route.params.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: user.email,
                    username: this.state.username,
                    comentario: this.state.comentario
                })
            });

        this.setState({
            comentario: ""
        });

        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.datos1} >{this.props.route.params.username}</Text>
                <Text>{this.props.route.params.mensaje}</Text>
                <Text>Likes: {this.props.route.params.likes.length}</Text>
                <TextInput keyboardType="default" placeholder="Comentario" onChangeText={text => this.setState({ comentario: text })} value={this.state.comentario} style={styles.text2} />
                <Pressable onPress={() => this.onSubmit()}>
                    <Text style={styles.text1}>Enviar</Text>
                </Pressable>

                <View style={styles.datos}>
                    <Text style={styles.datos1}>Comentarios:</Text>
                    <FlatList
                        data={this.state.comentarios}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.datos1} >{item.username}</Text>
                                <Text>{item.comentario}</Text>
                            </View>
                        )}
                    />
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
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        marginBottom: 10,
    },
    text1: {
        backgroundColor: '#A8C6FF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#A8C6FF',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
    },
    text2: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    datos: {
        backgroundColor: '#ecebebff',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ecebebff',
        marginTop: 10,
    },
    datos1: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});


export default Comentarios;