"use client"

import useSWR from "swr";

// API fetcher function

/**
 * Custom hook to fetch data from Google Sheets using a specified range and refresh interval.
 *
 * @param {string} range - The range of cells to fetch from the Google Sheets.
 * @param {number} refreshInterval - The interval in milliseconds to refresh the data.
 * @returns {Array} return.data - The fetched data from the Google Sheets.
 * @returns {boolean} return.isLoading - Indicates if the data is currently being loaded.
 * @returns {boolean} return.isError - Indicates if there was an error fetching the data.
 */
export const useGSheetsData = (range: string, refreshInterval: number) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/sheets?range=${range}`, fetcher, {
    refreshInterval: refreshInterval,
  });

  return {
    data: data?.data || [],
    isLoading,
    isError: error,
  };
}

/**
 * Utility function to append data to a Google Sheet using the existing API.
 * @param {string} range - The target sheet and range (e.g., "Sheet1!A:C").
 * @param {string[][]} values - A 2D array of values to append.
 * @returns {Promise<object>} - API response or error message.
 */
export async function appendToSheet(range: string, values: string[][]): Promise<{ success: boolean; error?: string; data?: unknown }> {
  try {
    if (!range || !Array.isArray(values) || values.length === 0) {
      throw new Error("Invalid input: range and values must be provided.");
    }

    const response = await fetch("/api/sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ range, values }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to append data");
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}