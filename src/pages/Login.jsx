import { Link } from "react-router-dom";
import FormInput from "../components/formInput";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const { isPending, login } = useLogin();

  const handleSubmit = async (e) => {
    // async qilib oldik
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login(email, password); // login async, kutamiz
      // agar kerak bo'lsa shu yerda redirect qo'shish mumkin
    } catch (err) {
      // xatolar useLogin ichida toast bilan ko'rsatiladi, bu yerda qo'shimcha ishlov bo'lishi mumkin
      console.error("Login failed:", err);
    }
  };

  return (
    <main>
      <div className="registration hidden lg:flex h-full grow"></div>
      <div className="fixed top-0 left-0 bottom-0 w-full bg-black/50  lg:hidden z-10 "></div>
      <div className="registration grow lg:bg-none grid place-items-center">
        <div className="relative z-20 text-white lg:text-black">
          <h2 className="text-3xl mb-5">Login</h2>
          <form onSubmit={handleSubmit} className="w-96">
            <FormInput
              label="Email"
              name="email"
              type="email"
              autoComplete="username"
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />

            <div className="mt-10 flex justify-between">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isPending}
              >
                {isPending ? "Kutilyapti..." : "Login"}
              </button>
              <button type="button" className="btn btn-primary">
                Google
              </button>
            </div>
          </form>
          <div className="mt-5 text-center ">
            <p>
              If you don't have an account, please{" "}
              <Link className="link link-primary" to="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Login;
