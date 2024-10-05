import { useState } from "react";
import { MdEmail, MdVpnKey, MdArrowForward } from "react-icons/md";
import { LuListChecks } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios"; // Ensure axios is imported

export default function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");
  const [password, setPassword] = useState("");

  async function forgotpasswordHandler(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/forgotpassword',
        { email, uniqueKey, password },
        { withCredentials: true }
      );
      console.log("Response forgot:- ", response);
      toast.success("Password changed successfully.");
      navigate("/login");
    } 
    catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center">
          <LuListChecks className="h-12 w-12" />
          <h1 className="nerko-one-regular text-4xl font-bold ml-2">ListiFy</h1>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and the unique key we gave you after registration
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={forgotpasswordHandler} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 sm:text-sm border border-gray-400 rounded-md outline-none p-1"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="uniqueKey"
                className="block text-sm font-medium text-gray-700"
              >
                Unique Key
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdVpnKey
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="uniqueKey"
                  name="uniqueKey"
                  type="password"
                  required
                  className="block w-full pl-10 sm:text-sm border border-gray-400 rounded-md outline-none p-1"
                  placeholder="Enter your unique key"
                  value={uniqueKey}
                  onChange={(e) => {
                    // Allow only numeric values
                    if (/^\d*$/.test(e.target.value)) {
                      setUniqueKey(e.target.value);
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdVpnKey
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password" // Changed to password type
                  required
                  className="block w-full pl-10 sm:text-sm border border-gray-400 rounded-md outline-none p-1"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
              >
                <MdArrowForward className="mr-2 h-5 w-5" aria-hidden="true" />
                Reset Password
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}