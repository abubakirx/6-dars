import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "../app/features/userSlice";

import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { setDoc, doc } from "firebase/firestore";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const signup = async (displayName, email, password) => {
    console.log(displayName, email, password);
    setIsPending(true);

    try {
      const req = await createUserWithEmailAndPassword(auth, email, password);

      if (!req.user) {
        throw new Error("Authentication failed");
      }

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL:
          "https://api.dicebear.com/9.x/initials/svg?seed=" + displayName,
      });

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        online: true,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
      });

      dispatch(Login(req.user));
      toast.success(`Welcome ${auth.currentUser.displayName}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { signup, isPending };
};
