/* eslint-disable react/prop-types */

import axios from "../configs/axios";
import { createContext, useEffect, useState } from 'react'
import WSHook from "../hooks/WSHook";
import { toast } from "react-toastify";

const GpsContext = createContext()

function GpsContextProvider(props) {

    const [ visitWeb, setVisitWeb ] = useState([]);
    const [loading, setLoading] = useState(false);
    const { notifications } = WSHook();

    let token = localStorage.getItem('token');

    useEffect(() => {

        setLoading(true)
        const getVisit = async () => {
            try {
                const response = await axios.get('/api/gps', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    setLoading(false)
                    setVisitWeb(response.data.result)
                }
            }catch(err){
                setLoading(false)
                toast.error(err.response.data.message)
                console.log(err)
            }
        }
        
        getVisit();

    }, [token, notifications])

    useEffect(() => {

        const run = async () => {
            try {

                let token = localStorage.getItem('token');
                if(!token) return


            } catch (err) {
                toast.error(err.response.data.message)
                console.log(err.responese?.data?.message)
            }
        }
        run()

    }, [token])

    const value = { visitWeb, loading }

    return (
        <GpsContext.Provider value={value}>
            {props.children}
        </GpsContext.Provider>
    )
}

export { GpsContextProvider }
export default GpsContext;