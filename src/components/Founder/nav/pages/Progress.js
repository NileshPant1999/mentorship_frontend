import { Spinner, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../../../auth";
import axiosInstance from "../../../../axios";
import { Line } from "react-chartjs-2";

function Progress(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();
  const [progress, setProgress] = useState({ loading: "false", data: null });

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
  const currentNewDate = parseInt(newDate.getUTCDate());
  const currentMonth = months[newDate.getUTCMonth()];
  const currentYear = newDate.getFullYear();

  const numOfConversation = [];
  const primaryMetric = [];

  if (progress.data) {
    progress.data.forEach((dat) => {
      numOfConversation.push(dat.conversation);
      return null;
    });
  }

  if (progress.data) {
    progress.data.forEach((res) => {
      primaryMetric.push(res.primary_metric);
    });
  }

  async function getProgressList() {
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
  }

  useEffect(() => {
    getProgressList();
    setIsLoading(false);
  }, [setProgress, setIsLoading]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const slug = parseInt(Math.random() * 1000000);
    try {
      await axiosInstance
        .post(`founder/add/`, {
          founder_id: isAuthenticated().user_id,
          slug: slug,
        })
        .then(async (res) => {
          console.log(res);
          await getProgressList();
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Conversations",
        data: numOfConversation,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Stakeholders",
        data: [335, 534, 245, 431, 441, 653, 600],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const data2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Primary Metric",
        data: primaryMetric,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const legend = {
    display: true,
    position: "top",
    labels: {
      fontColor: "#323130",
      fontSize: 20,
    },
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 300,
          },
        },
      ],
    },
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
          <div className=" progress__graph">
            <h1
              style={{
                fontSize: "25px",
                marginBottom: "30px",
                paddingTop: "20px",
              }}
            >
              Primary Metric
            </h1>
            <Line data={data2} legend={legend} options={options} />
          </div>
          <div className="progress__graph">
            <h1
              style={{
                fontSize: "25px",
                marginBottom: "30px",
                paddingTop: "20px",
              }}
            >
              Secondry Metric
            </h1>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
