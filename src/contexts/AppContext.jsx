/* eslint-disable react/prop-types */
import axios from "../configs/axios";
import { createContext, useEffect, useState } from "react"
// import LoadingPages from "../components/LoadingPages";

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true)
                let token = localStorage.getItem('token')
                if (!token) {
                    return
                }

                const rs = await axios.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}`}
                })

                setUser(rs.data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        run();
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, setLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };
export default AuthContext;