import React from "react";
import { Link } from "react-router-dom";
import { VIEWS } from "../utils/routes";

export default function FooterComponent() {
  return (
    <React.Fragment>
      <footer className="bg-blue-950 w-full">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Sikumonet
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
              <li>
                <Link to={VIEWS.HOME} className="mr-4 md:mr-6 ">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-50" />
          <span className="block text-sm text-gray-200 text-center">
            © 2023{" "}
            <a href="https://www.sikumonet.com/" className="hover:underline">
              Sikumonet
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </React.Fragment>
  );
}
