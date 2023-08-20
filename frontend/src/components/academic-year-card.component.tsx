import React, { useEffect, useState } from "react";
import { getYearString } from "../utils/year-string";

export default function AcademicYearCardComponent(props: {
  name: string;
  yearValue: number;
}) {
  return (
    <React.Fragment>
      <div className="cursor-pointer flex flex-col justify-center items-center h-48 w-48 rounded-xl text-center bg-blue-500 hover:bg-blue-700">
        <h1 className="text-slate-100 text-4xl font-bold">
          {getYearString(props.yearValue)}
        </h1>
        <p className="text-slate-200 text-mf font-semibold mt-5">
          {props.name}
        </p>
      </div>
    </React.Fragment>
  );
}
