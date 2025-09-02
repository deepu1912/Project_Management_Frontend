import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postRegisterData } from "../redux/feature/authRegisterSlice";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifySuccess = () => {
    toast.success("Register successfully"),
      {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: "custom-toast-container",
      };
  };

  const notifyFailure = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "custom-toast-container",
    });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const payload = {
        name: formData.firstName,
        email: formData.email,
        passwordHash: formData.password,
      };
      dispatch(postRegisterData(payload)).then((response) => {
        if (!response.payload.success) {
          notifyFailure(response.payload.message);
        } else {
          notifySuccess();
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      });
    }
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-1/2 bg-[#B7B3E6] flex flex-col justify-center items-center px-10">
        <h1 className="text-3xl font-semibold text-white mb-4 text-center">
          Plan. Collaborate. Deliver — All in One Place.
        </h1>
        <p className="text-black text-center text-base mb-6">
          Streamline your workflow and keep your team aligned <br />
          with our powerful project management platform.
        </p>
        <img
          src="src/assets/login.png"
          alt="Project Screenshot"
          className="w-[80%] rounded-lg shadow-lg"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center px-10">
        <h2 className="text-2xl font-semibold text-[#B084F9] mb-6">Sign up</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm ">
          <div className="mb-8">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B07EFF]"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-8">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B07EFF]"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-8">
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B07EFF]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-8">
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B07EFF]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-8">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B07EFF]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#B07EFF] text-white py-2 px-4 rounded-md hover:bg-[#9a6ee5]"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#B07EFF] font-medium hover:underline"
          >
            Log in here
          </Link>
        </p>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="custom-toast-container"
        />
      </div>
    </div>
  );
}
