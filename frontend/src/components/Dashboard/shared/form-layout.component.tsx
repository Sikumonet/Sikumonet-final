import React from "react";
import ButtonComponent from "../../button.component";

export default function FormLayoutComponent(props: {
  children: any;
  btnName: string;
  formTitle: string;
  btnAction: any;
}) {
  return (
    <React.Fragment>
      <div className="rounded-xl bg-slate-200 px-10 py-14 mt-16">
        <h1 className="text-xl text-slate-700 font-bold mb-10">
          {props.formTitle}
        </h1>
        <div className="grid grid-cols-3 gap-4">{props.children}</div>
        <div className="w-full flex flex-row justify-start items-center mt-10">
          <div className="w-1/5">
            <ButtonComponent
              name={props.btnName}
              handleAction={props.btnAction}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
