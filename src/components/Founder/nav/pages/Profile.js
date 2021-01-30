import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  Stack,
  Radio,
  Spinner,
  useToast,
  RadioGroup,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import "./style.css";
import axiosInstance from "../../../../axios";
import { isAuthenticated } from "../../../../auth";

function Profile() {
  // General Hooks
  const [isLoading, setIsLoading] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(true);
  const [isCofoundersOpen, setIsCofounderOpen] = useState(false);

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

  const [startupName, setStartupName] = useState("");
  const [website, setWebsite] = useState("");
  const [appLink, setAppLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [stage, setStage] = useState("");
  const [about, setAbout] = useState("");

  const toast = useToast();

  // Company Hooks

  const [companyDetails, setCompanyDetails] = useState({
    details: null,
  });

  useEffect(() => {
    setIsLoading(true);
    async function getFounderDetails() {
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
          })
          .catch((err) => {
            console.log("nilesh", err.response.data);
          });
      } catch (error) {
        setIsLoading(false);
        toast({
          position: "top",
          title: "Message",
          description: "Please add your details",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    getFounderDetails();
  }, [toast, stage]);

  useEffect(() => {
    setIsLoading(true);
    async function getCompanyDetails() {
      try {
        await axiosInstance
          .get(`company/details/${isAuthenticated().user_id}`)
          .then((res) => {
            setIsLoading(false);
            const allDetails = res.data;
            setStartupName(allDetails.startup_name);
            setWebsite(allDetails.website);
            setAbout(allDetails.about);
            setAppLink(allDetails.app_link);
            setVideoLink(allDetails.video_link);
          });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
    getCompanyDetails();
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
        axiosInstance
          .post(`company/create/`, {
            startup_name: startupName,
            website: website,
            about: about,
            is_launched: false,
            app_link: appLink,
            video_link: videoLink,
            customer: isAuthenticated().user_id,
          })
          .then((res) => {
            console.log(res);
            alert("submitted");
          });
      } catch (error) {
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
                value={startupName}
                placeholder="Startup Name"
                onChange={(e) => setStartupName(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="website" isRequired>
              <FormLabel mt={3}>Website</FormLabel>
              <Input
                value={website}
                placeholder="Website"
                onChange={(e) => setWebsite(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel mt={3}>Describe your Startup</FormLabel>
              <Textarea
                value={about}
                placeholder="Describe Your Startup"
                type="email"
                onChange={(e) => setAbout(e.currentTarget.value)}
              />
            </FormControl>

            <FormControl id="phone">
              <FormLabel mt={3}>
                Have you incorporated your company? (legally registered entity)
              </FormLabel>
              <RadioGroup defaultValue="1">
                <Stack>
                  <Radio size="md" name="2" value="2">
                    Yes
                  </Radio>
                  <Radio size="md" name="1" value="1">
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl id="linkedin">
              <FormLabel mt={3}>Are you Launched</FormLabel>
              <RadioGroup defaultValue="1">
                <Stack>
                  <Radio size="md" name="2" value="2">
                    Yes
                  </Radio>
                  <Radio size="md" name="1" value="1">
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl id="gender">
              <FormLabel mt={3}>
                How Much Effort Do You Put In Startup
              </FormLabel>
              <Select onChange={(e) => setGender(e.currentTarget.value)}>
                <option value="Full Time">Full Time (40+ hours a week)</option>
                <option value="Part Time">Part Time (20+ hours a week)</option>
                <option value="Other"> Less 20 hours a week</option>
              </Select>
            </FormControl>

            <FormControl id="gender">
              <FormLabel mt={3}>Describe Your Startup Stage</FormLabel>
              <Select onChange={(e) => setStage(e.currentTarget.value)}>
                <option value="Idea">Idea Stage</option>
                <option value="MVP">MVP</option>
                <option value="Launched">Launched</option>
              </Select>
            </FormControl>

            <FormControl id="google_play" isRequired>
              <FormLabel mt={3}>App Link(Google Play Store)</FormLabel>
              <Input
                placeholder="Country"
                value={appLink}
                onChange={(e) => setAppLink(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="apple_play" isRequired>
              <FormLabel mt={3}>App Link(Apple Play Store)</FormLabel>
              <Input
                placeholder="Country"
                value={appLink}
                onChange={(e) => setAppLink(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="video" isRequired>
              <FormLabel mt={3}>Video(Demo or Explainer Video)</FormLabel>
              <Input
                placeholder="Country"
                value={videoLink}
                onChange={(e) => setVideoLink(e.currentTarget.value)}
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
              alt="icon"
              src="https://global-uploads.webflow.com/5f4b9ee5f40a6467ebb252ce/5f4bb8b1b532cc603972a7d6_1598798000839-image9-p-1080.jpeg"
            />
            <h1>Delectus Ut quia</h1>
          </div>
          <div className="cofounder__details">
            <img
              className="founder__image"
              alt="icon"
              src="https://global-uploads.webflow.com/5f4b9ee5f40a6467ebb252ce/5f4bb8b1b532cc603972a7d6_1598798000839-image9-p-1080.jpeg"
            />
            <h1>Delectus Ut quia</h1>
          </div>
          <div className="cofounder__details">
            <img
              className="founder__image"
              alt="icon"
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
      setIsLoading(true);
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
            setIsLoading(false);
            toast({
              position: "top",
              title: "Message",
              description: "Details Added",
              status: "info",
              duration: 9000,
              isClosable: true,
            });
          })
          .catch((err) => {
            setIsLoading(false);
            toast({
              position: "top",
              title: "Message",
              description: "some error occured",
              status: "warning",
              duration: 9000,
              isClosable: true,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    if (isUserDetailsOpen) {
      return !isLoading ? (
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
              <Select onChange={(e) => setGender(e.currentTarget.value)}>
                <option selected value="Male">
                  Male
                </option>
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
