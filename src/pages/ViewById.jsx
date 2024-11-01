/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, CardFooter, CardHeader, Spinner } from "@material-tailwind/react";
import axios from "../configs/axios";
import { useEffect, useState } from "react";
import axiosURL from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewById() {
    const [visit, setVisit] = useState(null); // ใช้ null แทน array
    const [loading, setLoading] = useState(true); // สถานะการโหลด
    const [loadingIP, setLoadingIP] = useState(true); // สถานะการโหลด
    const [error, setError] = useState(null); // สถานะข้อผิดพลาด
    const [ipDetail, setIpDeatil] = useState([]);

    const navigate = useNavigate();

    const split = location.pathname.split("/")[2];
    const decode = decodeURIComponent(split).split('/')[1];
    let token = localStorage.getItem('token');

    // const checkIP = `http://ip-api.com/json/${visit?.ipAddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query`;
    const checkIP = `https://ipwho.is/${visit?.ipAddress}?output=json&security=1`;
    
    useEffect(() => {

        document.title = "View ID : " + decode

        setLoading(true)
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
        
        setLoadingIP(true)
        const checkIPAddress = async () => {
            try {
                const rs = await axiosURL.get(checkIP)
                if(rs.status === 200){
                    setIpDeatil(rs.data)
                    if(rs.data.success === false){
                        setIpDeatil({ message: "Fail" })
                    }
                }
            }catch(err){
                console.log(err)
                setIpDeatil({ message: "Fail" })
            } finally {
                setLoadingIP(false)
            }
        }

        if (visit) {
            checkIPAddress();
        }
        checkIPAddress();
        getVisitById();
    }, [decode, token, checkIP]);
    
    if (loading) {
        return <div className="flex justify-center my-4">กำลังโหลด...</div>; // แสดงข้อความโหลด
    }
    
    if (error) {
        return <div className="flex justify-center my-4 text-red-500">{error}</div>; // แสดงข้อความผิดพลาด
    }

    const hdlBack = () => {
        navigate(-1)
        setIpDeatil([]);
    }

    const mapEmbedURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD5Bvhv2n0YbMayjQWwV2NwNpH3DMIqAcM&q=${visit?.latitude},${visit?.longitude}&zoom=17&maptype=roadmap&language=th`;
    
    return (
        <div className="inset-0 flex justify-center my-4">
            <Card className="my-6 w-[30rem] md:w-[40rem] transform ease-in-out duration-150 transition-all">
                <CardHeader>
                    <iframe
                        loading="lazy"
                        src={mapEmbedURL}
                        style={{ border: 0, width: '100%', height: '350px' }}
                        allowFullScreen
                    ></iframe>
                </CardHeader>
                <CardBody>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 w-full transform ease-in-out duration-150 transition-all scale-90 sm:scale-100">
                        {/* ข้อมูลผู้ใช้ */}
                        <div className="w-[90%] mb-4">
                            <h3 className="text-lg font-semibold mb-2">ข้อมูลผู้ใช้</h3>
                            <p className="text-gray-700 line-clamp-1"><strong>IP Address:</strong> {visit.ipAddress}</p>
                            <p className="text-gray-700 text-wrap line-clamp-2" title={visit.userAgent}><strong>Browser:</strong> {visit.userAgent}</p>
                            <p className="text-gray-700 line-clamp-1"><strong>Language:</strong> {visit.language}</p>
                            <p className="text-gray-700 line-clamp-1"><strong>Platform:</strong> {visit.platform}</p>

                            <h3 className="text-lg font-semibold mt-4">ข้อมูลการเยี่ยมชม</h3>
                            <p className="text-gray-700 text-wrap line-clamp-1" title={visit.website}><strong>Website:</strong> {visit.website}</p>
                            <p className="text-gray-700 line-clamp-1"><strong>Page Viewed:</strong> {visit.pageViewed}</p>
                            <p className="text-gray-700 line-clamp-1"><strong>Visit Count:</strong> {visit.visitCount}</p>
                            <p className="text-gray-700 line-clamp-1"><strong>Last Visited:</strong> {new Date(visit.createdAt).toLocaleDateString()}</p>

                            <h3 className="text-lg font-semibold mt-4 mb-2">ข้อมูลหน้าจอ</h3>
                            <p className="text-gray-700 line-clamp-1"><strong>Screen Size:</strong> {visit.screenWidth} x {visit.screenHeight}</p>
                            <p className="text-gray-700 line-clamp-1"><strong>Color Depth:</strong> {visit.screenColorDepth}-bit</p>
                        </div>

                        {/* ข้อมูลหน้าจอและตำแหน่งที่ตั้ง */}
                        <div className="w-full mb-4">
                            <h3 className="text-lg font-semibold mb-2">ข้อมูลบริษัทเน็ต</h3>
                            {loadingIP ? (
                                <div className="flex justify-center">
                                    <Spinner color="amber" />
                                </div>
                            ) : 
                            ipDetail?.message === "Fail" ? (
                                <p>ไม่พบข้อมูล</p>
                            ) : (
                                <>
                                    <p className="text-gray-700 line-clamp-1"><strong>ประเทศ:</strong> {ipDetail?.country} ({ipDetail?.country_code})</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>ทวีป:</strong> {ipDetail?.continent} ({ipDetail?.continent_code})</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>ภูมิภาค:</strong> {ipDetail?.region_name} ({ipDetail?.region})</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>เมือง:</strong> {ipDetail?.city}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>รหัสไปรษณีย์:</strong> {ipDetail?.postal}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>ละติจูด:</strong> {ipDetail?.latitude}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>ลองจิจูด:</strong> {ipDetail?.longitude}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>เขตเวลา:</strong> {ipDetail?.timezone?.id} ({ipDetail?.timezone?.utc})</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>เวลาปัจจุบัน:</strong> {new Date(ipDetail?.timezone?.current_time).toLocaleString("th-TH")}</p>
                                    <p className="text-gray-700 line-clamp-1" title={ipDetail?.connection?.isp}><strong>ผู้ให้บริการ (ISP):</strong> {ipDetail?.connection?.isp}</p>
                                    <p className="text-gray-700 line-clamp-1" title={ipDetail?.connection?.org}><strong>องค์กร:</strong> {ipDetail?.connection?.org}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>หมายเลข AS:</strong> {ipDetail?.connection?.asn}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>โดเมน:</strong> {ipDetail?.connection?.domain}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>รหัสโทรศัพท์:</strong> +{ipDetail?.calling_code}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>ประเทศที่ติดกัน:</strong> {ipDetail?.borders?.split(',').join(', ')}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>เป็นสมาชิก EU:</strong> {ipDetail?.is_eu ? 'ใช่' : 'ไม่ใช่'}</p>
                                    <p className="text-gray-700 line-clamp-1"><strong>ธงชาติ:</strong> <img src={ipDetail?.flag?.img} alt="ธงชาติ" className="inline-block w-6 h-4" /></p>
                                </>
                            )}
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-4 mb-2">ดูตำแหน่งบนแผนที่</h3>
                    <p className="text-blue-500 underline hover:underline-offset-2 mb-4 w-fit">
                        <a href={visit.mapURL} target="_blank" rel="noopener noreferrer">ดูตำแหน่งใน Google Maps</a>
                    </p>

                    <div className="bg-gray-100 text-gray-600 text-sm p-4 rounded-md">
                        <p><strong>Session ID:</strong> {visit.sessionId}</p>
                        <p><strong>Last Updated:</strong> {new Date(visit.updatedAt).toLocaleString("th-TH")} น.</p>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button color="amber" variant="gradient" className="w-full sm:w-60 text-white text-xs sm:text-sm rounded-xl" onClick={hdlBack}>
                        ย้อนกลับ
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
