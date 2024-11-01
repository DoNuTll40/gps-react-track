/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
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

                if(rs.status === 200){
                    setUser(rs.data)
                }

            } catch (err) {
                console.log(err)
                if (err.message === "Network Error") {
                    return toast.error("ไม่สามารถติดต่อกับเซิฟเวอร์ได้ในขณะนี้", {
                        theme: "colored",
                    });
                  }
                  toast.error(err.response.data.message, {
                    theme: "colored",
                  });
                  if (err.response.data.message.startsWith("Token verification failed")) {
                    setUser(null)
                    localStorage.removeItem('token')
                  }
          
                  if (err.response.data.message.startsWith("TokenExpiredError")) {
                    setUser(null)
                    localStorage.removeItem('token')
                  }
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