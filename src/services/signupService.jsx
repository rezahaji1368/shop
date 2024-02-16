import http from "./httpServices";
export const SignupUser=(data)=>{
  return http.post("/user/register",data)
}