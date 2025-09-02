import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import memberIcon from "../assets/Ellipse 3.png";
import { useDispatch, useSelector } from "react-redux";
import GetUserDetails from "../utils/GetUserDetails";
import { setUser } from "../redux/feature/userDetailSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector(state => state.userDetail.user)
  console.log(userData)
  useEffect(()=>{
    const fetchUser = async()=>{
        const loggedInUser= await GetUserDetails()
        // console.log(loggedInUser)
        dispatch(setUser(loggedInUser.data))
    }
    fetchUser()
  },[])

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white border-b shadow-sm z-50 flex items-center px-[32px] py-[16px] space-x-[32px]">
        <div className="relative flex-shrink-0 mr-8">
          <div className="text-xl font-semibold">Logo / Project Name</div>
        </div>

        <div className="flex-shrink-0 text-2xl font-semibold">Spaces</div>
        <div className="flex-1" />
        <div className="relative">
          <button className="w-[225px] h-[38px] bg-gray-100 border border-gray-200 rounded-md flex items-center justify-between px-[12px]">
            <span className="text-sm text-gray-600">Space X</span>
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for tasks and etc…"
            className="w-[226px] h-[42px] bg-gray-100 border border-gray-200 rounded-[30px] px-4 pl-10 text-sm text-gray-700 focus:outline-none"
          />
        </div>

        <button
          className="w-[40px] h-[40px] text-black rounded-full flex items-center justify-center text-xl"
          onClick={() => navigate("/createSpace")}
        >
          +
        </button>

        <div className="flex items-center space-x-[12px]">
          <div className="text-right">
            <div className="text-sm font-medium">{userData?.name}</div>
            {/* <div className="text-xs text-gray-500">Developer</div> */}
          </div>
          <div className="w-[40px] h-[40px] bg-gray-200 rounded-full">
            <img
              src={memberIcon}
              alt="member Icon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
