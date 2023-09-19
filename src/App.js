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
  var p = document.getElementById("foo");
  p.onclick = function () {
    // Ensure that the user can receive Safari Push Notifications.
    if ("safari" in window && "pushNotification" in window.safari) {
      var permissionData = window.safari.pushNotification.permission(
        "https://reactjs-sigma-seven.vercel.app"
      );
      checkRemotePermission(permissionData);
    }
  };

  var checkRemotePermission = function (permissionData) {
    if (permissionData.permission === "default") {
      // This is a new web service URL and its validity is unknown.
      window.safari.pushNotification.requestPermission(
        "https://reactjs-sigma-seven.vercel.app/", // The web service URL.
        "web.com.example.domain", // The Website Push ID.
        {}, // Data that you choose to send to your server to help you identify the user.
        checkRemotePermission // The callback function.
      );
    } else if (permissionData.permission === "denied") {
      // The user said no.
    } else if (permissionData.permission === "granted") {
      // The web service URL is a valid push provider, and the user said yes.
      // permissionData.deviceToken is now available to use.
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 id="foo">Click me</h1>

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
    </div>
  );
}

export default App;
