import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./Layout/MainLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { Home, Signup, Login, Profile, SingleImage } from "./pages";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { Login as loginAction, authReady } from "./app/features/userSlice";

function App() {
  const { user, isAuthReady } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
        { path: "/SingleImage/:id", element: <SingleImage /> }, //
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

  onAuthStateChanged(auth, (user) => {
    if (user?.displayName && user?.photoURL) {
      dispatch(loginAction(user));
    }
    dispatch(authReady());
  });

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}
export default App;
