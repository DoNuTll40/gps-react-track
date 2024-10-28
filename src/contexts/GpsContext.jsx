/* eslint-disable react/prop-types */

import axios from "../configs/axios";
import { createContext, useEffect, useState } from 'react'

const GpsContext = createContext()

function GpsContextProvider(props) {

    const [ visitWeb, setVisitWeb ] = useState([]);

    let token = localStorage.getItem('token');

    useEffect(() => {
        const run = async () => {
            try {

                let token = localStorage.getItem('token');
                if(!token) return


            } catch (err) {
                console.log(err.responese?.data?.message)
            }
        }
        run()

        const getVisit = async () => {
            try {
                const response = await axios.get('/api/gps', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setVisitWeb(response.data.result)
            }catch(err){
                console.log(err)
            }
        }

        getVisit();
    }, [token])

    const value = { visitWeb }

    return (
        <GpsContext.Provider value={value}>
            {props.children}
        </GpsContext.Provider>
    )
}

export { GpsContextProvider }
export default GpsContext;