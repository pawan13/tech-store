import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setAdmin } from "../user/userSlice";

export const createNewAdminAuth = async (obj) => {
  try {
    //crate user auth in frirebase
    const respPending = createUserWithEmailAndPassword(
      auth,
      obj.email,
      obj.password
    );

    toast.promise(respPending, {
      pending: "Please wait ... ",
    });

    const { user } = await respPending;

    if (user?.uid) {
      //store user info in firstore
      createAdminUser(obj, user.uid);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

export const createAdminUser = async (userInfo, id) => {
  try {
    //addDoc
    await setDoc(doc(db, "users", id), userInfo);
    toast.success("New admin user has been created. You may login now!");
  } catch (error) {
    toast.error(error.message);
  }
};

export const getUserAction = (uid) => async(dispatch) =>{
  try{
    //get user infromation from user Table
    const userSnap = await getDoc(doc(db, "users", uid))

    if(userSnap.exists()){
      const user = userSnap.data()

      dispatch(setAdmin({...user, uid}))
    }
  }
  catch(error){
    console.log(error)
    toast.error(error.message)
  }
}