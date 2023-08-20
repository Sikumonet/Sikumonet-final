import React from "react";

export default function InputTextAreaComponent(props: {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: any;
  disabled?: boolean;
}) {
  return (
    <React.Fragment>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="textareaField"
        >
          {props.label}
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          name="textareaField"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          disabled={props.disabled}
          rows={10}
        />
      </div>
    </React.Fragment>
  );
}
