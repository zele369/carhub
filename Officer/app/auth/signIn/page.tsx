"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";

const LoginSignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const email = useRef("")
  const password = useRef("")

  const handleLogin = async () =>{
    const res = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(res);
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <Image
          src="/logo.svg"
          alt="logo"
          width={118}
          height={18}
          className="object-between mx-3 my-5"
        />

        {/* Slide Controls */}
        <div className="relative mt-8 h-12 w-full rounded-lg border border-gray-300 overflow-hidden">
          <div
            className={`absolute h-full w-1/2 bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] rounded-lg transition-transform duration-700 ease-in-out ${
              isLogin ? "transform translate-x-0" : "transform translate-x-full"
            }`}
          ></div>
          <label
            className={`absolute h-full w-1/2 flex items-center justify-center text-lg font-medium cursor-pointer z-10 ${
              isLogin ? "text-white" : "text-black"
            }`}
          >
            Login
          </label>
        </div>

        {/* Form Container */}
        <div className="overflow-hidden">
          <div
            className={`flex w-[200%] transition-transform duration-700 ease-in-out ${
              isLogin ? "transform translate-x-0" : "transform -translate-x-1/2"
            }`}
          >
            {/* Login Form */}
            <form className="w-1/2 p-4">
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => email.current = e.target.value}
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  onChange={(e) => password.current = e.target.value}
                />
              </div>
              <div className="mt-2 text-right">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full p-3 bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] text-white rounded-lg relative overflow-hidden"
                  onClick={handleLogin}
                >
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#004080] to-[#0073e6] opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;
