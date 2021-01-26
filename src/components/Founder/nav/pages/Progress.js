import { Button, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../../../auth";
import axiosInstance from "../../../../axios";

function Progress(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [progress, setProgress] = useState({ loading: "false", data: null });
  const [updated, setUpdated] = useState(false);
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

  Date.prototype.getUTCTime = function () {
    return this.getTime() - this.getTimezoneOffset() * 60000;
  };

  const newDate = new Date();
  const currentNewDate = parseInt(newDate.getUTCDate());
  const currentMonth = months[newDate.getUTCMonth()];
  const currentYear = newDate.getFullYear();

  const getProgressList = async () => {
    try {
      setIsLoading(true);
      await axiosInstance
        .get(`founder/progress/${isAuthenticated().user_id}/`)
        .then((res) => {
          const allProgress = res.data;
          setProgress({ load: "true", data: allProgress });
          const date = res.data[0].end_date;
          const resp = date.split("-");
          console.log(resp);
          setDate(resp[2]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getProgressList();
    setIsLoading(false);
  }, [setProgress, updated, setIsLoading]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      await axiosInstance
        .post(`founder/add/`, {
          founder_id: isAuthenticated().user_id,
          slug: parseInt(Math.random() * 1000000),
        })
        .then(async (res) => {
          await getProgressList();
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return progress.loading || isLoading ? (
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
    <div className="progress__maintab">
      <div
        style={{
          padding: "30px 50px 20px 0",
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "35px", fontFamily: "Mosk" }}>Weekely Update</h1>
        <div className={date >= currentNewDate ? "disable" : "enable"}>
          <button className="button_progress" onClick={handleSubmit}>
            Add Progress
          </button>
        </div>
      </div>
      <div className="progress__mainbartab">
        <div className="progress__responsive">
          <div>
            {progress.data.map((res) => {
              return (
                <div className="progress__main">
                  <div className="progress__date">
                    <h1 className="progress__dateheading">{`${currentMonth} ${
                      res.start_date.split("-")[2]
                    } - ${currentMonth} ${
                      res.end_date.split("-")[2]
                    }, ${currentYear}`}</h1>
                    <a
                      className="edit"
                      href={`details/${res.slug}`}
                      _blank="true"
                    >
                      Edit
                    </a>
                  </div>
                  <hr style={{ marginBottom: "5px" }} />
                  <div className="progress__data">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        textAlign: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <h1 style={{ fontWeight: "bolder" }}>Primary Metric</h1>
                      <h1 style={{ fontWeight: "bolder" }}>Conversation</h1>
                    </div>
                    <hr />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        textAlign: "center",
                        paddingTop: "10px",
                      }}
                    >
                      <h1>{res.primary_metric}</h1>
                      <h1>{res.conversation}</h1>
                    </div>
                  </div>
                  <div className="progress__feedback">
                    <h1 style={{ fontSize: "20px", fontWeight: "bolder" }}>
                      Mentor Feedback
                    </h1>
                    {res.mentor_feedback ? (
                      <Textarea
                        mt={2}
                        mb={2}
                        p={4}
                        fontSize="18px"
                        backgroundColor="whitesmoke"
                        value={res.mentor_feedback}
                        height={150}
                      />
                    ) : (
                      <Textarea
                        mt={2}
                        mb={2}
                        p={4}
                        fontSize="18px"
                        backgroundColor="whitesmoke"
                        value="We will Update this field once we get response from your
                      mentor"
                        height={150}
                      />
                    )}

                    <h1
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                    >
                      Coach Feedback
                    </h1>
                    {res.coach_feedback ? (
                      <Textarea
                        mt={2}
                        mb={2}
                        p={4}
                        fontSize="18px"
                        backgroundColor="whitesmoke"
                        value={res.coach_feedback}
                        height={150}
                      />
                    ) : (
                      <Textarea
                        mt={2}
                        mb={2}
                        p={4}
                        fontSize="18px"
                        backgroundColor="whitesmoke"
                        value="We will Update this field once we get response from your
                      mentor"
                        height={150}
                      />
                    )}
                  </div>
                  {res.goals ? (
                    <div className="progress__goals">
                      <h1
                        style={{ fontSize: "20px", fontWeight: "bolder" }}
                      >{`Goals (0/${res.goals ? res.goals.length : "1"})`}</h1>
                      <Stack pl={6} mt={1} spacing={1}>
                        {res.goals
                          ? res.goals.map((goal) => {
                              return <Checkbox>{goal}</Checkbox>;
                            })
                          : ""}
                      </Stack>
                    </div>
                  ) : (
                    ""
                  )}
                  {res.action_helped ? (
                    <div className="progress__goals">
                      <h1
                        style={{ fontSize: "20px", fontWeight: "bolder" }}
                      >{`Action Helped (0/${
                        res.action_helped ? res.action_helped.length : "1"
                      })`}</h1>
                      <Stack pl={6} mt={1} mb={5} spacing={1}>
                        {res.action_helped
                          ? res.action_helped.map((goal) => {
                              return <Checkbox>{goal}</Checkbox>;
                            })
                          : ""}
                      </Stack>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="progress__graph">
            <h1>Graph 1</h1>
          </div>
          <div className="progress__graph">
            <h1>Graph 2</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
