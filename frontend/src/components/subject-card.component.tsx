import React, { useEffect, useState } from "react";
import { deleteSingleLibrary } from "../API/Library/library-api.service";
import LoadingSpinner from "./loading-spinner.component";

export default function SubjectsCardComponent(props: {
  name: string;
  imgUrl: string;
  libraryActions?: boolean;
}) {
  return (
    <React.Fragment>
      <div className="bg-slate-50 shadow-lg rounded-lg p-4">
        <img
          src={props.imgUrl}
          alt={`${props.name}`}
          className="mb-2 rounded-full w-36 h-36 object-cover mx-auto"
        />
        <p className="text-lg font-semibold text-center text-gray-400 mt-4">
          <i className="fa-solid fa-shapes mr-2"></i>
          <span className="text-slate-500 font-semibold">{props.name}</span>
        </p>
      </div>
    </React.Fragment>
  );
}
