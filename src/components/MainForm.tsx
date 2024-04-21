/* eslint-disable */
import React, { useEffect, useState } from "react";
import questionsData from "../Questions.json";
import useFormState from "../hooks/useFormState";
import { Section, SectionComponent } from "./Section";
import axios from "axios";
import {
  Autocomplete,
  Backdrop,
  // Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  //CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
//import { BorderColor, JoinRight } from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";
import SnackBar from "./SnackBar";
import { Rule } from "./Question";

interface QuestionsData {
  id: number | null;
  name: string;
  memberName: string;
  secNumber: string;
  periodEndDate: string | null;
  filing: string | null;
  examiner: string | null;
  submittedDate: string | null;
  sections: Section[];
}

const validateForm = () => {
  // TODO: implement validation logic
  return true;
};

const API_URL = "https://api-checklist.azurewebsites.us/";

const constructFinalFormData = (
  questionsData: QuestionsData,
  updatedform: {
    [key: string]: {
      value: string | boolean;
      isValid: boolean;
      id: number;
      Rules: Rule;
    };
  }
) => {
  //debugger;
  //const initialData = {};
  console.log(updatedform);
  console.log(questionsData);
  questionsData.sections.forEach((section) => {
    section.questions?.forEach((question) => {
      const uniqueKey = `section-${section.name}-none-row-0-question-${question.id}`;
      //let rs = updatedform[ uniqueKey ].value.value;
      question.answer = updatedform[uniqueKey]?.value;
      // let rs = updatedform[uniqueKey]?.value;
    });
    section.subSections?.forEach((subSection) => {
      subSection.questions.forEach((question) => {
        const uniqueKey = `section-${section.name}-subsection-${subSection.name}-row-${question.row}-question-${question.id}-${question.index}`;
        //const uniqueKeyrow = `section-${section.name}-subsection-${subSection.name}-row-1-question-${question.id}`;
        //const uniqueKeyrow1 = `section-${section.name}-subsection-${subSection.name}-row-2-question-${question.id}`;
        question.answer = updatedform[uniqueKey]?.value;

        //let rs1 = updatedform[uniqueKey]?.value;
        //  section.questions?.map((question, questionIndex) => {
        //    const uniqueKeyrow0 = `section-${section.name}-subsection-${subSection.name}-row-0-question-${question.id}-${questionIndex}`;
        //    const uniqueKeyrow1 = `section-${section.name}-subsection-${subSection.name}-row-1-question-${question.id}-${questionIndex}`;
        //    const uniqueKeyrow2 = `section-${section.name}-subsection-${subSection.name}-row-2-question-${question.id}-${questionIndex}`;
        //  });
      });
    });
  });

  return questionsData;
};

const constructInitialFormData = (questionsData: QuestionsData) => {
  const initialData: {
    [key: string]: {
      value: string | boolean;
      isValid: boolean;
      id: number;
      Rules: Rule; //isPurple: boolean;
      // isRed: boolean;
      // isYellow: boolean;
    };
  } = {};
  questionsData.sections.forEach((section) => {
    section.questions?.forEach((question) => {
      const uniqueKey = `section-${section.name}-question-${question.id}`;
      initialData[uniqueKey] = {
        value: question.answer || "",
        isValid: true,
        id: question.id,
        Rules: question.Rules,
      };
    });
    section.subSections?.forEach((subSection) => {
      subSection.questions.forEach((question) => {
        const uniqueKey = `section-${section.name}-subsection-${subSection.name}-question-${question.id}`;
        initialData[uniqueKey] = {
          value: question.answer || "",
          isValid: true,
          id: question.id,
          Rules: question.Rules,
        };
      });
    });
  });

  return initialData;
};

export const MainFormComponent: React.FC = () => {
  const { memberName, secNumber, sections, name } = questionsData;
  const initialFormData = constructInitialFormData(
    questionsData as QuestionsData
  );
  const [formData, handleChange, setFormData] = useFormState(initialFormData);
  const [membershipdata, setMembershipdata] = useState([]);
  const [members, setMembers] = useState([]);
  //debugger;
  interface AutocompleteOption {
    label: string;
  }
  const AddCheckListDetails = async (finalJson: any) => {
    setLoading(true);
    const payload = {
      eightNum: "8-99999",
      reportAsofDate: "2024-04-15",
      ecdata: JSON.stringify(finalJson),
      periodEndDate: "2024-06-30",
      filingVersion: 1,
      submittedBy: "Test Data",
      submittedDate: "2024-04-15",
      formStatus: "In Progress",
    };
    try {
      const config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      const data = await axios.post(
        API_URL + "api/examinerchecklist",
        payload,
        config
      );
      if (data.status === 200 || data.status === 201) {
        setLoading(false);
        setSnackbarOpen(true);
        setMessage("Checklist Submitted Successfully.");
        setSeverity("success");
      } else {
        setLoading(false);
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    GetMemberDetails();
  }, []);
  const options = [
    462, 484, 497, 533, 621, 719, 759, 831, 1068, 1369, 1402, 1447, 1865, 1927,
    2142, 2399, 2448,
  ];
  const GetMemberDetails = () => {
    try {
      // const config = {
      //   headers: { "Access-Control-Allow-Origin": "*" },
      // };
      // const res = await axios.get(
      //   API_URL + "api/ExaminerChecklists",
      //   payload,
      //   config
      // );

      const membership = [
        {
          MemberName: "JANNEY MONTGOMERY SCOTT LLC",
          Number: 462,
          EndDate: "20240415",
        },
        {
          MemberName: "WINTRUST INVESTMENTS LLC",
          Number: 484,
          EndDate: "20240415",
        },
        {
          MemberName: "CREDIT SUISSE SECURITIES (USA) LLC",
          Number: 497,
          EndDate: "20240415",
        },
        { MemberName: "WULFF HANSEN & CO", Number: 533, EndDate: "20240415" },
        {
          MemberName: "LORD ABBETT DISTRIBUTOR LLC",
          Number: 621,
          EndDate: "20240415",
        },
        {
          MemberName: "CANTOR FITZGERALD & CO",
          Number: 719,
          EndDate: "20240415",
        },
        {
          MemberName: "NATIONAL SECURITIES CORPORATION",
          Number: 759,
          EndDate: "20240415",
        },
        {
          MemberName: "GOLDMAN SACHS & CO LLC",
          Number: 831,
          EndDate: "20240415",
        },
        {
          MemberName: "ASSOCIATED INVESTMENT SERVICES INC",
          Number: 1068,
          EndDate: "20240415",
        },
        {
          MemberName: "B C ZIEGLER AND COMPANY",
          Number: 1369,
          EndDate: "20240415",
        },
        {
          MemberName: "RUSSELL INVESTMENTS IMPLEMENTATION SERVICES LLC",
          Number: 1402,
          EndDate: "20240415",
        },
        {
          MemberName: "RICHARDS MERRILL & PETERSON INC",
          Number: 1447,
          EndDate: "20240415",
        },
        { MemberName: "H C DENISON CO", Number: 1865, EndDate: "20240415" },
        {
          MemberName: "ROBERT W BAIRD & CO INC",
          Number: 1927,
          EndDate: "20240415",
        },
        {
          MemberName: "SAGE RUTTY & CO INC",
          Number: 2142,
          EndDate: "20240415",
        },
        {
          MemberName: "SOVEREIGN LEGACY SECURITIES INC",
          Number: 2399,
          EndDate: "20240415",
        },
        {
          MemberName: "NATIXIS SECURITIES AMERICAS LLC",
          Number: 2448,
          EndDate: "20240415",
        },
      ];
      SetMdata(membership);
      let Members = [];
      membership.map((member) => {
        Members.push(member.Number);
      });
      setMembers(Members);
    } catch (e) {
      throw e;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: process form data
      debugger;
      const finalJson = constructFinalFormData(
        questionsData as any,
        formData as {
          [key: string]: {
            value: string | boolean;
            isValid: boolean;
            id: number;
            Rules: Rule;
          };
        }
      );
      AddCheckListDetails(finalJson);
      console.log("Form data: ", finalJson);
    } else {
      alert("Please fill out the form correctly.");
    }
  };

  const resetSectionFormData = (sectionName: any) => {
    const newFormData = { ...formData };
    sections.forEach((section) => {
      if (section.name === sectionName) {
        section.questions?.forEach((question) => {
          const uniqueKey = `section-${section.name}-none-row-0-question-${question.id}`;
          newFormData[uniqueKey] = {
            value: "",
            isValid: true,
            id: question.id,
          };
        });
        section.subSections?.forEach((subSection) => {
          subSection.questions.forEach((question) => {
            const uniqueKey = `section-${section.name}-subsection-${subSection.name}-row-0-question-${question.id}`;
            newFormData[uniqueKey] = {
              value: "",
              isValid: true,
              id: question.id,
            };
          });
        });
      }
    });
    setFormData(newFormData);
  };
  const [mdata, SetMdata] = useState([]);

  // const handleMembershipData = async (event) => {
  //   let membershipdetails = SetMdata.filter(function (element) {
  //     return element.Number === event.target.innerText;
  //   });
  // };
  const [input, setInput] = useState("");
  const [value, setValue] = useState<number | null>(options[0]);
  const [inputValue, setInputValue] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  return (
    <div className="container mx-auto p-4">
      <SnackBar
        open={snackbarOpen}
        severity={severity}
        message={message}
        setOpen={setSnackbarOpen}
      />
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Card sx={{ padding: "32px" }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ textAlign: "center", backgroundColor: lightBlue }}
          component="div"
          color="#1976D2"
          boxShadow={0}
        >
          ANNUAL REPORTS REVIEW CHECKLIST {new Date().getFullYear()}
        </Typography>
        <Grid
          container
          width="100%"
          sx={{
            alignContent: "right",
            float: "right",
            width: "100%",
            textAlign: "center",
          }}
          component="div"
          border={0}
        >
          <Grid
            item
            width="25%"
            alignItems={"right"}
            sx={{ textAlign: "right" }}
            border={0}
          >
            <Box padding={2}>
              {" "}
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>SEC Number : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            alignItems={"right"}
            textAlign={"left"}
            border={0}
            width="25%"
          >
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={value}
                  options={members}
                  // onChange={(e, v) => setInput(v)}
                  sx={{
                    "& .MuiAutocomplete-input, & .MuiInputid-root": {
                      fontSize: 15,
                    },
                    width: 200,
                    height: 10,
                  }}
                  // onChange={(event) => {
                  //   handleMembershipData(event);
                  // }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Choose 8- Number"
                    />
                  )}
                />
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            alignItems={"right"}
            textAlign={"right"}
            border={0}
            width="25%"
          >
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b> Member Name : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            textAlign={"left"}
            alignItems={"left"}
            border={0}
            width="25%"
          >
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                Member 1
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          width="100%"
          sx={{
            alignContent: "right",
            float: "right",
            width: "100%",
            textAlign: "center",
          }}
          component="div"
          border={0}
        >
          <Grid
            item
            width="25%"
            alignItems={"right"}
            sx={{ textAlign: "right" }}
            border={0}
          >
            <Box padding={2}>
              {" "}
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>Report Ending Date : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            alignItems={"right"}
            textAlign={"left"}
            border={0}
            width="25%"
          >
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                {"2024/04/13"}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            alignItems={"right"}
            textAlign={"right"}
            border={0}
            width="25%"
          >
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b> Filing Sequence : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            textAlign={"left"}
            alignItems={"left"}
            border={0}
            width="25%"
          >
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                1
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
      {/* <h1 className="text-2xl font-bold text-center mb-4">{name}</h1> */}
      {/* <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">
          {memberName
            ? `Member Name: ${memberName}`
            : "Member Name not provided"}
        </h2>
        <h2 className="text-xl font-semibold">
          {secNumber ? `SEC Number: ${secNumber}` : "SEC Number not provided"}
        </h2>
      </div> */}
      <form onSubmit={handleSubmit}>
        {sections.map((section, index) => (
          <SectionComponent
            key={`section-${index}`}
            section={section as Section}
            sectionId={`section-${index}`}
            handleChange={handleChange}
            formData={
              formData as {
                [key: string]: {
                  value: string | boolean;
                  isValid: boolean;
                  id: number;
                  Rules: Rule;
                };
              }
            }
            resetSectionFormData={resetSectionFormData}
          />
        ))}
        <Box textAlign="center" justifyContent={"center"}>
          <Button
            color="primary"
            variant="contained"
            //onClick={AddCheckListDetails}
            type="submit"
          >
            Save
          </Button>
          &nbsp;&nbsp;
          <Button
            color="primary"
            variant="contained"
            //onClick={AddCheckListDetails}
            type="submit"
          >
            Submit
          </Button>
        </Box>

        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};
