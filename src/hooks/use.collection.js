import { collection, onSnapshot } from "firebase/firestore";
import { use, useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useCollection = (colName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, colName), (snapshot) => {
      let data = [];
      snapshot.docs.forEach((user) => {
        data.push({ ...user.data(), id: user.id });
      });
      setData(data);
    });
    return () => unsubscribe();
  }, []);

  return { data };
};
