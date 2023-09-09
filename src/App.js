import { styled } from "styled-components";
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { FlexBox, StyledLoginText, Word } from "./Custom/customComponents";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signInwithGoogle } from "./firebase/googleAuth";
import { app } from "./firebase/firebaseConfig";
const EContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: ${(props) => (props.rowCenter ? "center" : "flex-start")};
  justify-content: ${(props) => (props.columnCenter ? "center" : "flex-start")};
  background-image: url(${require("./Asset/image/background.svg").default});
  background-size: cover; /* 배경 이미지 크기 설정 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
`;

const PContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: ${(props) => (props.rowCenter ? "center" : "flex-start")};
  justify-content: ${(props) => (props.columnCenter ? "center" : "flex-start")};
`;

function App() {
  //const googleProvider = new GoogleAuthProvider();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const auth = getAuth(app);

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigation = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, id, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setIsLogin(true);
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
            title: "Signed in successfully",
          });
        }
        navigation("/dashboard");
      })
      .catch((error) => {
        console.error(error);
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
          icon: "error",
          title: "Invalid User Information",
        });
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <EContainer rowCenter columnCenter style={{ minHeight: "100vh" }}>
      <PContainer
        style={{
          //border: "0.1px solid black",
          minWidth: "60vw",
          alignItems: "center",
          padding: "30px",
          borderRadius: 10,
          backgroundColor: "#A1BAEC30",
        }}
      >
        <FlexBox row style={{ width: "100%", justifyContent: "center" }}>
          <svg width="300" height="120">
            <StyledLoginText x="60" y="100">
              Login
            </StyledLoginText>
          </svg>
        </FlexBox>

        <FlexBox style={{ width: "80%" }}>
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

        <FormControl sx={{ m: 1, width: "80%" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            variant="outlined"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            onKeyDown={handleKeyDown}
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

        <FlexBox row style={{ width: "80%", justifyContent: "flex-end" }}>
          <Word size1 sub>
            Forgot password?{" "}
          </Word>
        </FlexBox>
        <Button
          variant="contained"
          style={{ width: "80%", borderRadius: "10px" }}
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </Button>

        <FlexBox style={{ marginTop: "5%" }}>
          <Word size2 sub>
            Or Sign Up Using
          </Word>
          <Tooltip title="Login & Sign up with Google">
            <FlexBox
              row
              style={{ justifyContent: "center" }}
              onClick={async () => {
                const response = await signInwithGoogle();
                setIsLogin(true);
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
                  title: `Welcome! ${response?.user?.email}`,
                });
                navigation("/dashboard");
              }}
            >
              <GoogleIcon
                style={{
                  backgroundColor: "red",
                  padding: "8px",
                  borderRadius: "50%",
                  color: "white",
                }}
              />
            </FlexBox>
          </Tooltip>
        </FlexBox>
        <FlexBox style={{ marginTop: "5%" }}>
          <Word
            size1
            onClick={() => {
              navigation("/signin");
            }}
          >
            SIGN UP
          </Word>
        </FlexBox>
      </PContainer>
    </EContainer>
  );
}

export default App;
