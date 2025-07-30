import { useContext, createContext, useState, useEffect } from "react";
import api from "../services/api";
import { headerItems } from "../const/constants";

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }) {

    const [user, setUser] = useState({})
    const [menuItems, setMenuItems] = useState(headerItems);

    useEffect(() => {
        const loadUser = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                try {
                    const res = await api.get("/users", { params: { id: userId } });
                    if (res.data?.length > 0) {
                        setUser(res.data[0]);
                    }
                } catch (err) {
                    console.error("Failed to load user", err);
                    localStorage.removeItem("userId");
                }
            }
        };

        loadUser();
    }, []);

    const login = (userData) => {
        localStorage.setItem("userId", userData.id);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userId");
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, menuItems, setMenuItems }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;