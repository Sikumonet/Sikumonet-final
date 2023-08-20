import React, { useEffect, useState } from "react";

export default function DegreeProgrammeCardComponent(props: {
  name: string;
  institution?: string;
  imgUrl: string;
}) {
  return (
    <React.Fragment>
      <div className="bg-slate-50 shadow-lg rounded-lg p-4">
        <img
          src={props.imgUrl}
          alt={`${props.name}`}
          className="mb-2 rounded-full w-36 h-36 object-cover mx-auto"
        />
        <h3 className="text-lg font-semibold text-center mt-5">{props.name}</h3>
        {props.institution ? (
          <p className="text-gray-400 text-center mt-2">
            <i className="fa-solid fa-school mr-2"></i>
            <span className="text-slate-500 font-semibold">
              {props.institution}
            </span>
          </p>
        ) : null}
      </div>
    </React.Fragment>
  );
}
