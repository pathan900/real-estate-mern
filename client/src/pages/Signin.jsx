import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
        return;
      }
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3"
          onChange={handleOnChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3"
          onChange={handleOnChange}
        />
        <button className="bg-slate-700 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-50 p-3">
          {loading ? "Wait..." : "Sign In"}
        </button>
      </form>
      <div className="flex mt-5 gap-3">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {<p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default SignIn;
