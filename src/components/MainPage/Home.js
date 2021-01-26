import { Box, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "./NavBar/header/Header";

function Home() {
  const ThemeSelector = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Box textAlign="right" py={4}>
        <IconButton onClick={toggleColorMode} />
      </Box>
    );
  };

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "120vh",
          backgroundColor: "white",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "200vh",
          backgroundColor: "grey",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "200vh",
          backgroundColor: "whitesmoke",
        }}
      ></div>
    </div>
  );
}

export default Home;
