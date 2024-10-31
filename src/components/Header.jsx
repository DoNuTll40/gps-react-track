import { useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserAlt, faUsersGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Header() {
  const { user, logout } = UseAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const hdlClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 540px)");

    // ฟังก์ชันตรวจจับการเปลี่ยนแปลงขนาดหน้าจอ
    const handleResize = (e) => {
      if (e.matches && isOpen) {
        setIsOpen(false);
      }
    };
  
    // เช็คครั้งแรกตอนโหลดหน้า
    handleResize(mediaQuery);
  
    // ฟังการเปลี่ยนแปลงของ media query
    mediaQuery.addListener(handleResize);
  
    // ลบ listener เมื่อ component ถูก unmount
    return () => mediaQuery.removeListener(handleResize);
  }, [isOpen])

  return (
    <div className="flex flex-col inset-y-0 z-10 backdrop-blur-md bg-white/50 gap-4 sticky select-none">
      <div className="border p-2 rounded-md shadow-sm">
        <div className="flex h-11 justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-11 h-11 hidden sm:block">
              <img
                className="max-w-11 max-h-11 rounded-full"
                src="https://img.lovepik.com/free-png/20211201/lovepik-gps-satellite-navigation-png-image_401246127_wh1200.png"
                alt="logo"
              />
            </div>
            <h1 className="text-md md:text-1xl font-bold px-1 select-none hover:cursor-pointer" onClick={ () => navigate("/")}>
              ข้อมูลการเข้าใช้งานเว็บ
            </h1>
          </div>
          <div className="text-xs md:text-sm gap-2 items-center hidden sm:flex select-none">
            <p>ผู้ใช้งาน {user.user_firstname}</p>
            <button
              className="p-2 px-4 text-xs md:text-sm border-2 border-red-600 rounded-md text-red-600 font-bold hover:bg-red-600 hover:text-white transition ease-in-out scale-100 active:scale-95"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              ออกจากระบบ
            </button>
          </div>
          <FontAwesomeIcon
            className="block text-lg sm:hidden mr-2 transition-all duration-150 ease-in-out transform hover:cursor-pointer scale-100 active:scale-90 hover:bg-blue-gray-50 active:bg-blue-gray-50 p-4 rounded-md"
            onClick={hdlClick}
            icon={!isOpen ? faBars : faXmark}
          />
        </div>

        {/* response mobile */}
        <div className={`${isOpen ? "opacity-100 translate-y-0 scale-100 my-2 py-2 border-t" : " translate-y-[-20px] opacity-0 scale-90"} transition-all transform duration-200 ease-in-out select-none`}>
          {isOpen && (
            <div className={`flex gap-2 pt-2 flex-col ${isOpen ? "opacity-100 translate-x-0 scale-100" : " translate-x-[-20px] opacity-0 scale-90"} transition-all transform duration-200 ease-in-out`}>
              <div className="shadow-md text-sm flex flex-col gap-2 border p-2 rounded-md">
                <p><FontAwesomeIcon icon={faUserAlt} /> <b>ผู้ใช้งาน</b> : {user.user_firstname} {user.user_lastname}</p>
                <p><FontAwesomeIcon icon={faUsersGear} /> <b>ตำแหน่ง</b> : {(user.user_role).toLowerCase()}</p>
              </div>
              <button
                className="p-2 px-4 text-xs md:text-sm border-2 border-red-600 rounded-md text-red-600 font-bold hover:bg-red-600 hover:text-white transition ease-in-out scale-100 active:scale-95"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
