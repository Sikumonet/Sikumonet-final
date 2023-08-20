import React, { useEffect, useState } from "react";

export default function InstitutionCardComponent(props: {
  name: string;
  location: string;
  imgUrl: string;
}) {
  return (
    <React.Fragment>
      <div className="bg-slate-50 shadow-lg rounded-lg p-4 h-72">
        <img
          src={props.imgUrl}
          alt={`${props.name}`}
          className="mb-2 rounded-full w-36 h-36 object-cover mx-auto"
        />
        <h3 className="text-lg font-semibold text-center">{props.name}</h3>
        <p className="text-gray-400 text-center mt-2">
          <i className="fa-solid fa-location-dot"></i>{" "}
          <span className="text-slate-500 font-semibold">{props.location}</span>
        </p>
      </div>
    </React.Fragment>
  );
}
