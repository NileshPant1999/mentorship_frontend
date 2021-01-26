import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Checkbox,
  Spinner,
} from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./style.css";
import axiosInstance from "../../../../axios";
import { isAuthenticated } from "../../../../auth";

const handleUserDetails = () => {};

function Profile() {
  // General Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(true);
  const [isCofoundersOpen, setIsCofounderOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Founders Hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Company Hooks

  const [companyDetails, setCompanyDetails] = useState({
    details: null,
  });

  useEffect(async () => {
    setIsLoading(true);
    try {
      await axiosInstance
        .get(`founder/details/${isAuthenticated().user_id}`)
        .then((res) => {
          setIsLoading(false);
          setCity(res.data.city);
          setCountry(res.data.country);
          setFirstName(res.data.first_name);
          setLastName(res.data.last_name);
          setMobile(res.data.mobile);
          setLinkedin(res.data.linkedin);
          setEmailAddress(res.data.email);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(async () => {
    setIsLoading(true);
    try {
      await axiosInstance
        .get(`company/details/${isAuthenticated().user_id}`)
        .then((res) => {
          setIsLoading(false);
          const allDetails = res.data;
          setCompanyDetails({ details: allDetails });
        });
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [setCompanyDetails]);

  console.log(companyDetails);

  const toggle = (req) => {
    return req === true ? true : true;
  };

  const handleCompany = () => {
    setIsCompanyOpen(toggle(isCompanyOpen));
    setIsUserDetailsOpen(false);
    setIsCofounderOpen(false);
  };

  const handleUserDetails = () => {
    setIsUserDetailsOpen(toggle(isUserDetailsOpen));
    setIsCofounderOpen(false);
    setIsCompanyOpen(false);
  };

  const handleCofounder = () => {
    setIsUserDetailsOpen(false);
    setIsCofounderOpen(toggle(isCofoundersOpen));
    setIsCompanyOpen(false);
  };

  const Company = () => {
    const handleSubmit = (e) => {
      try {
        setSubmitLoading(true);
        axiosInstance
          .post(`company/create/`, {
            startup_name: "SpaceX",
            website: "www.spacex.com",
            about:
              "Tesla's mission is to accelerate the world's transition to sustainable energy. Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn't need to compromise to drive electric – that electric vehicles can be better, quicker and more fun to drive than gasoline cars.",
            is_launched: false,
            app_link: "www.googleplay.com",
            video_link: "www.googledrive.com",
            customer: isAuthenticated().user_id,
          })
          .then((res) => {
            setSubmitLoading(false);
            console.log(res);
            alert("submitted");
          });
      } catch (error) {
        setSubmitLoading(false);
        console.log(error);
        alert(error);
      }
    };
    if (isCompanyOpen) {
      return (
        <div>
          <div>
            <h1 className="profile__heading">Company</h1>
            <h1 className="profile__heading">Information</h1>
          </div>
          <div className="profile__form">
            <FormControl id="startup-name" isRequired>
              <FormLabel mt={3}>Startup Name</FormLabel>
              <Input
                value={
                  companyDetails.details
                    ? companyDetails.details.startup_name
                    : ""
                }
                placeholder="Startup Name"
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="website" isRequired>
              <FormLabel mt={3}>Website</FormLabel>
              <Input
                value={
                  companyDetails.details ? companyDetails.details.website : ""
                }
                placeholder="Website"
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel mt={3}>Describe your Startup</FormLabel>
              <Textarea
                value={
                  companyDetails.details ? companyDetails.details.about : ""
                }
                placeholder="Describe Your Startup"
                type="email"
                onChange={(e) => setEmailAddress(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="phone">
              <FormLabel mt={3}>
                Have you incorporated your company? (legally registered entity)
              </FormLabel>
              <Stack>
                <Radio size="md" name="2" value="2">
                  Yes
                </Radio>
                <Radio size="md" name="1" value="1">
                  No
                </Radio>
              </Stack>
            </FormControl>

            <FormControl id="linkedin">
              <Checkbox mt={5} mb={4}>
                Have You Launched
              </Checkbox>
            </FormControl>

            <FormControl id="gender">
              <FormLabel mt={3}>
                How Much Effort Do You Put In Startup
              </FormLabel>
              <Select
                placeholder="select"
                onChange={(e) => setGender(e.currentTarget.value)}
              >
                <option value="Full Time">Full Time (40+ hours a week)</option>
                <option value="Part Time">Part Time (20+ hours a week)</option>
                <option value="Other"> Less 20 hours a week</option>
              </Select>
            </FormControl>

            <FormControl id="phone">
              <FormLabel mt={3}>Describe your startup stage?</FormLabel>
              <Stack>
                <Radio size="md" name="2" value="2">
                  Idea
                </Radio>
                <Radio size="md" name="1" value="1">
                  MVP
                </Radio>
                <Radio size="md" name="1" value="1">
                  Revenue
                </Radio>
              </Stack>
            </FormControl>

            <FormControl id="google_play" isRequired>
              <FormLabel mt={3}>App Link(Google Play Store)</FormLabel>
              <Input
                placeholder="Country"
                value={
                  companyDetails.details ? companyDetails.details.app_link : ""
                }
                onChange={(e) => setCountry(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="apple_play" isRequired>
              <FormLabel mt={3}>App Link(Apple Play Store)</FormLabel>
              <Input
                placeholder="Country"
                value={
                  companyDetails.details ? companyDetails.details.app_link : ""
                }
                onChange={(e) => setCountry(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="video" isRequired>
              <FormLabel mt={3}>Video(Demo or Explainer Video)</FormLabel>
              <Input
                placeholder="Country"
                value={
                  companyDetails.details
                    ? companyDetails.details.video_link
                    : ""
                }
                onChange={(e) => setCountry(e.currentTarget.value)}
              />
            </FormControl>
          </div>
          <div style={{ marginTop: "50px", paddingBottom: "50px" }}>
            <Button
              loadingText="Submitting"
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      );
    }
  };

  const Cofounders = () => {
    if (isCofoundersOpen) {
      return (
        <div className="cofounder__tab">
          <h1 className="profile__heading">Co Founders</h1>
          <div className="cofounder__details">
            <img
              className="founder__image"
              src="https://global-uploads.webflow.com/5f4b9ee5f40a6467ebb252ce/5f4bb8b1b532cc603972a7d6_1598798000839-image9-p-1080.jpeg"
            />
            <h1>Delectus Ut quia</h1>
          </div>
          <div className="cofounder__details">
            <img
              className="founder__image"
              src="https://global-uploads.webflow.com/5f4b9ee5f40a6467ebb252ce/5f4bb8b1b532cc603972a7d6_1598798000839-image9-p-1080.jpeg"
            />
            <h1>Delectus Ut quia</h1>
          </div>
          <div className="cofounder__details">
            <img
              className="founder__image"
              src="https://global-uploads.webflow.com/5f4b9ee5f40a6467ebb252ce/5f4bb8b1b532cc603972a7d6_1598798000839-image9-p-1080.jpeg"
            />
            <h1>Delectus Ut quia</h1>
          </div>
        </div>
      );
    }
  };

  const UserDetails = () => {
    const handleSubmit = (e) => {
      try {
        axiosInstance
          .post(`founder/create/`, {
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            mobile: mobile,
            gender: gender,
            city: city,
            linkedin: linkedin,
            country: country,
            user: isAuthenticated().user_id,
          })
          .then((res) => {
            console.log("response", res);
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (isUserDetailsOpen) {
      return !isLoading || !submitLoading ? (
        <div>
          <div>
            <h1 className="profile__heading">User Details</h1>
            <h1 className="profile__heading">Sparklehood Account</h1>
          </div>
          <div className="profile__form">
            <FormControl id="first-name" isRequired>
              <FormLabel mt={3}>First name</FormLabel>
              <Input
                value={firstName}
                placeholder="First name"
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="last-name" isRequired>
              <FormLabel mt={3}>Last name</FormLabel>
              <Input
                value={lastName}
                placeholder="Last name"
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel mt={3}>Email address</FormLabel>
              <Input
                value={emailAddress}
                placeholder="Enter Email"
                type="email"
                onChange={(e) => setEmailAddress(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="phone">
              <FormLabel mt={3}>Mobile (whatsapp)</FormLabel>
              <InputGroup>
                <Input
                  type="tel"
                  borderLeftRadius="0"
                  value={mobile}
                  placeholder="phone number"
                  onChange={(e) => setMobile(e.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="linkedin">
              <FormLabel mt={3}>Linkedin</FormLabel>
              <InputGroup size="sm">
                <Input
                  borderRadius="0"
                  value={linkedin}
                  placeholder="mysite"
                  onChange={(e) => setLinkedin(e.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="gender">
              <FormLabel mt={3}>Gender</FormLabel>
              <Select
                placeholder={gender}
                onChange={(e) => setGender(e.currentTarget.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Prefer Not To Disclose</option>
              </Select>
            </FormControl>

            <FormControl id="city" isRequired>
              <FormLabel mt={3}>City</FormLabel>
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="Country" isRequired>
              <FormLabel mt={3}>Country</FormLabel>
              <Input
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.currentTarget.value)}
              />
            </FormControl>
          </div>
          <div style={{ marginTop: "30px", paddingBottom: "30px" }}>
            <Button
              loadingText="Submitting"
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : (
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
          <h1
            style={{ fontFamily: "Mosk", fontSize: "40px", marginTop: "30px" }}
          >
            Loading .....
          </h1>
        </div>
      );
    }
  };

  return (
    <div className="profile__header_profile">
      <div className="profile__buttons">
        <Button
          className="profile__button"
          colorScheme="twitter"
          onClick={() => {
            handleUserDetails();
          }}
        >
          User Details
        </Button>
        <Button
          className="profile__button"
          colorScheme="twitter"
          onClick={() => {
            handleCompany();
          }}
        >
          Company
        </Button>
        <Button
          className="profile__button"
          colorScheme="twitter"
          onClick={() => {
            handleCofounder();
          }}
        >
          Co-Founders
        </Button>
      </div>
      <hr style={{ border: "1px solid black", marginBottom: "20px" }} />
      <div>
        {UserDetails()}
        {Company()}
        {Cofounders()}
      </div>
    </div>
  );
}

export default Profile;
