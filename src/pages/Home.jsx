import { useEffect } from "react";
import GpsAuth from "../hooks/GpsHook";
import { Card, Typography } from "@material-tailwind/react";
import moment from "moment";
import "moment/locale/th"; // ใช้ภาษาไทย
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { visitWeb } = GpsAuth();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home";
  }, []);

  const TABLE_HEAD = [
    "No.",
    "Website",
    "IP Address",
    "User Agent",
    "Language",
    "Platform",
    "Vendor",
    "Location",
    "Visit Count",
    "Update Latest",
    "Map",
  ];

  const TABLE_ROWS = visitWeb;

  const truncateUserAgent = (userAgent) => {
    const maxLength = 30;
    return userAgent.length > maxLength
      ? userAgent.slice(0, maxLength) + "..."
      : userAgent;
  };

  function getRelativeTime(isoString) {
    const date = moment(isoString); // แปลง ISO เป็น moment object
    const now = moment();
    const duration = moment.duration(now.diff(date));

    if (duration.asSeconds() < 1) {
      return "เมื่อสักครู่";
    } else if (duration.asSeconds() < 60) {
      return `${Math.floor(duration.asSeconds())} วินาทีที่ผ่านมา`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())} นาทีที่ผ่านมา`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())} ชั่วโมงที่ผ่านมา`;
    } else if (duration.asDays() < 7) {
      return `${Math.floor(duration.asDays())} วันที่ผ่านมา`;
    } else if (duration.asWeeks() < 4) {
      return `${Math.floor(duration.asWeeks())} สัปดาห์ที่ผ่านมา`;
    } else if (duration.asMonths() < 12) {
      return `${Math.floor(duration.asMonths())} เดือนที่ผ่านมา`;
    } else {
      return `${Math.floor(duration.asYears())} ปีที่ผ่านมา`;
    }
  }

  console.log(typeof visitWeb);

  if (visitWeb == "") {
    return (
      <div className=" inset-0 flex justify-center items-center gap-2 my-4">
        <h1 className="font-semibold text-md md:text-xl select-none">
          กำลังโหลดข้อมูล
        </h1>
        <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-[6px] border-t-[#212121]" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-0">
        <p className="text-center my-4 font-semibold text-md md:text-lg">ข้อมูล IP Address การเข้าใช้งานเว็บของเรา</p>
      <Card className="h-full max-w-[90rem] overflow-auto my-4 mx-auto">
        <table className="min-w-max text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="cursor-default">
            {TABLE_ROWS.map(
              (
                {
                  id,
                  website,
                  ipAddress,
                  userAgent,
                  language,
                  platform,
                  vendor,
                  latitude,
                  longitude,
                  visitCount,
                  updatedAt,
                  mapURL,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={id}
                    className=" hover:bg-blue-gray-50 duration-100 transition-all ease-in-out cursor-pointer"
                    onClick={() => navigate(`view/${encodeURIComponent(`3E@rth@106/${id}/@s@k0nn@k0n`)}`)}
                  >
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {website}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {ipAddress}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        title={userAgent}
                      >
                        {truncateUserAgent(userAgent)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {language}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {platform}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vendor}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {latitude.toFixed(5)}, {longitude.toFixed(5)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {visitCount}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {getRelativeTime(updatedAt)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as="a"
                        href={mapURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="small"
                        color="blue"
                        className="font-medium"
                      >
                        View Map
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
