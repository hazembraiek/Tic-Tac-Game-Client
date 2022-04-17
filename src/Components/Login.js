import axios from "axios";
import React from "react";
import Button from "./../UI/Button";
import Cookies from "universal-cookie";
import { Form, Formik } from "formik";
import Input from "../UI/Input";
import * as Yup from "yup";
function Login({ Auth, isLogin }) {
  const cookies = new Cookies();
  const LoginUser = async ({ username, password }) => {
    try {
      const Data = await axios.post(
        "https://protected-forest-69166.herokuapp.com/login",
        {
          username,
          password,
        }
      );
      console.log(Data.statusText);
      const { firstName, lastName, Token, userId } = Data.data.user;
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("password", password);
      cookies.set("Token", Token);
      cookies.set("userId", userId);
      Auth(true);
    } catch (err) {
      console.log(err.message);
    }
  };
  const validate = Yup.object().shape({
    username: Yup.string().required("user Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });
  return (
    <div className="login">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          LoginUser(values);
        }}
      >
        {(formik) => (
          <div>
            <h1>Login</h1>
            <Form>
              <Input label="User Name" name="username" type="text" />
              <Input label="Password" name="password" type="password" />
              <p className="Change" onClick={() => isLogin(false)}>
                Sign Up
              </p>
              <div className="btn">
                <Button type="submit">Login</Button>
                <Button type="reset">Reset</Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
