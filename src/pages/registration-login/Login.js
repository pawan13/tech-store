import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { getUserAction } from "./userAction";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {admin}= useSelector((state)=> state.adminInfo)
 
  const [form, setForm] = useState({
    role: "admin",
  });

  console.log(admin)

  useEffect(()=>{
    admin?.uid && navigate("/dashboard")
  },[admin, navigate])

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
   try {
    e.preventDefault();

    const { email, password } = form;
  //Check auth user

  const pendingResp = signInWithEmailAndPassword(auth, email, password);

  toast.promise(pendingResp, {
    pending: "Please wait ..."
  })

  const {user} = await pendingResp;

  if(user?.uid) {
    toast.success("Logged in successfully, redirecting to dashboard")
  }

  // fetch user from users database via userAction file
    console.log(user?.id)
  dispatch(getUserAction(user?.uid))
   
   } catch (error) {
     console.log(error)
     let msg = error.message;

     if(msg.includes("auth/user-not-found")){
      msg = "wrong credentials"
     }
     toast.error(msg)
   }
  };

  const inputFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Smith@email.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      minLength: "6",
    },
  ];
  return (
    <>
      <Header />
      <main className="main">
        <Form
          className="register border p-5 shadow-lg rounded mt-5"
          onSubmit={handleOnSubmit}
        >
          <h1>Admin Login - Welcome</h1>
          <hr />
          {inputFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
          <p className="text-end mt-3">
            Forget Password? <Link to="/password-reset-request">Reset</Link>{" "}
            Now!
          </p>
        </Form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
