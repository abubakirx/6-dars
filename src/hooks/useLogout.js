import { useState } from "react";
import { useDispatch } from "react-redux";
import { Logout as logoutAction } from "../app/features/userSlice";

import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const Logout = async () => {
    setIsPending(true);

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        online: false,
        lastSeen: new Date(),
      });
      await signOut(auth);

      dispatch(logoutAction());
      toast.success(`See you `);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { Logout, isPending };
};
