import { Alert, Avatar, Box, Container, Grid, Stack } from "@mui/material";
import FormData from "../hooks/useFormState";
import { deepOrange } from "@mui/material/colors";
import { Height } from "@mui/icons-material";

type ControlType = "checkbox" | "textbox" | null;

export interface Question {
  id: number;
  title: string;
  control: ControlType;
  answer: string | boolean | null;
  row: number;
  index: number;
  Rules: Rule;
}
export interface Rule {
  isPurple: boolean;
  isRed: boolean;
  isYellow: boolean;
}

interface QuestionProps {
  question: Question;
  handleChange: (
    uniqueId: string,
    value: string | boolean,
    id: number,
    Rules: Rule
  ) => void;
  formData: {
    [key: string]: {
      value: string | boolean;
      isValid: boolean;
      id: number;
      Rules: Rule;
    };
  };
  uniqueId: string;
}

export const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  handleChange,
  formData,
  uniqueId,
}) => {
  const questionData = formData[uniqueId] || {
    value: "",
    isValid: false,
    id: question.id,
    Rules: question.Rules,
  };
  debugger;
  const isValid = questionData ? questionData.value : false;
  const isPurple = questionData.Rules?.isPurple
    ? questionData.Rules?.isPurple
    : false;
  const isYellow = questionData.Rules?.isYellow
    ? questionData.Rules?.isYellow
    : false;
  const isRed = questionData.Rules?.isRed ? questionData.Rules?.isRed : false;

  const renderControl = () => {
    switch (question.control) {
      case "checkbox":
        return (
          <div className="flex flex-row ...">
            <div>
              <input
                type="checkbox"
                id={`question-${uniqueId}`}
                checked={questionData.value === true}
                className="form-checkbox h-4 w-4 theme-controller mr-2"
                //className="checkbox theme-controller h-4 w-4"
                onChange={(e) =>
                  handleChange(
                    uniqueId,
                    e.target.checked,
                    question.id,
                    question.Rules
                  )
                }
                aria-label={question.title}
              />
            </div>
          </div>
        );
      case "textbox":
        return (
          <input
            type="text"
            id={`question-${uniqueId}`}
            className="form-input mt-1 block w-full mr-2"
            value={
              typeof questionData.value === "string" ? questionData.value : ""
            }
            onChange={(e) =>
              handleChange(
                uniqueId,
                e.target.value,
                questionData.id,
                question.Rules
              )
            }
            aria-label={question.title}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`question ${
        isValid ? "valid" : "invalid"
      } mb-2 flex items-center flex h-full `}
    >
      {/* {!isValid && <div className="error-message">This field is required</div>} */}
      <div className="w-1/2 h-full">
        {" "}
        <div className="flex flex-row ...">
          <div className="mx-4 ...">
            <label
              htmlFor={`question-${uniqueId}`}
              className="text-gray-800 font-medium"
            >
              {question.title}
            </label>
          </div>
        </div>
      </div>
      <div className="w-1/4 h-full">{renderControl()}</div>
      {/* <span className="w-4 h-4 mt-1 mr-2 bg-purple-500 rounded-full"></span> */}
      {!isValid && (
        <span
          className={`w-4 h-4 mt-1 mr-2 bg-${
            questionData.Rules?.isPurple ? "purple" : "yellow"
          }-500 rounded-full`}
        ></span>
      )}
      {/* <div className="w-1/4 h-full"> */}
      {/* {!isValid && questionData.Rules?.isYellow && (
        <span className="w-4 h-4 mt-1 mr-2 bg-yellow-500 rounded-full"></span>
      )} */}

      {/* {!isValid && questionData.Rules?.isRed && (
        <span className="w-4 h-4 mt-1 mr-2 bg-red-500 rounded-full"></span>
      )} */}
      {/* </div> */}
    </div>
  );
};
