import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { isPending, Logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div>
      Navbar- {user.displayName}
      <img src={user.photoURL} alt="" width={200} className="rounded-full" />
      {!isPending && (
        <button onClick={Logout} className="btn btn-ghost">
          LogOut
        </button>
      )}
      {isPending && (
        <button className="btn btn-ghost disabled:disabled">LogOut</button>
      )}
    </div>
  );
}

export default Navbar;
