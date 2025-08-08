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
        <button
          onClick={Logout}
          className={`  px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-200
    ${
      isPending
        ? "bg-red-400 text-white cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:scale-105"
    }`}
        >
          {isPending ? "Chiqilmoqda..." : "Log Out"}
        </button>
      )}
      {isPending && (
        <button
          disabled
          className="px-6 py-2 rounded-full font-semibold bg-gray-400 text-white cursor-not-allowed"
        >
          Chiqilmoqda...
        </button>
      )}
    </div>
  );
}

export default Navbar;
