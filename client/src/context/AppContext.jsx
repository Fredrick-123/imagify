import { createContext , useEffect, useState} from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState('');
    const [showLogin, setShowLogin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(0)

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const loadCreditData = async ()=>{
        try {
            const {data} = await axios.get(backendURL + '/api/user/credits', {headers: {token}})

            if(data.success){
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    useEffect(()=>{
        if(token){
            loadCreditData();
            setShowLogin(false)
        }
    },[token])

    const value = {
        user, setUser,
        showLogin, setShowLogin,
        backendURL,
        token, setToken,
        credit, setCredit,
        loadCreditData,
        logout,

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export { AppContext };
export default AppContextProvider;