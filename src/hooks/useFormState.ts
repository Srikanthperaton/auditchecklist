import { useState } from "react";
import { Rule } from "../components/Question";
//import { Rule } from "postcss";

export interface FormData {
  [key: string]: {
    value: string | boolean;
    isValid: boolean;
    id: number;
  };
}

const useFormState = (
  initialState: FormData
): [
  FormData,
  (uniqueId: string, value: string | boolean, id: number, Rules: Rule) => void,
  React.Dispatch<React.SetStateAction<FormData>>
] => {
  const [formData, setFormData] = useState<FormData>(
    Object.entries(initialState).reduce((acc, [key, value]) => {
      acc[key] = { value: value.value, isValid: true, id: 0 };
      return acc;
    }, {} as FormData)
  );

  const validateInput = (id: string, value: any): boolean => {
    // TODO: Implement validation logic
    return true;
  };

  const handleChange = (
    uniqueId: string,
    value: any,
    id: number,
    Rules: Rule
  ) => {
    console.log(`Updating ${uniqueId}: `, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [uniqueId]: {
        value,
        isValid: validateInput(uniqueId, value),
        id,
        Rules: Rules,
      },
    }));
  };

  return [formData, handleChange, setFormData];
};

export default useFormState;
