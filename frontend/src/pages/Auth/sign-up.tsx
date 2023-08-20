import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../API/Auth/auth-api.service";
import { VIEWS } from "../../utils/routes";
import InputFieldComponent from "../../components/input-field.component";
import TopNavbarComponent from "../../components/top-navbar.component";
import FooterComponent from "../../components/footer.component";
import LoadingSpinner from "../../components/loading-spinner.component";
import ButtonComponent from "../../components/button.component";
import SelectOptionComponent from "../../components/selct-option.component";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function SignUp() {
  useScrollToTop();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const signInToPlatform = async () => {
    if (name === "") {
      toast.error("Please enter name..!!");
    } else if (email === "") {
      toast.error("Please enter email..!!");
    } else if (!checkEmail.test(email)) {
      toast.error("Please enter valid email..!!");
    } else if (password === "") {
      toast.error("Please enter password..!!");
    } else if (confirmPassword === "") {
      toast.error("Please enter confirm password..!!");
    } else if (password !== confirmPassword) {
      toast.error("Confirm password is not match..!!");
    } else {
      try {
        setLoadingSpinner(true);
        const response = await registerUser(name, email, password);
        if (response.success) {
          console.log("RESPONSE", response.data);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate(VIEWS.SIGN_IN);
        } else {
          setLoadingSpinner(false);
          toast.error(response.error);
        }
      } catch (error: any) {
        setLoadingSpinner(false);
      }
    }
  };

  const handleSignIn = () => {
    navigate(VIEWS.SIGN_IN);
  };

  return (
    <React.Fragment>
      <div className="mt-24">
        <TopNavbarComponent btnName={"Sign In"} btnAction={handleSignIn} />
        <div className="w-full max-w-xl mx-auto bg-white p-8 rounded-md shadow-md mt-28 mb-32">
          <h1 className="text-2xl font-bold mb-12 text-center">
            Create Your Account
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <InputFieldComponent
              label="Name"
              type="text"
              placeholder="John"
              value={name}
              onChange={setName}
            />
            <InputFieldComponent
              label="Email*"
              type="email"
              placeholder="johnanderson@example.com"
              value={email}
              onChange={setEmail}
            />
            <InputFieldComponent
              label="Password*"
              type="password"
              placeholder="**************"
              value={password}
              onChange={setPassword}
            />
            <InputFieldComponent
              label="Confirm Password*"
              type="password"
              placeholder="**************"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>
          <ButtonComponent
            name={"Create Account"}
            handleAction={signInToPlatform}
          />
          <p className="block text-gray-700 text-sm font-semibold mt-5 text-center">
            Already have an account?{" "}
            <Link
              to={VIEWS.SIGN_IN}
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              Login to your Account
            </Link>
          </p>
        </div>
        <FooterComponent />
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
