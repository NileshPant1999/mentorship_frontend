import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
import "./style.css";
import { useToast } from "@chakra-ui/react";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const toast = useToast();

  const verification_token = props.match.params.token;
  const uidb = props.match.params.uid;

  console.log(props.match);
  console.log(verification_token, uidb);

  useEffect(() => {
    try {
      setIsLoading(true);
      axiosInstance
        .get(`user/password-reset/${uidb}/${verification_token}`)
        .then((res) => {
          console.log("res", res);
          setIsLoading(false);
          setValid(true);
        })
        .catch((err) => {
          setIsLoading(false);
          setValid(false);
          console.log("err", err);
        });
    } catch (error) {
      console.log(error);
    }
  }, [verification_token, uidb]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      axiosInstance
        .patch(`user/password-reset-complete`, {
          password: password,
          token: verification_token,
          uidb64: uidb,
        })
        .then((res) => {
          setIsLoading(false);

          history.push("/login");
          toast({
            position: "top",
            title: "Message",
            description: "password reset successfull",
            status: "info",
            duration: 5000,
            isClosable: true,
          });
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
            <FormLabel>Set new password</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your email address"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Confirm new password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            />
          </FormControl>

          <Button colorScheme="blue" width="full" mt={4} onClick={handleSubmit}>
            Submit
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
              <LoginHeader />
              {LoginForm()}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading mt={4} fontWeight="500" fontFamily="Mosk" fontSize="50px">
        Reset your password
      </Heading>
    </Box>
  );
};

export default Login;
