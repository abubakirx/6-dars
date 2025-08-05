import { Link } from "react-router-dom";
import FormInput from "../components/formInput";
import { useSignup } from "../hooks/useSignup";
function Signup() {
  const { isPending, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const displayName = formData.get("displayName");
    const email = formData.get("email");
    const password = formData.get("password");

    await signup(displayName, email, password);
  };
  return (
    <main>
      <div className="registration hidden lg:flex h-full grow"></div>
      <div className="fixed top-0 left-0 bottom-0 w-full bg-black/50  lg:hidden z-10"></div>
      <div className="registration grow lg:bg-none grid place-items-center">
        <div className="relative z-20 text-white lg:text-black">
          <h2 className="text-3xl mb-5 text-white lg:text-black">Signup</h2>
          <form onSubmit={handleSubmit} className="w-96">
            <FormInput label="displayName" name="displayName" type="text" />
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />
            <FormInput
              label="Repeat Password"
              name="repeatPassword"
              type="password"
            />

            <div className="mt-10 flex justify-between">
              {isPending && (
                <button className="btn btn-primary" disabled>
                  Loading...
                </button>
              )}

              {!isPending && (
                <button className="btn btn-primary">Signup</button>
              )}
              {!isPending && (
                <button className="btn btn-primary">Google</button>
              )}
            </div>
          </form>
          <div className="mt-5 text-center ">
            <p>
              If you have an account, please
              <Link className="link link-primary" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Signup;
