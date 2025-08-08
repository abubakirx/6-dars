import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import MainLayout from "./Layout/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { Home, Signup, Login, Profile, SingleImage } from "./pages";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { Login as loginAction, authReady } from "./app/features/userSlice";

function App() {
  const { user, isAuthReady } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.displayName && user?.photoURL) {
        dispatch(loginAction(user));
      }
      dispatch(authReady());
    });

    return () => unsubscribe(); 
  }, [dispatch]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/Profile",
          element: <Profile />,
        },
        { path: "/SingleImage/:id", element: <SingleImage /> },
      ],
    },
    {
      path: "/Login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/Signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
