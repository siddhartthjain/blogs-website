import React, { useState } from "react";
import { login } from "../../../http";
import { useRouter } from "next/router";
import { setUserId } from "@/slices/userSlice";
import Cookies from "js-cookie";
import dotenv from "dotenv";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers";
dotenv.config();
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const Id= useSelector((state:RootState)=>{ return state.user.userId});
  const handleChange = (e: any) => {
    const { name, value } = e.target; // name is the name tag that you are using in <input tag> and e.target is the target feild that//is changing
    // console.log(name, value);
    setFormData({
      ...formData, // keep the old form data alive
      [name]: value, // the subscript to choose the parameter to value
    });

    // console.log("final form data is", formData);
  };
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await login({ ...formData });
      console.log("response ", response);
      if (response) {
        const userId = response.userId;
        console.log("user", userId);
        console.log("id",Id); //
        dispatch(setUserId(userId));
        console.log("id",Id);

        Cookies.set("authorizationToken", response.token);
        router.push("/Blogs");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      console.log("Not able to Login please try again");
    }
  };
  const { email, password } = formData;

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            {/* <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
            Sign In
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    id="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    id="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="/Auth/Signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
