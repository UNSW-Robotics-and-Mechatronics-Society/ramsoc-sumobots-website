import { useState } from "react";
import { FieldType } from "../../types/FieldType";
import { SubmitStatus } from "../../types/SubmitStatus";
import { validateField } from "../../utils/validateField";
import { appendToSheet } from "../../../_utils/googlesheet";
import TextField from "../../_components/TextField";

const EOIForm = ({ status, setStatus }: { status: SubmitStatus, setStatus: React.Dispatch<React.SetStateAction<SubmitStatus>> }) => {
  const initialFormData: { [key in FieldType]: string } = {
    fullName: "",
    school: "",
    email: "",
  };

  const [formData, setFormData] =
    useState<{ [key in FieldType]: string }>(initialFormData);

  const [errors, setErrors] =
    useState<{ [key in FieldType]: string }>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name as FieldType, value);
    setErrors({ ...errors, [name]: error });
  };

  function validateForm() {
    let valid = true;
    const newErrors = initialFormData;

    Object.keys(formData).forEach((key) => {
      const error = validateField(
        key as FieldType,
        formData[key as keyof typeof formData],
      );
      if (error) valid = false;
      newErrors[key as keyof typeof newErrors] = error;
    });

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;
    setStatus("loading");

    // Submit form data
    const result = await appendToSheet("eoi!A:C", [Object.values(formData)]);
    if (!result.success) {
      alert(`Error: ${result.error}`);
      setStatus("initial");
      return;
    }
    setStatus("success");
  }

  return (
    <>
      <h1 className="mb-2 text-center text-3xl font-semibold">EOI Form</h1>
      <p className="text-center text-base text-gray-400">
        Want to be part of the next big battle?
        <br />
        Fill this out and we&apos;ll keep you updated.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-1">
        <TextField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          value={formData.fullName}
          handleChange={handleChange}
          error={errors.fullName}
        />
        <TextField
          name="email"
          label="Email Address"
          placeholder="you@example.com"
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <TextField
          name="school"
          label="Your School / University"
          placeholder="UNSW, UTS, USYD..."
          value={formData.school}
          handleChange={handleChange}
          error={errors.school}
        />
        <button
          type="submit"
          className={`mt-2 w-full rounded bg-gray-700 px-4 py-2 font-medium text-white transition duration-300 hover:bg-gray-600 ${status === "loading" ? "cursor-not-allowed" : ""}`}
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default EOIForm;
