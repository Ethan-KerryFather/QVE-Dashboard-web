import { useEffect, useState } from "react";
import DashHeader from "../Custom/DashHeader";
import { EContainer, FlexBox, Word } from "../Custom/customComponents";

import { getAuth } from "firebase/auth";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useChartData } from "../hook/useChartData";
import { useApiData } from "../hook/useApiData";

import PersonalOutlook from "../Custom/PersonalOutlook";
import { changePassword } from "../firebase/auth";

function DashboardMain() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigate();
  const [name, setName] = useState("");
  let data = useApiData();
  let options = useChartData();

  const handleChangePw = () => {
    console.log(user);
    Swal.fire({
      title: "Change password",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      preConfirm: async (pw) => {
        const response = await changePassword(user, pw);
        console.log(JSON.stringify(response));
      },
    });
  };

  if (user) {
    // 로그인 되어있을 때 : 대시보드
    return (
      <EContainer>
        <FlexBox
          row
          style={{
            paddingLeft: "5%",
            alignItems: "center",
            marginTop: "1%",
          }}
        >
          <AccountCircleSharpIcon />
          <Word size2> &nbsp;{user.email}</Word>
          <Button
            variant="outlined"
            style={{ marginLeft: "2%" }}
            onClick={handleChangePw}
          >
            change PW
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "2%" }}
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
        <FlexBox style={{ width: "100vw" }}>
          <Word size3 sub style={{ marginLeft: "10%" }}>
            Strategy outlook
          </Word>
          <DashHeader data={data} />
        </FlexBox>
        <FlexBox style={{ marginLeft: "10%", width: "100%", marginTop: "2%" }}>
          <Word size3 sub>
            {name}'s Investment outlook
          </Word>
        </FlexBox>
        <PersonalOutlook options={options} setName={setName} />
      </EContainer>
    );
  } else {
    // 로그인 만료 시
    return (
      <EContainer style={{ justifyContent: "center", alignItems: "center" }}>
        <Word size3 style={{ float: "none" }}>
          Your Login state is expired!
        </Word>
        <Word size2 sub>
          Please Login again via login page
        </Word>
        <Button
          variant="outlined"
          onClick={() => {
            Swal.fire({
              title: "Go to Login page",
              text: "user information is expired, login again",
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes",
            }).then((result) => {
              if (result.isConfirmed) {
                auth.signOut();
                navigation("/");
              }
            });
          }}
        >
          Login again
        </Button>
      </EContainer>
    );
  }
}
export default DashboardMain;
