import style from "./login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/input";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/loginService";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useUsers, useUsersActions } from "../../userProvider/UserProviders";
import { useQuery } from "../../hooks/useQuery";
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is required"),
});
const Login = () => {
  const user=useUsers();
  const query=useQuery()
  const redirect=query.get("redirect")||"/"
  const setAuth=useUsersActions()
  let navigate=useNavigate()
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(user) navigate(redirect)
  },[redirect,user])
  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setError(data);
      toast.success(`${data.name} is successfully login`);
     setAuth(data)
      localStorage.setItem("login",JSON.stringify(data))
      navigate(redirect)
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        toast.error(`${error.response.data.message}`);
      }
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <form onSubmit={formik.handleSubmit} className={style.loginForm}>
      <Input type="email" label="email" name="email" formik={formik} />
      <Input type="password" label="password" name="password" formik={formik} />
      <button type="submit" disabled={!formik.isValid} className="btn primary">
        Login
      </button>
      {error && <p>{error}</p>}
      <Link to="/signup">
        <p>already signup?</p>
      </Link>
    </form>
  );
};

export default Login;
