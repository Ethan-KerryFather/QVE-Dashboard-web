import { useState } from "react";
import DashHeader from "../Custom/DashHeader";
import { EContainer, FlexBox, Word } from "../Custom/customComponents";
import Chart from "react-apexcharts";
import { getAuth } from "firebase/auth";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function DashboardMain() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  if (user) {
    // 유저가 로그인된 상태
    console.log(user.uid); // Firebase unique user ID
    console.log(user.email); // Email 주소

    // ... 기타 사용자 정보 필드
  } else {
    // 유저가 로그아웃 상태 or 로그인되지 않은 상태
  }
  let data = { todayPNL: 1.72, monthPNL: 158.46, Balance: 6990.16 };
  const [options, setOptions] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, -40, 45, -50, 49, -60, 70, 91],
      },
    ],
  });

  const [pieOption, setPieOption] = useState({
    options: {
      series: [44, 55, 13, 33],
      labels: ["USDT", "XRP", "BTC", "BFC"],
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
      },
    },
  });

  const [splineOption, setSplineOption] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  return (
    <EContainer>
      <FlexBox row style={{ paddingLeft: "5%", alignItems: "center" }}>
        <AccountCircleSharpIcon />
        <Word size2> &nbsp;{user.email}</Word>
        <Button
          variant="outlined"
          style={{ marginLeft: "auto", marginRight: "10px" }}
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You really want to Logout?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, I want to logout!",
            }).then((result) => {
              if (result.isConfirmed) {
                auth.signOut();
                navigation("/");
                Swal.fire("Logout", "Byebye", "success");
              }
            });
          }}
        >
          Logout
        </Button>
      </FlexBox>
      <DashHeader data={data} />
      <FlexBox
        row
        style={{ alignSelf: "center", marginTop: "5%", width: "100%" }}
      >
        <Chart
          options={splineOption}
          series={splineOption.series}
          type="line"
          width="500"
        />
        <Chart
          options={splineOption}
          series={splineOption.series}
          type="line"
          width="500"
        />
        <Chart
          options={options.options}
          series={options.series}
          type="bar"
          width="500"
        />

        <Chart
          options={pieOption.options}
          series={pieOption.options.series}
          type="pie"
          width="500"
        />
      </FlexBox>
    </EContainer>
  );
}
export default DashboardMain;
