import {
  Card,
  Box,
  //CardContent,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  CardActions,
  Button,
} from "@mui/material";
import List from "./List";
import axios from "axios";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { type } from "@testing-library/user-event/dist/type";
// import { fileURLToPath } from "url";
// import { name } from "@azure/msal-browser/dist/packageMetadata";
// import questionsData from "../Questions.json";
// import useFormState from "../hooks/useFormState";
// import { SectionComponent } from "./Section";

export const CheckList = () => {
  const API_URL = "https://api-auditreporttool-dev.azurewebsites.us/";
  const AddCheckListDetails = async () => {
    const payload = {
      finalJson: "Sample Json from Application",
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
      await axios.post(API_URL + "api/ExaminerChecklists", payload, config);
    } catch (e) {
      throw e;
    }
  };

  // const validateForm = () =>
  // {
  //     // TODO: implement validation logic
  //     return true;
  // };

  // const constructInitialFormData = ( questionsData: any ) =>
  // {
  //     const initialData = {};
  //     questionsData.sections.forEach( ( section: any ) =>
  //     {
  //         section.questions?.forEach( ( question: any ) =>
  //         {
  //             const uniqueKey = `section-${ section.name }-question-${ question.id }`;
  //             ( initialData as any )[ uniqueKey ] = {
  //                 value: question.Answer || "",
  //                 isValid: true,
  //             };
  //         } );
  //         section.subSections?.forEach( ( subSection: any ) =>
  //         {
  //             subSection.questions.forEach( ( question: any ) =>
  //             {
  //                 const uniqueKey = `section-${ section.name }-subsection-${ subSection.name }-question-${ question.id }`;
  //                 ( initialData as any )[ uniqueKey ] = {
  //                     value: question.Answer || "",
  //                     isValid: true,
  //                 };
  //             } );
  //         } );
  //     } );

  //     return initialData;
  // };

  // const MainFormComponent: React.FC = () =>
  // {
  //     const { memberName, secNumber, sections } = questionsData;
  //     const initialFormData = constructInitialFormData( questionsData );
  //     const [ formData, handleChange ] = useFormState( initialFormData );

  //     const handleSubmit = ( e: React.FormEvent ) =>
  //     {
  //         e.preventDefault();
  //         if ( validateForm() )
  //         {
  //             // TODO: process form data
  //             console.log( "Form data: ", formData );
  //         } else
  //         {
  //             alert( "Please fill out the form correctly." );
  //         }
  //     };

  return (
    <>
      <Box width="100%">
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
            variant="h5"
            sx={{ textAlign: "center" }}
            component="div"
          >
            ANNUAL REPORTS REVIEW CHECKLIST {Date()}
          </Typography>
          <Grid
            container
            sx={{
              alignContent: "center",
              width: "100%",
              textAlign: "center",
            }}
            component="div"
          >
            <Grid item>
              <Box padding={2}>
                {" "}
                <Typography gutterBottom variant="h6" component="div">
                  <b>Member Name : </b>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box padding={2}>
                <Typography gutterBottom variant="h6" component="div">
                  A5 SECURITIES LLC{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box padding={2}>
                <Typography gutterBottom variant="h6" component="div">
                  <b> SEC Number : </b>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box padding={2}>
                <Typography gutterBottom variant="h6" component="div">
                  8 - 69944
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography gutterBottom variant="h5" component="div">
            1.Oath or Affirmation
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              sx={{ paddingLeft: "20%" }}
              labelPlacement="start"
              label="Included"
            />
          </Typography>
          <div>
            <Typography gutterBottom variant="body1" color="text.secondary">
              1.States the correct Member Name; the Date corresponds to Period
              Ending or later
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                sx={{ paddingLeft: "10%" }}
                label=""
              />
            </Typography>
            <Typography gutterBottom variant="body1" color="text.secondary">
              2.Signed
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                sx={{ paddingLeft: "20%" }}
                label=""
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                sx={{ paddingLeft: "20%" }}
                label="Notarized"
                labelPlacement="start"
              />
            </Typography>
          </div>
          <div>
            <Typography gutterBottom variant="h5" component="div">
              2.Financial Report
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              1.States the correct Member Name; the Date corresponds to Period
              Ending or later
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" component="div">
            3.15c3-3 Reports
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            4.15c3-3 Reports
          </Typography>
          <List />
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={AddCheckListDetails}
            >
              Add
            </Button>
          </CardActions>
          {/* <button type="submit" className="btn" >Submit</button> */}
        </Card>
      </Box>
    </>
  );
  //}
};
export default CheckList;
