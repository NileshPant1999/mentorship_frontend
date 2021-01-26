import { Button, Input, Spinner, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../axios";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { isAuthenticated } from "../../../../auth";
import { useToast } from "@chakra-ui/react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { PhoneIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";

function ProgressDetail(props) {
  const slug = props.match.params.slug;
  const [unplannedAction, setUnplannedAction] = useState("");
  const [learningFromConversation, setLearningFromConversation] = useState("");
  const [coachFeedback, setCoachFeedback] = useState("");
  const [primaryMetric, setPrimaryMetric] = useState();
  const [lastWeekMetric, setLastWeekMetric] = useState();
  const [targetMarket, setTargetMarket] = useState("");
  const [stakeholder, setStakeholder] = useState("");
  const [stakeholderLearning, setStakeholderLearning] = useState("");
  const [topPriority, setTopPriority] = useState("");
  const [primaryMetricOption, setPrimaryMetricOption] = useState(
    "Annual Recurring Revenue"
  );

  const toast = useToast();
  const history = useHistory();

  const [progressDetails, setProgressDetails] = useState({
    loading: true,
    progress: null,
  });
  const [tempGoals, setTempGoals] = useState("");
  const [goals, setGoals] = useState([""]);

  const [tempAction, setTempAction] = useState("");
  const [action, setAction] = useState([""]);

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const newDate = new Date();
  const currentMonth = months[newDate.getMonth()];
  const currentYear = newDate.getFullYear();

  useEffect(async () => {
    await axiosInstance.get(`founder/progress/details/${slug}`).then((res) => {
      const progressDetails = res.data;
      console.log("nilesp", progressDetails);
      setProgressDetails({ loading: false, progress: progressDetails });
      setLearningFromConversation(progressDetails.learning_conversation);
      setUnplannedAction(progressDetails.unplanned_action_help);
      setGoals(progressDetails.goals);
      setAction(progressDetails.action_helped);
      setPrimaryMetric(progressDetails.primary_metric);
      setLastWeekMetric(progressDetails.lastweek_metric);
      setTargetMarket(progressDetails.target_market);
      setStakeholder(progressDetails.numberof_stakeholder);
      setStakeholderLearning(progressDetails.learning_stakeholder);
      setTopPriority(progressDetails.top_priorities);
    });
  }, [setProgressDetails]);

  const handleUpdate = (e) => {
    try {
      setProgressDetails({ ...progressDetails, loading: true });
      axiosInstance
        .put(`founder/progress/edit/${progressDetails.progress.id}/`, {
          founder_id: isAuthenticated().user_id,
          goals: goals,
          action_helped: action,
          learning_conversation: learningFromConversation,
          unplanned_action_help: unplannedAction,
          numberof_stakeholder: stakeholder,
          primary_metric: primaryMetric,
          lastweek_metric: lastWeekMetric,
          top_priorities: topPriority,
          learning_stakeholder: stakeholderLearning,
          target_market: targetMarket,
        })
        .then((res) => {
          setProgressDetails({ ...progressDetails, loading: false });
          history.push("/founder/progress");
          toast({
            position: "top",
            title: "Successfully Updated.",
            description: "We've have updated the details for you.",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setPrimaryMetricOption(e.target.value);
  };

  const handleChangeTarget = (e) => {
    setTargetMarket(e.target.value);
  };

  const handleGoalSubmit = () => {
    if (goals) {
      setGoals([...goals, tempGoals]);
    } else {
      setGoals([tempGoals]);
    }
    setTempGoals("");
  };

  const handleActionSubmit = () => {
    if (action) {
      setAction([...action, tempAction]);
    } else {
      setAction([tempAction]);
    }
    setTempAction("");
  };

  return !progressDetails.loading ? (
    <div className="profile__header">
      <div>
        <h1 className="progress_heading">Weekely Updates</h1>
        <h1 className="progress_date">{`${currentMonth} ${
          progressDetails.progress.start_date.split("-")[2]
        } - ${currentMonth} ${
          progressDetails.progress.end_date.split("-")[2]
        }, ${currentYear}`}</h1>
      </div>

      <div
        style={{
          border: "1px solid gainsboro",
          borderRadius: "10px",
          padding: "18px",
          marginTop: "40px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "600" }}>Conversations</h1>
        <hr style={{ margin: "10px 0 10px 0" }} />

        <h1 style={{ fontSize: "20px" }}>Stakeholder you spoke to last week</h1>
        <Input
          fontSize="18px"
          backgroundColor="whitesmoke"
          onChange={(e) => setStakeholder(e.currentTarget.value)}
          value={stakeholder}
          mt={2}
          p={4}
          mb={2}
          height={6}
        />

        <h1 style={{ fontSize: "20px" }}>What did you learn from them</h1>
        <Textarea
          mt={2}
          mb={2}
          p={4}
          fontSize="18px"
          backgroundColor="whitesmoke"
          onChange={(e) => setStakeholderLearning(e.currentTarget.value)}
          value={stakeholderLearning}
          height={150}
        />
      </div>

      <div
        style={{
          border: "1px solid gainsboro",
          borderRadius: "10px",
          padding: "18px",
          marginTop: "40px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "600" }}>Primary Metric</h1>
        <hr style={{ margin: "10px 0 10px 0" }} />

        <h1 style={{ fontSize: "20px" }}>Choose Your Primary Metric</h1>
        <select
          value={primaryMetricOption}
          onChange={handleChange}
          name="cars"
          id="cars"
        >
          <option value="Annual Recurring Revenue">
            Annual Recurring Revenue
          </option>
          <option value="Monthly Recurring Revenue">
            Monthly Recurring Revenue
          </option>
          <option value="Software Sales">Software Sales</option>
          <option value="Hardware Sales">Hardware Sales</option>
        </select>

        <h1 style={{ fontSize: "20px" }}>{primaryMetricOption}</h1>

        <Input
          fontSize="18px"
          backgroundColor="whitesmoke"
          onChange={(e) => setPrimaryMetric(e.currentTarget.value)}
          value={primaryMetric}
          mt={2}
          mb={2}
          p={4}
          height={6}
        />

        <h1 style={{ fontSize: "20px" }}>What is target Market</h1>
        <select
          value={targetMarket}
          onChange={handleChangeTarget}
          name="targetmarket"
          id="cars"
        >
          <option value="Consumer">Consumer</option>
          <option value="SMB(Small/Medium Buisness)">
            SMB(Small/Medium Buisness)
          </option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>

      <div
        style={{
          border: "1px solid gainsboro",
          borderRadius: "10px",
          padding: "18px",
          marginTop: "40px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
          Think Out Loud!!
        </h1>
        <hr style={{ margin: "10px 0 10px 0" }} />

        <h1 style={{ fontSize: "20px" }}>
          Reflect about where you startup stands right now and list your top
          priorities.
        </h1>
        <Textarea
          fontSize="18px"
          backgroundColor="whitesmoke"
          onChange={(e) => setTopPriority(e.currentTarget.value)}
          value={topPriority}
          mt={2}
          mb={2}
          height={150}
        />

        <h1 style={{ fontSize: "20px" }}>
          Based on the priorities listed above, decide specific and measurable
          goals for next week.
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Input
            fontSize="18px"
            value={tempGoals}
            backgroundColor="whitesmoke"
            onChange={(e) => setTempGoals(e.currentTarget.value)}
            mt={2}
            mb={2}
            p={4}
            height={10}
            width="80%"
          />
          <Button
            fontSize="15px"
            onClick={handleGoalSubmit}
            backgroundColor="#3aaeea"
          >
            Add Goals
          </Button>
        </div>
        <div>
          {goals
            ? goals.map((goal) => {
                return (
                  <List ml={3} spacing={3}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "30%",
                      }}
                    >
                      <ListItem mr={5}>{goal}</ListItem>
                      <CloseIcon />
                    </div>
                  </List>
                );
              })
            : ""}
        </div>
        <h1 style={{ fontSize: "20px", marginTop: "20px" }}>
          What actions will you take to achieve your goals?
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Input
            fontSize="18px"
            value={tempAction}
            backgroundColor="whitesmoke"
            onChange={(e) => setTempAction(e.currentTarget.value)}
            mt={2}
            mb={2}
            height={10}
            width="80%"
          />
          <Button
            onClick={handleActionSubmit}
            fontSize="15px"
            backgroundColor="#3aaeea"
          >
            Add Action
          </Button>
        </div>
        <div>
          {action
            ? action.map((goal) => {
                return (
                  <List ml={3} spacing={3}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "30%",
                      }}
                    >
                      <ListItem mr={5}>{goal}</ListItem>
                      <CloseIcon />
                    </div>
                  </List>
                );
              })
            : ""}
        </div>
      </div>

      <button
        onClick={handleUpdate}
        style={{
          backgroundColor: "#3aaeea",
          padding: "10px",
          borderRadius: "10px",
          marginTop: "30px",
          marginBottom: "20px",
          width: "200px",
        }}
      >
        Update
      </button>
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
      <h1 style={{ fontFamily: "Mosk", fontSize: "40px", marginTop: "30px" }}>
        Loading .....
      </h1>
    </div>
  );
}

export default ProgressDetail;
