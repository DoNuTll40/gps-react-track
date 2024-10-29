
import { useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";

function Header() {
  const { user, logout } = UseAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sticky">
      <div className="border p-2 rounded-md shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-11 h-11">
              <img
                className="max-w-11 max-h-11 rounded-full"
                src="https://img.lovepik.com/free-png/20211201/lovepik-gps-satellite-navigation-png-image_401246127_wh1200.png"
                alt="logo"
              />
            </div>
            <h1 className="text-md md:text-1xl font-bold">ข้อมูลการเข้าใช้งานเว็บ</h1>
          </div>
          <div className="text-xs md:text-sm flex gap-2 items-center">
            <p>ผู้ใช้งาน {user.user_firstname}</p>
            <button
              className="p-2 px-4 text-xs md:text-sm border-2 border-red-600 rounded-md text-red-600 font-bold hover:bg-red-600 hover:text-white transition ease-in-out scale-100 active:scale-95"
              onClick={() => {logout(); navigate('/');}}
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
