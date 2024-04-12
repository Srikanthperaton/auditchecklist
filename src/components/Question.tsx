import FormData from "../hooks/useFormState";

type ControlType = "checkbox" | "textbox" | null;

export interface Question {
  id: number;
  title: string;
  control: ControlType;
  answer: string | null;
  row: number;
  index: number;
}

interface QuestionProps {
  question: Question;
  handleChange: (uniqueId: string, value: string | boolean) => void;
  formData: FormData;
  uniqueId: string;
}

export const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  handleChange,
  formData,
  uniqueId,
}) => {
  const questionData = formData[uniqueId] || { value: "", isValid: true };
  const isValid = questionData ? questionData.isValid : true;

  const renderControl = () => {
    switch (question.control) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            id={`question-${uniqueId}`}
            checked={questionData.value === true}
            className="form-checkbox h-5 w-5 text-blue-600 mr-2"
            onChange={(e) => handleChange(uniqueId, e.target.checked)}
            aria-label={question.title}
          />
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
            onChange={(e) => handleChange(uniqueId, e.target.value)}
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
      } mb-2 flex items-center`}
    >
      {renderControl()}
      <label
        htmlFor={`question-${uniqueId}`}
        className="text-gray-800 font-medium"
      >
        {question.title}
      </label>
      {!isValid && <div className="error-message">This field is required</div>}
    </div>
  );
};
