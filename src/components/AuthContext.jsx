import React,{ createContext, useContext, useState , useEffect} from "react";
import {executeJwtAuthenticationService} from './api/LoginApi.js'
import {apiClient} from './api/ApiClient.js'
//import { Navigate } from "react-router-dom";
//import { useCookies } from 'react-cookie'

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false)

    //const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [token, setToken] = useState(null)
    const [role,setRole] = useState(null)
    //const [cookies, setCookies] = useCookies(['myCookie'])

    useEffect(() => {
        // Check if there is a saved authentication state in localStorage
        const savedToken = localStorage.getItem('token');
        const savedEmail = localStorage.getItem('email');
        const savedRole = localStorage.getItem('role');

        //console.log(savedToken)
    
        if (savedToken && savedEmail && savedRole) {
          setToken(savedToken);
          setEmail(savedEmail);
          setRole(savedRole);
          setAuthenticated(true);
          
        //   <Navigate to="/welcome" />
        }
      }, []);


    async function login(email, password) {
    //async function login(username, password) {
        try{
            const response = (await executeJwtAuthenticationService(email,password))
            //console.log("below is response")
            console.log(response);
            //const response = await executeJwtAuthenticationService(username,password)
            if(response.status===200){
                const val=response.data.authenticationResponse.access_token
                
                const jwtToken = 'Bearer '+ val

                // Save the authentication state in localStorage
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('email', email);
                localStorage.setItem('role', response.data.role);
                
                //console.log("JWT Tokens")
                setToken(jwtToken)
                setAuthenticated(true)
                setRole(response.data.role)
                //setUsername(username)
                setEmail(email)

                //let expires = new Date()
                //expires.setTime(expires.getTime() + (432000000))
                //setCookie('token', response.data.token, { path: '/',  expires})
                //setCookies(response.data.role)
                //setCookies().ADMIN="TRUE"
                // const userRole=response.data.role
                // const data = {
                //     Role: userRole
                //   };
              
                
                //console.log("setting cookies")
                //setCookies('myCookie', data);
                //console.log(cookies.myCookie.Role)
                //setCookies('cookieName', 'cookieValue');
                // console.log(cookies)
                //console.log(userRole)

                // below will add jwt Token to all authorization headers 
                apiClient.interceptors.request.use(
                    (config) => {
                        
                        console.log("token added to all urls")
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true
            } else {
                logout()
                return false
            }
        }
        catch(error ){
            logout()
          return false
        }
     }

    function logout(){

        // Clear the authentication state from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        //setUsername(null)
        setEmail(null)
        setAuthenticated(false)
        setToken(null)
        setRole(null)
        //setCookies(null)
        
    }

    return (
        //<AuthContext.Provider value={ {isAuthenticated, username, token,login,logout}  }>
        <AuthContext.Provider value={ {isAuthenticated,setAuthenticated, email, token,login,logout,role,setRole/*,cookies,setCookies*/}  }>
            {children}
        </AuthContext.Provider>
    )
}