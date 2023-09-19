import logo from "./logo.svg";
import "./App.css";
import Notification from "./firebaseNotifications/Notification";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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
async function App() {
  const [token, setToken] = useState("");
  function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  }
  var checkRemotePermission = function (permissionData) {
    alert("test");
    if (permissionData.permission === "default") {
      // This is a new web service URL and its validity is unknown.
      console.log("default");
      window.safari.pushNotification.requestPermission(
        "https://website.com/",
        "web.com.website.notify",
        { uid: "TEST" },
        checkRemotePermission
      );
    } else if (permissionData.permission === "denied") {
      // The user said no.
      console.log("no");
    } else if (permissionData.permission === "granted") {
      // The web service URL is a valid push provider, and the user said yes.
      // permissionData.deviceToken is now available to use.
      console.log("yes");
    }
  };

  if ("safari" in window && "pushNotification" in window.safari) {
    var permissionData = window.safari.pushNotification.permission(
      "web.com.website.notify"
    );
    checkRemotePermission(permissionData);
  } else {
    alert("This feature is only available on Mac OS X safari");
  }
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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={token}
          target="_blank"
          rel="noopener noreferrer"
        >
          {token}
        </a>
      </header>
      <Notification />
      <button>Click me</button>
    </div>
  );
}

export default App;
