import React from "react";

export default function RewardCardComponent(props: {
  name: string;
  image: string;
  description: string;
}) {
  return (
    <React.Fragment>
      <div className="bg-slate-100 hover:bg-slate-200 p-4 shadow-md rounded-md cursor-pointer">
        <img
          src={props.image}
          alt="Coffee"
          className="w-48 h-48 mb-4 mx-auto rounded-xl"
        />
        <h2 className="text-xl font-semibold mb-2">{props.name}</h2>
        <p>{props.description}</p>
      </div>
    </React.Fragment>
  );
}
