import Input from "../../common/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { SignupUser } from "../../services/signupService";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUsersActions,useUsers } from "../../userProvider/UserProviders";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirmation: "",
};
const SignupForm = () => {
  const user=useUsers()
  const query=useQuery()
  const redirect=query.get("redirect")||"/"
  console.log(redirect);
  let navigate=useNavigate()
  const setAuth=useUsersActions()
  const[error,setError]=useState(null)
  useEffect(()=>{
    if(user) navigate(redirect)
  },[redirect,user])
  const onSubmit =async (values) => {
    const {name,email,password,phoneNumber }=values
    const userData={
      name,email,password,phoneNumber
    }
    try {
     const {data}=await SignupUser(userData)
     setError(null)
     toast.success(`${data.name} is successfully singed up`)
     if(redirect==="checkout")
     navigate(`/checkout`)
     else
     navigate("/")
     setAuth(data)
     localStorage.setItem("login",JSON.stringify(data))
    } catch (error) {
      if(error.response && error.response.data.message){
      setError(error.response.data.message)
      toast.error(`${error.response.data.message}`)
    }
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required").min(6, "is not valid"),
    email: Yup.string()
      .email("email is required")
      .required("email is required"),
    password: Yup.string().required("password is required"),
    phoneNumber: Yup.string()
      .required("phone number is required")
      .matches(/^[0-9]{11}$/, "invalid phone number"),
    passwordConfirmation: Yup.string()
      .required("Password Confirmation is Required")
      .oneOf([Yup.ref("password"), null], "passwords must matched"),
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  return (
    <div className="formContainer">
      <h1>Signup Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Email" name="email" formik={formik} type="email" />
        <Input label="Phone number" name="phoneNumber" formik={formik} type="tel" />
        <Input
          label="Password"
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="Password Confirmation"
          name="passwordConfirmation"
          formik={formik}
          type="password"
        />
        <button type="submit" disabled={!formik.isValid} className="btn primary" style={{width:"100%"}}>
          Signup
        </button>
        {error && <p style={{color:"red"}}>{error}</p>}
        <Link to="/login"><p>want to login?</p></Link>
      </form>
    </div>
  );
};

export default SignupForm;
