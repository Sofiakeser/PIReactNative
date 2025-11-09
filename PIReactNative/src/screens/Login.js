import { Component } from "react";
import { View, Text, StyleSheet, Pressable, TextInput} from "react-native";
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: '',
            error2: '',
            error3: ''
        };
    }
    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
        .then( response => {   
                this.setState({loggedIn: true});
                this.props.navigation.navigate("HomeMenu");
                console.log(this.state);   
            })
        .catch( error => {
            if (!email.includes("@")) {
                this.setState({error: "Email mal formateado"}); 
            }
            else if(email.includes("@")) {
                this.setState({error: ""});
            }
            if(pass.length < 6) {
                this.setState({error2: "La contraseña debe tener al menos 6 caracteres"});
            }
            else if (pass.length >= 6) {
                this.setState({error2: ""});
            }
            if (error.message === "{\"error\":{\"code\":400,\"message\":\"INVALID_LOGIN_CREDENTIALS\",\"errors\":[{\"message\":\"INVALID_LOGIN_CREDENTIALS\",\"domain\":\"global\",\"reason\":\"invalid\"}]}}") {
                this.setState({error3: "Credenciales incorrectas"});
            }
        });
        
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user.email == auth.currentUser.email){
                this.props.navigation.navigate("HomeMenu")
            }
        })}  

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Ingresar</Text>

                <TextInput keyboardType="email-address" placeholder="Email" onChangeText={text => this.setState({email: text})} style={styles.text2} />
                    <Text style={styles.datos2}>{this.state.error}</Text>

                <TextInput keyboardType="default" secureTextEntry={true} placeholder="Password" onChangeText={text => this.setState({password: text})} style={styles.text2} />
                    <Text style={styles.datos2}>{this.state.error2}</Text>

                    <Text style={styles.datos2}> {this.state.error == "" && this.state.error2 == "" ? (this.state.error3) : null}</Text>
                    
                <Pressable onPress={() => this.login(this.state.email, this.state.password)}>
                    <Text style={styles.text1}>Iniciar Sesion</Text>
                </Pressable>
                    
            <Pressable onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={styles.text1}>No tengo cuenta</Text>
            </Pressable>

            <View style={styles.datos}>
                <Text style={styles.datos1}>
                   Datos ingresados:
                </Text>
                <Text style={styles.datos2}>
                    Email: {this.state.email}
                </Text>
                <Text style={styles.datos2}>
                    Password: {this.state.password}
                </Text>
            </View>
        </View>
    );
}}

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

export default Login;