import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
import { isAuthenticated } from "../../auth";
import "./style.css";
import Header from "./NavBar/header/Header";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      axiosInstance
        .post(`user/signin/`, {
          email: email,
          password: password,
        })
        .then((res) => {
          setIsLoading(false);
          localStorage.setItem("access_token", res.data.tokens.access);
          localStorage.setItem("refresh_token", res.data.tokens.refresh);
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + localStorage.getItem("access_token");
          history.push("/founder");
        })
        .catch((err) => {
          setIsLoading(false);
          toast({
            position: "top",
            title: "Message",
            description: "error occured",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert(error);
    }
  };

  const LoginForm = () => {
    return (
      <Box my={10} textAlign="left">
        <form>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your email address"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>

          <Button colorScheme="blue" width="full" mt={4} onClick={handleSubmit}>
            Login
          </Button>
          <Stack fontSize="20px" isInline justifyContent="space-between" mt={4}>
            <a href="/signup">Sign Up</a>
            <Box>
              <a href="/forgetpassword">Forget Your password</a>
            </Box>
          </Stack>
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
    <div className="main__login">
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          borderWidth={1}
          px={10}
          py={8}
          width="full"
          maxWidth="900px"
          textAlign="center"
          boxShadow="xl"
        >
          <Flex justifyContent="space-around" alignItems="center">
            <Box p={4}>
              <img src="https://global-uploads.webflow.com/5f3c09d8572b1a3453aa9c1f/5faac65b405f8d172ef75b8e_Sparklehood%20logo%20grey%20login%20page-p-500.png" />
              <LoginHeader />
              {LoginForm()}
            </Box>
            <div className="login__image">
              <Box>
                <img src="https://global-uploads.webflow.com/5f3c09d8572b1a3453aa9c1f/5faab7a66dfdec1ed6d2ecca_Sparklehood%20platform%20login%20page-p-500.png" />
              </Box>
            </div>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box textAlign="right" py={4}>
      <IconButton onClick={toggleColorMode} />
    </Box>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading fontSize="60px">Log In</Heading>
    </Box>
  );
};

export default Login;
