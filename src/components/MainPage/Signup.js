import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axiosInstance from "../../axios";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  const history = useHistory();

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      axiosInstance
        .post(`user/create/`, {
          email: email,
          user_name: name,
          password: password,
        })
        .then((res) => {
          setIsLoading(false);
          toast({
            position: "top",
            title: "Message",
            description: "We have send you the verification email",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
          history.push("/login");
        })
        .catch((res) => {
          console.log("res", res.response);
          setIsLoading(false);
          toast({
            position: "top",
            title: "Message",
            description: res.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } catch (error) {
      setIsLoading(false);
      toast({
        position: "top",
        title: "Message",
        description: error,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const LoginForm = () => {
    return (
      <Box my={8} textAlign="center">
        <form>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              placeholder=""
              required
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder=""
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <div className="form__password">
            <div>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder=""
                  required
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </FormControl>
            </div>
            <div>
              <FormControl mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  required
                  placeholder=""
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </FormControl>
            </div>
          </div>

          <Button colorScheme="blue" width="full" mt={4} onClick={handleSubmit}>
            Sign Up
          </Button>
          <br />

          <Button
            colorScheme="white"
            mt={2}
            color="black"
            width="full"
            boxShadow="lg"
          >
            Continue With Google
          </Button>
        </form>
      </Box>
    );
  };

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
    <div className="main__signin">
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          borderWidth={1}
          px={10}
          py={5}
          width="full"
          maxWidth="900px"
          textAlign="center"
          boxShadow="xl"
        >
          <Flex justifyContent="space-around" alignItems="center">
            <Box p={4}>
              <img
                alt="logo"
                src="https://global-uploads.webflow.com/5f3c09d8572b1a3453aa9c1f/5faac65b405f8d172ef75b8e_Sparklehood%20logo%20grey%20login%20page-p-500.png"
              />
              <LoginHeader />
              {LoginForm()}
            </Box>
            <div className="login__image">
              <Box>
                <img
                  alt="logo"
                  src="https://global-uploads.webflow.com/5f3c09d8572b1a3453aa9c1f/5faab7a66dfdec1ed6d2ecca_Sparklehood%20platform%20login%20page-p-500.png"
                />
              </Box>
            </div>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

const LoginHeader = () => {
  return (
    <div>
      <Stack isInline justifyContent="space-between" mt={4}></Stack>
      <Box textAlign="left">
        <p style={{ fontSize: "30px", fontWeight: "500" }}>
          Get Started with your account in sparklehood
        </p>
      </Box>
    </div>
  );
};

export default SignUp;
