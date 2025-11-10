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

export default Home;