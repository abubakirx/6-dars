import { useState } from "react";
import { useDispatch } from "react-redux";
import { Login as _Login } from "../app/features/userSlice";

import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const simplifyUser = (firebaseUser) => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL,
  };
};

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    setIsPending(true);

    try {
      const req = await signInWithEmailAndPassword(auth, email, password);
      if (!req.user) {
        throw new Error("Authentication failed");
      }

      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        online: true,
      });
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          online: true,
          displayName: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL,
        },
        { merge: true }
      );

      const simple = simplifyUser(req.user);
      dispatch(_Login(simple));
      toast.success(`Welcome back 🙂 ${auth.currentUser.displayName}`);
      return simple;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending };
};
