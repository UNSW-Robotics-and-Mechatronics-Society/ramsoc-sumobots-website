"use client";
import { useState } from "react";
import Link from "next/link";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa6";
import { appendToSheet } from "../../_utils/googlesheet";

export default function EOI() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    school: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    school: "",
  });

  const [status, setStatus] = useState("initial");

  const validateField = (name: string, value: string) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  function validateForm() {
    let valid = true;
    const newErrors = { fullName: "", email: "", school: "" };

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) valid = false;
      newErrors[key as keyof typeof newErrors] = error;
    });

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;
    setStatus("Submitting");

    // Submit form data
    const result = await appendToSheet("eoi!A:C", [[formData.fullName, formData.school, formData.email]]);
    if (!result.success) {
      alert(`Error: ${result.error}`);
      setStatus("initial");
      return;
    }
    console.log(result.data);
    setStatus("Submitted");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900 to-black p-8 shadow-lg">
        {status === "Submitted" ? (
          <>
            <h1 className="mb-3 text-center text-3xl font-semibold">
              Thank you!
            </h1>
            <p className="mb-6 text-center text-base text-gray-400">
              We&apos;ve received your EOI!
            </p>
            <p className="text-center text-base text-gray-400">
              Our team will reach out when applications open.<br />In the meantime, follow us and check out past events!
            </p>
            <div className="flex flex-col justify-center mt-6 gap-4">
              <div className="flex justify-center gap-8 h-12">
                  <Link className="h-full transition-transform transform hover:scale-110" href="https://www.instagram.com/ramsocunsw" target="_blank" aria-label="Instagram">
                    <FaInstagram size={32}></FaInstagram>
                  </Link>
                  <Link className="h-full transition-transform transform hover:scale-110" href="https://www.facebook.com/RAMSOCUNSW" target="_blank" aria-label="Facebook">
                    <FaFacebook size={32}></FaFacebook>
                  </Link>
                  <Link className="h-full transition-transform transform hover:scale-110" href="https://discord.com/invite/4dWMWAjWm9" target="_blank" aria-label="Discord">
                    <FaDiscord size={32}></FaDiscord>
                  </Link>
              </div>
              <Link className="button text-base self-center" href="/sumobots/2024" target="_blank" aria-label="Discord">
                Check Out SUMOBOTS 2024
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-center text-3xl font-semibold">
              EOI Form
            </h1>
            <p className="text-center text-base text-gray-400">
              Want to be part of the next big battle?<br />Fill this out and we&apos;ll keep you updated.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-1">
              {/* Name Field */}
              <label className="flex flex-col gap-1">
                <span className="font-normal text-base">Your Name</span>
                <input
                  type="text"
                  name="fullName"
                  className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <p className="h-4 text-sm text-red-500">
                  {errors.fullName}
                </p>
              </label>

              {/* Email Field */}
              <label  className="flex flex-col gap-1">
                <span className="font-normal text-base">Email Address</span>
                <input
                  type="text"
                  name="email"
                  className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="h-4 text-sm text-red-500">{errors.email}</p>
              </label>

              {/* School Field */}
              <label  className="flex flex-col gap-1">
                <span className="font-normal text-base">Your School / University</span>
                <input
                  type="text"
                  name="school"
                  className="w-full rounded border border-gray-700 bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="UNSW, UTS, USYD..."
                  value={formData.school}
                  onChange={handleChange}
                />
                <p className="h-4 text-sm text-red-500">{errors.school}</p>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className={`mt-2 w-full rounded bg-gray-700 px-4 py-2 font-medium text-white transition duration-300 hover:bg-gray-600 ${status === "Submitting" ? "cursor-not-allowed" : ""}`}
              >
                {status === "Submitting" ? "Submitting..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
