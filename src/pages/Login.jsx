import { useEffect, useState } from "react";
import useAuth from "../hooks/UseAuth.js";
import axios from "../configs/axios.js";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  Typography,
  Input,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function Login() {
  const { setUser } = useAuth();
  const [load, setLoad] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = "เข้าสู่ระบบ"
  }, [])

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    const loadingToast = toast.loading('กำลังโหลด...');
    try {
      e.preventDefault();
      setLoad(!load);
      const rs = await axios.post("/auth/adminLogin", input);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("/auth/me", {
        headers: { Authorization: "Bearer " + rs.data.token },
      });

      if (rs1.status === 200) {
        toast.update(loadingToast, {
          render: 'เข้าสู่ระบบสำเร็จ',
          type: 'success',
          isLoading: false,
          autoClose: 1000,
          onClose: () => {            
            setLoad(false);
            setUser(rs1.data);
          }
        });
      }
    } catch (err) {
      setLoad(false);
      toast.update(loadingToast, {
        render: err?.response?.data?.message || "เกิดข้อผิดพลาด",
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className=" inset-0 h-screen w-full flex justify-center items-center">
      <Card color="transparent" shadow={true} className="px-4 pb-5 pt-5 shadow-lg">
        <img className="w-56 max-w-screen-lg sm:w-64 mx-auto pointer-events-none select-none" src="https://cdn.vectorstock.com/i/500p/44/39/map-with-two-location-icon-gps-navigation-vector-53174439.jpg" alt="photo" />
        <Typography variant="h4" color="blue-gray" className="mx-auto my-2">
          เข้าสู่ระบบ
        </Typography>
        <Typography color="gray" className="mt-1 font-normal mx-auto">
          กรอกข้อมูลให้ครบเพื่อเข้าสู่ระบบ!
        </Typography>
        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={hdlSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Input
              label="Username"
              name="username"
              size="lg"
              placeholder="username"
              onChange={hdlChange}
              required
            />
            <div className="relative">
            <FontAwesomeIcon className={`absolute end-3 top-[0.85rem] opacity-50 hover:opacity-100 cursor-pointer z-10 duration-100 transform ${showPassword && "pr-[0.5px]"}`} icon={showPassword ? faEye : faEyeSlash } onClick={ () => setShowPassword(!showPassword) } />
              <Input
                className="z-0"
                label="Password"
                name="password"
                type={showPassword ? "password" : "text"}
                size="lg"
                placeholder="********"
                onChange={hdlChange}
                required
              />
            </div>
          </div>
          <Button type="submit" className="mt-14 text-md disabled:opacity-50" disabled={load} fullWidth>
            {load ? <div className="border-gray-300 h-6 w-6 animate-spin rounded-full border-4 border-t-gray-900 mx-auto" /> : "ยืนยัน"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
