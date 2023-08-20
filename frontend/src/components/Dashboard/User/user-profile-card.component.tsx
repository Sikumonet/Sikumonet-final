import React from "react";

export default function UserProfileCardComponent(props: {
  name: string;
  value: number;
  icon: string;
}) {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center p-4 bg-blue-100 hover:bg-blue-50 rounded-md shadow-sm">
        <i
          className={`${props.icon} text-2xl font-bold text-slate-800 text-center`}
        ></i>
        <div className="ml-3">
          <p className="text-2xl font-bold text-slate-800">{props.value}</p>
          <p className="text-sm font-semibold text-slate-700">{props.name}</p>
        </div>
      </div>
    </React.Fragment>
  );
}
