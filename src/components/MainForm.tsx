import React from "react";
import questionsData from "../Questions.json";
import useFormState from "../hooks/useFormState";
import { Section, SectionComponent } from "./Section";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { BorderColor } from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";
import SnackBar from "./SnackBar";

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
const API_URL = "https://api-auditreporttool-dev.azurewebsites.us/";
const AddCheckListDetails = async (finalJson: any) => {
  const payload = {
    finalJson: JSON.stringify(finalJson),
    Include: true,
    Signed: false,
    Notarized: false,
    CreatedBy: "Application",
    CreatedDate: "2024-04-08T00:00:00",
    ModifiedBy: null,
    ModifiedDate: null,
  };
  try {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    const res = await axios.post(
      API_URL + "api/ExaminerChecklists",
      payload,
      config
    );
  } catch (e) {
    throw e;
  }
};

const constructFinalFormData = (
  questionsData: QuestionsData,
  updatedform: FormData
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
  const initialData = {};
  questionsData.sections.forEach((section) => {
    section.questions?.forEach((question) => {
      const uniqueKey = `section-${section.name}-question-${question.id}`;
      initialData[uniqueKey] = {
        value: question.answer || "",
        isValid: true,
        id: question.id,
      };
    });
    section.subSections?.forEach((subSection) => {
      subSection.questions.forEach((question) => {
        const uniqueKey = `section-${section.name}-subsection-${subSection.name}-question-${question.id}`;
        initialData[uniqueKey] = {
          value: question.answer || "",
          isValid: true,
          id: question.id,
        };
      });
    });
  });

  return initialData;
};

export const MainFormComponent: React.FC = () => {
  const { memberName, secNumber, sections, name } = questionsData;
  const initialFormData = constructInitialFormData(questionsData as any);
  const [formData, handleChange, setFormData] = useFormState(initialFormData);
  //debugger;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: process form data
      debugger;
      const finalJson = constructFinalFormData(questionsData as any, formData);
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
          newFormData[uniqueKey] = { value: "", isValid: true };
        });
        section.subSections?.forEach((subSection) => {
          subSection.questions.forEach((question) => {
            const uniqueKey = `section-${section.name}-subsection-${subSection.name}-row-0-question-${question.id}`;
            newFormData[uniqueKey] = { value: "", isValid: true };
          });
        });
      }
    });
    setFormData(newFormData);
  };

  return (
    <div className="container mx-auto p-4">
      {/* <SnackBar
        open={snackbarOpen}
        severity={severity}
        message={message}
        setOpen={setSnackbarOpen}
      /> */}
      {/* <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <Card sx={{ padding: "32px" }}>
        {/* <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold text-center mb-4">
                        ANNUAL REPORTS REVIEW CHECKLIST 2023
                    </h1>
                    <div className="mb-6 text-center">
                        <h2 className="text-xl font-semibold">
                            { memberName
                                ? `Member Name: ${ memberName }`
                                : "Member Name not provided" }
                        </h2>
                        <h2 className="text-xl font-semibold">
                            { secNumber ? `SEC Number: ${ secNumber }` : "SEC Number not provided" }
                        </h2>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        { sections.map( ( section, index ) => (
                            <SectionComponent
                                key={ `section-${ index }` }
                                section={ section }
                                sectionId={ `section-${ index }` }
                                handleChange={ handleChange }
                                formData={ formData }
                            />
                        ) ) }
                        <button type="submit">Submit</button>
                    </form>
                </div> */}

        <Typography
          gutterBottom
          variant="h6"
          sx={{ textAlign: "center", backgroundColor: lightBlue }}
          component="div"
          color="blue"
          boxShadow={4}
        >
          ANNUAL REPORTS REVIEW CHECKLIST 2023
        </Typography>
        <Grid
          container
          sx={{ alignContent: "center", width: "100%", textAlign: "center" }}
          component="div"
        >
          <Grid item>
            <Box padding={2}>
              {" "}
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>Member Name : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                {memberName}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b> SEC Number : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                8 - 69944
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ alignContent: "center", width: "100%", textAlign: "center" }}
          component="div"
        >
          <Grid item>
            <Box padding={2}>
              {" "}
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>Period Ending : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                "03/31/2024"
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box padding={2}>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b> Filing Sequence : </b>
              </Typography>
            </Box>
          </Grid>
          <Grid item>
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
            section={section}
            sectionId={`section-${index}`}
            handleChange={handleChange}
            formData={formData}
            resetSectionFormData={resetSectionFormData}
          />
        ))}
        {/* <Button
          color="primary"
          variant="contained"
          onClick={AddCheckListDetails}
        >
          Add
        </Button> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
