import { View, Text, StyleSheet, Pressable, FlatList} from "react-native";
import { Component } from "react";
import { db,auth } from "../firebase/config";
import Posts from "../components/Posts"

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            posts: []
        };
    }
    componentDidMount(){
        this.extraerDatos();
        this.mostrarPosts();
    }

    extraerDatos() {
        const user = auth.currentUser;
    
        if (user) {
          db.collection("users")
            .where("email", "==", user.email)  
            .onSnapshot((docs) => {
              let usuarios = [];
    
              docs.forEach((doc) => {
                let data = doc.data();
    
                usuarios.push({
                  id: doc.id,
                  username: data.username,
                  email: data.email,
                });
              });
    
              this.setState({
                usuarios: usuarios,
              });
            });
        }
      }

    mostrarPosts(){
        const user = auth.currentUser;
    
        if (user) {
          db.collection("posts")
            .where("email", "==", user.email)
            .orderBy("createdAt", "desc") 
            .onSnapshot((docs) => {
              let posts = [];
    
              docs.forEach((doc) => {
                let data = doc.data();
    
                posts.push({
                  id: doc.id,
                  data: doc.data(),
                });
              });
    
              this.setState({
                posts: posts,
              });
            });
        }
    }

    logout(){
        auth.signOut()
        this.props.navigation.navigate("Login")
    }
    
    render() {
        const user = auth.currentUser;
        return (
            <View style={styles.container}>
                <FlatList data={this.state.usuarios} 
                          keyExtractor={user => user.id.toString()} renderItem={({ item: user }) => (
                            <View key={user.id} style={styles.datos}>
                                <Text style={styles.datos1}>{user.username}</Text>
                                <Text style={styles.datos2}>{user.email}</Text>
                            </View>       
                )}/>
                <FlatList data={this.state.posts} 
                          keyExtractor={post => post.id.toString()} renderItem={({item}) => (
                          <Posts post = {item} navigation={this.props.navigation}/>       
                )}/>
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