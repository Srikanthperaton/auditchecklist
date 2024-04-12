import { useState } from "react";

export interface FormData {
  [key: string]: {
    value: string | boolean;
    isValid: boolean;
  };
}

const useFormState = (
  initialState: FormData
): [
  FormData,
  (uniqueId: string, value: string) => void,
  React.Dispatch<React.SetStateAction<FormData>>
] => {
  const [formData, setFormData] = useState<FormData>(
    Object.entries(initialState).reduce((acc, [key, value]) => {
      acc[key] = { value: value, isValid: true };
      return acc;
    }, {} as FormData)
  );

  const validateInput = (id: string, value: any): boolean => {
    // TODO: Implement validation logic
    return true;
  };

  const handleChange = (uniqueId: string, value: any) => {
    console.log(`Updating ${uniqueId}: `, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [uniqueId]: { value, isValid: validateInput(uniqueId, value) },
    }));
  };

  return [formData, handleChange, setFormData];
};

export default useFormState;
