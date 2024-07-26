import React from "react";
import Header from "../components/Header/Header";
import SignUpSignin from "../components/SignInSignUp.jsx/SignUpSignIn";
function SignUp() {
  return (
    <div>
      <Header />
      <div className="flex justify-center h-screen items-center ">
        <SignUpSignin />
      </div>
    </div>
  );
}

export default SignUp;
