import { Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import axios from "../configs/axios";
import { useEffect, useState } from "react";

export default function ViewById() {
    const [visit, setVisit] = useState(null); // ใช้ null แทน array
    const [loading, setLoading] = useState(true); // สถานะการโหลด
    const [error, setError] = useState(null); // สถานะข้อผิดพลาด

    const split = location.pathname.split("/")[2];
    const decode = decodeURIComponent(split).split('/')[1];
    let token = localStorage.getItem('token');

    useEffect(() => {
        const getVisitById = async () => {
            try {
                const rs = await axios.get(`/api/gps/${decode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVisit(rs.data.result);
            } catch (err) {
                console.log(err);
                setError("ไม่สามารถดึงข้อมูลได้"); // ตั้งค่าข้อความผิดพลาด
            } finally {
                setLoading(false); // เปลี่ยนสถานะโหลดเป็น false
            }
        };

        getVisitById();
    }, [decode, token]);

    if (loading) {
        return <div className="flex justify-center my-4">กำลังโหลด...</div>; // แสดงข้อความโหลด
    }

    if (error) {
        return <div className="flex justify-center my-4 text-red-500">{error}</div>; // แสดงข้อความผิดพลาด
    }

    const mapEmbedURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD5Bvhv2n0YbMayjQWwV2NwNpH3DMIqAcM&q=${visit.latitude},${visit.longitude}&zoom=15&maptype=roadmap&language=th`;

    return (
        <div className="inset-0 flex justify-center my-4">
            <Card className="my-6 w-[30rem] md:w-[40rem]">
                <CardHeader>
                    <iframe
                        loading="lazy"
                        src={mapEmbedURL}
                        style={{ border: 0, width: '100%', height: '250px' }} // ปรับขนาดของ iframe
                        allowFullScreen
                    ></iframe>
                </CardHeader>
                <CardBody>
                    {/* แสดงรายละเอียดเพิ่มเติมที่นี่ */}
                    <h3 className="text-lg font-semibold">รายละเอียดการเข้าชม</h3>
                    <p>IP Address: {visit.ipAddress}</p>
                    <p>จำนวนการเข้าชม: {visit.visitCount}</p>
                    <p>วันที่เข้าชม: {new Date(visit.createdAt).toLocaleDateString()}</p>
                </CardBody>
                <CardFooter>
                    {/* เพิ่มปุ่มหรือลิงก์เพิ่มเติมที่นี่ */}
                </CardFooter>
            </Card>
        </div>
    );
}
