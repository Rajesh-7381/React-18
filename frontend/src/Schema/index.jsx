import * as Yup from "yup";

export const signupSchema=Yup.object({
    fname:Yup.string().min(3).max(25).required("please enter your first name!"),
    lname:Yup.string().min(3).max(25).required("please enter your Last name!"),
    uname:Yup.string().min(3).required("please enter your  name!"),
    email:Yup.string().email().required("enter your email!"),
    password:Yup.string().min(6).required("enter your password!"),
    cpassword:Yup.string().required().oneOf([Yup.ref("password"),null],"password must match!")
});