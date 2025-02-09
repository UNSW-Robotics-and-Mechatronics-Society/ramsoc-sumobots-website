import { FieldType } from "../types/FieldType";

/**
 * Validates a form field based on its name and value.
 *
 * @param name - The name of the form field to validate.
 * @param value - The value of the form field to validate.
 * @returns An error message if the field is invalid, otherwise an empty string.
 */
export const validateField = (name: FieldType, value: string) => {
  const errorMessages: { [key: string]: string } = {
    fullName: "Please enter your full name.",
    email: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    school: "Please specify your school or university.",
  };

  switch (name) {
    case "fullName":
      return value ? "" : errorMessages.fullName;
    case "email":
      if (!value) return errorMessages.email;
      return /\S+@\S+\.\S+/.test(value) ? "" : errorMessages.emailInvalid;
    case "school":
      return value ? "" : errorMessages.school;
    default:
      return "";
  }
};
