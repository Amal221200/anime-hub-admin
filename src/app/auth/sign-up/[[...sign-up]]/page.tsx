import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page for admin users.",
};


const SignUpPage = () => {

  return <SignUp />
}

export default SignUpPage