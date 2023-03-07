import React, { useState } from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import { ButtonGroup, Button } from "@material-ui/core";

import CustomizedApp from "./CustomizedApp";
import "./index.css";
import useStyles from "./styles";

export default function App() {
  const classes = useStyles();
  const [appId, setAppId] = useState("");
  const [userId, setUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isSubmitted, setIsSubmitted] = useState("");
  const isAppVisible = appId && userId && accessToken && isSubmitted;
  return (
    <div>
      <div className="login-wrapper">
        <Input onChange={setAppId} label={"App ID"} readonly={isAppVisible} />
        <Input onChange={setUserId} label={"User ID"} readonly={isAppVisible} />
        <Input
          onChange={setAccessToken}
          label={"Access Token"}
          readonly={isAppVisible}
        />
        {!isAppVisible ? (
          <button
            onClick={() => {
              setIsSubmitted(true);
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => {
              setIsSubmitted(false);
            }}
          >
            Edit
          </button>
        )}
      </div>
      {isAppVisible && (
        <div className="app-wrapper">
          <SBProvider appId={appId} userId={userId} accessToken={accessToken}>
            <CustomizedApp />
          </SBProvider>
        </div>
      )}
    </div>
  );
}

const Input = ({ onChange, label, readonly }) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        disabled={readonly}
        id={label}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </>
  );
};
