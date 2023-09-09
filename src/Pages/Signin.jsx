import { styled } from "styled-components";
import { FlexBox, Word } from "../Custom/customComponents";
import {
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { makeAccount } from "../firebase/auth";

const EContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  min-height: 100vh;
  align-items: ${(props) => (props.rowCenter ? "center" : "flex-start")};
  justify-content: ${(props) => (props.columnCenter ? "center" : "flex-start")};
  background-image: url(${require("../Asset/image/background.svg").default});
  background-size: cover;
  background-repeat: no-repeat; 
`;

const PContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled(FlexBox)`
  width: 80%;
`;

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const navigation = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [id, setId] = useState();
  const [pw, setPw] = useState();
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <EContainer rowCenter columnCenter>
      <PContainer
        style={{
          minWidth: "60vw",
          alignItems: "center",
          padding: "30px",
          borderRadius: 10,
          backgroundColor: "#A1BAEC30",
        }}
      >
        <FlexBox>
          <Word size3 bold>
            Signup For QVE
          </Word>
        </FlexBox>
        <InputBox>
          <FlexBox style={{ width: "100%" }}>
            <Word size1 sub>
              Email
            </Word>
            <TextField
              id="outlined-basic"
              label="Type your email"
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%" }}
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </FlexBox>
          <FlexBox style={{ width: "100%" }}>
            <Word size1 sub>
              Password
            </Word>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Type your password
              </InputLabel>
              <FilledInput
                variant="outlined"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </FlexBox>
        </InputBox>
        <FlexBox style={{ marginTop: "2%" }}>
          <FlexBox row style={{ alignItems: "center" }}>
            <Checkbox
              {...label}
              required
              onChange={(e) => {
                setIsAgreed(e.target.checked);
              }}
            />
            <Word size1 sub>
              I agree to use personal information necessary for membership
              registration.
            </Word>
          </FlexBox>
          <FlexBox row style={{ justifyContent: "center" }}>
            <Tooltip title="Policy Statement and Terms">
              <Word size1 sub>
                Policy Statement & Terms
              </Word>
            </Tooltip>
          </FlexBox>
        </FlexBox>
        <Button
          variant="contained"
          style={{ width: "80%", borderRadius: "10px", marginTop: "3%" }}
          disabled={id && pw && isAgreed ? false : true}
          onClick={async () => {
            const response = await makeAccount(id, pw);
            if (response.success) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: "Welcome! Now Login please",
              });
              navigation("/");
            } else {
              Swal.fire({ title: "failed", titleText: "try again" });
            }
          }}
        >
          Sign In
        </Button>
        <FlexBox row style={{ justifyContent: "flex-end", width: "80%" }}>
          <Word
            size1
            sub
            onClick={() => {
              navigation("/");
            }}
          >
            Go to Login Page
          </Word>
        </FlexBox>
      </PContainer>
    </EContainer>
  );
}

export default Signin;
