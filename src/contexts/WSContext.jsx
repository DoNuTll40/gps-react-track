import { createContext, useState, useEffect, useRef } from "react";

const WSContext = createContext(null);

// eslint-disable-next-line react/prop-types
const WSContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(`wss://cs125-personal-projects-64.onrender.com/`);

    ws.current.onopen = () => {
      console.log("Connected to Server");
    };

    ws.current.onmessage = (event) => {
      const { message, timestamp } = JSON.parse(event.data);

      // ตั้งเวลาช้า 5 วินาทีก่อนที่จะอัปเดตการแจ้งเตือน
      setTimeout(() => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { message, timestamp },
        ]);
      }, 500); // 5000 มิลลิวินาที = 5 วินาที
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const value = { notifications, setNotifications };

  return <WSContext.Provider value={value}>{children}</WSContext.Provider>;
};

export { WSContextProvider };
export default WSContext;
