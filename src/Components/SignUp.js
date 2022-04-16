import axios from "axios";
import React from "react";
import { Form, Formik } from "formik";
import Cookies from "universal-cookie";
import Button from "../UI/Button";
import Input from "../UI/Input";
import * as Yup from "yup";

function SignUp({ Auth, isLogin }) {
  const cookies = new Cookies();
  const RegisterUser = async (user) => {
    const Data = await axios.post("http://localhost:8000/signup", user);
    const { firstName, lastName, username, password, Token, userId } =
      Data.data.data.user;
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    cookies.set("username", username);
    cookies.set("password", password);
    cookies.set("Token", Token);
    cookies.set("userId", userId);
    Auth(true);
  };
  const validate = Yup.object().shape({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    username: Yup.string().required("user Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  return (
    <div className="signUp">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          RegisterUser(values);
        }}
      >
        {(formik) => (
          <div>
            <h1>SignUp</h1>
            <Form>
              <Input label="First Name" name="firstName" type="text" />
              <Input label="Last Name" name="lastName" type="text" />
              <Input label="User Name" name="username" type="text" />
              <Input label="Password" name="password" type="password" />
              <p className="Change" onClick={() => isLogin(true)}>
                Login
              </p>
              <div className="btn">
                <Button type="submit">Register</Button>
                <Button>Reset</Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
