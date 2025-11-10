import { Component } from "react";
import { View, Text, StyleSheet, Pressable, FlatList} from "react-native";
import firebase from "firebase";
import { db,auth } from "../firebase/config";
import Posts from "../components/Posts"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            error: '',
            mensaje: '',
        };
    }

    componentDidMount(){
        this.verPosts();
    }

    verPosts() {
        const user = auth.currentUser;
        if (!user) {
            this.setState({ error: "Tenés que estar logueado para ver los posts" });
        }
        else{
                db.collection("posts")
                .orderBy("createdAt", "desc")
                .onSnapshot( docs => {
                    let posts = [];
                    docs.forEach( doc => {
                        posts.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    this.setState({ posts: posts });
                })
            }
        }
    
    render() {
        const user = auth.currentUser;
        return (
            <View style={styles.container}>
                <FlatList data={this.state.posts} 
                          keyExtractor={post => post.id.toString()} renderItem={({item}) => (
                          <Posts post = {item} navigation = {this.props.navigation}/>
                                 
                )}/>
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
});

export default Home;