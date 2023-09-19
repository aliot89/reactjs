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
// Outer function to prevent scope pollution
(function () {
  function thingThatINeed() {}
  // Flag to keep track of whether it is called.
  var isCalled = false;
  function conditionalCall() {
    if (!isCalled) {
      // if the conditionalCall function is called more than once, the
      // needed function will still only be called once.
      thingThatINeed();
      isCalled = true;
    }
  }
  // Call requestPermission with the deprecated form
  var promise = Notification.requestPermission(conditionalCall);

  // if a promise is returned, then use the promise.
  if (promise) {
    promise.then(conditionalCall);
  }
})();
async function App() {
  const [token, setToken] = useState("");

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
    </div>
  );
}

export default App;
