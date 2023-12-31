import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3"
        />
        <button className="bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-50 p-3">
          Sign Up
        </button>
      </form>
      <div className="flex mt-5 gap-3">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-600">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
