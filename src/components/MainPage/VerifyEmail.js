import { Button, Input, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import axiosInstance from "../../axios";
import "./style.css";

const VerifyEmail = (props) => {
  const toast = useToast();
  const [valid, setValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const verification_token = props.match.params.token;

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      axiosInstance
        .post(`user/resend-email/`, {
          email: email,
        })
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          toast({
            position: "top",
            title: "Email Send",
            description: `We have send the email to you at ${email}`,
            status: "info",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosInstance
        .get(`user/email-verify/`, {
          params: {
            token: verification_token,
          },
        })
        .then((res) => {
          console.log("res", res);
          setIsLoading(false);
          setValid(true);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("err", err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [verification_token]);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        width: "60%",
        margin: "30px auto",
        height: "90vh",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <h1 style={{ fontFamily: "Mosk", fontSize: "40px", marginTop: "30px" }}>
        Loading .....
      </h1>
    </div>
  ) : (
    <div className="verification__page">
      <h1
        style={{ fontSize: "60px", fontWeight: "bolder", fontFamily: "Mosk" }}
      >
        Welcome to Sparklehood
      </h1>
      {valid ? (
        <div>
          <h1>
            Verification Succesfull please click on the button below to login
          </h1>
          <Link to="/login">
            <Button colorScheme="blue" borderRadius={25} width={150}>
              Login
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <h1>The Link You are using is either expired or is not valid</h1>
          <h1 style={{ fontSize: "20px" }}>Please Enter Your Email Address</h1>
          <Input
            fontSize="18px"
            backgroundColor="whitesmoke"
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            mt={2}
            p={4}
            mb={2}
            height={6}
          />
          <Button
            mt={10}
            colorScheme="blue"
            borderRadius={25}
            width={200}
            onClick={handleSubmit}
          >
            Resend Email
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
