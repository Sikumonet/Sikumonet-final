import React, { useState } from "react";

export default function SelectOptionComponent(props: {
  label: string;
  selectedOption: string;
  options: any;
  handleOnChange: any;
  disabled: boolean;
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="userRole"
      >
        {props.label}
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        id="gender"
        value={props.selectedOption}
        onChange={(e: any) => props.handleOnChange(e.target.value)}
      >
        <option value="" disabled>
          Select a Option
        </option>
        {props.options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
