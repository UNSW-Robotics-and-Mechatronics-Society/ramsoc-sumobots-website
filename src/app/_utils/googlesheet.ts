"use server";

import { SUMOBOTS_WORKER_SITE_URL } from "../constants";

/**
 * Utility function to append data to a Google Sheet using the existing API.
 * @param {string} range - The target sheet and range (e.g., "Sheet1!A:C").
 * @param {string[][]} values - A 2D array of values to append.
 * @returns {Promise<object>} - API response or error message.
 */
export async function appendToSheet(
  range: string,
  values: string[][],
  recaptchaToken: string,
): Promise<{ success: boolean; error?: string; data?: unknown }> {
  try {
    if (
      !range ||
      !Array.isArray(values) ||
      values.length === 0 ||
      !recaptchaToken
    ) {
      throw new Error("Invalid input: range and values must be provided.");
    }

    const response = await fetch(
      `${SUMOBOTS_WORKER_SITE_URL}/api/sheets/append`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SUMOBOTS_WORKER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: "eoi",
          values: values,
          recaptchaToken,
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return { success: true, data: data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
