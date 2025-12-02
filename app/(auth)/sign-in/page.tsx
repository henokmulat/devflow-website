"use client";
import AuthForm from "@/components/forms/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validations";
import React from "react";
import { success } from "zod";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
