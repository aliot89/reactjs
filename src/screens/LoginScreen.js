import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import BackgroundImage from "../assets/Images/bg-login.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Notification from "../firebaseNotifications/Notification";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import RoutesElectric from "../config/RoutesElectric";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const ContainerStyle = {
  position: "relative",
  width: "100%",
  height: "100vh",
  // backgroundImage: `url(${BackgroundImage})`,
  // backgroundRepeat: "round",
};

const PaperStyle = {
  minWidth: "300px",
  maxWidth: "325px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: 20,
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng không để trống!"),
  password: Yup.string().required("Vui lòng không để trống!"),
});

export default function LoginScreen(props) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  // console.log(props);
  var firebaseConfig = {
    apiKey: "AIzaSyCJ_YIzbq2PDVB1SvAwcflvN4bnqN00vy4",
    authDomain: "tesstts.firebaseapp.com",
    projectId: "tesstts",
    storageBucket: "tesstts.appspot.com",
    messagingSenderId: "130388392879",
    appId: "1:130388392879:web:9dacb10254ab240c910d5a",
    measurementId: "G-D1PLR86NEY",
  };

  initializeApp(firebaseConfig);

  const messaging = getMessaging();
  getToken(messaging, {
    vapidKey:
      "BNiYast8NllLtbCmjB7tEy1Ja95lcKdr0_Unmz41P96-c5OHtqq1L60fhrlOGY2hW3RQDNdoVoF5MwLHUg2UlnQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
        setToken(currentToken);
        return currentToken;
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
  // const onMessageListener = () =>
  //   new Promise((resolve) => {
  //     onMessage(messaging, (payload) => {
  //       resolve(payload);
  //     });
  //   });
  const { setLogin } = props;
  const initialValues = {
    username: "",
    password: "",
    token1: "",
  };
  let navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    // console.log("form");
    try {
      const response = await fetch("http://192.168.18.172:8080/auth/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, token1: token }),
      });

      const result = await response.json();
      if (result.error_code != 1003) {
        localStorage.setItem("accessToken", result.data.accessToken);
        const items = localStorage.getItem("accessToken");

        setStatus(result.data.accessToken);
        // console.log("ok", items);
        let checkpermisson = result.data.user.permission;
        if (checkpermisson == 2) {
          navigate("/electric");
        } else {
          // console.log("product");
          navigate("/product");
        }
        setLogin(true);
        setSubmitting(false);
      }
      // console.log("Success:", result);
    } catch (error) {
      // alert.error("Error:", error);
      alert(error);
    }
  };

  return (
    <React.Fragment>
      {localStorage.getItem("accessToken") !== "" ? (
        <div style={ContainerStyle}>
          <Paper elevation={8} style={PaperStyle}>
            <Box
              sx={{
                marginTop: 8,
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Typography
                    component="h1"
                    variant="h4"
                    style={{ color: "#1976d2", fontWeight: "600" }}
                    textAlign="center"
                  >
                    Login
                  </Typography>

                  <Typography
                    variant="div"
                    color="#aeaeae"
                    display="block"
                    textAlign="center"
                  >
                    Please log in to contiue!
                  </Typography>

                  <Field
                    as={TextField}
                    type="text"
                    name="username"
                    fullWidth
                    label="Tài khoản"
                    margin="normal"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    style={{ color: "red" }}
                  />

                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    fullWidth
                    label="Mật khẩu"
                    margin="normal"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <Field
                    as={TextField}
                    type="text"
                    name="token1"
                    fullWidth
                    label="Token1"
                    margin="normal"
                    style={{ display: "none" }}
                    value={token}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Đăng nhập
                  </Button>
                  <a href="#">{token}</a>
                </Form>
              </Formik>
            </Box>
          </Paper>
          <Notification />
        </div>
      ) : (
        "o"
      )}
    </React.Fragment>
  );
}
