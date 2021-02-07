import React from "react";
import Header from "./NavBar/header/Header";

function Home() {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "60%",
          margin: "0px auto",
          alignItems: "center",
          paddingLeft: "150px",
          height: "89vh",
          backgroundColor: "whitesmoke",
        }}
      >
        <div
          style={{
            fontFamily: "Mosk",
            fontSize: "120px",
            color: "#08aeea",
            fontWeight: "800",
            textAlign: "center",
          }}
        >
          <h1>Feed</h1>
          <h1>Your</h1>
          <h1>Sparkle</h1>
        </div>
        <div>
          <img
            src="https://global-uploads.webflow.com/5f3c09d8572b1a3453aa9c1f/5f3e2a2422284581c60f993e_cartoon_pegasus_signature-p-800.jpeg"
            alt="img"
            width="80%"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
