import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import DummySpace from '../utils/DummySpace';
import { Link, useNavigate } from 'react-router-dom';
import GetUserDetails from '../utils/GetUserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setSpaces, setUser } from '../redux/feature/userDetailSlice';
import getSpaceDetails from '../utils/getSpaceDetails';

const SpaceDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const spaces = useSelector(state=>state.userDetail.spaces)
    console.log('spaces',spaces?.data)
    useEffect(()=>{
        const fetchUser = async()=>{
            const loggedInUser= await GetUserDetails()
            // console.log(loggedInUser)
            dispatch(setUser(loggedInUser.data))
        }
        const fetchSpace= async()=>{
            const getSpaces = await getSpaceDetails()
            console.log(getSpaces)
            dispatch(setSpaces(getSpaces))
        }
        fetchUser()
        fetchSpace()
      },[])

  return (
    <div className="p-5 w-full h-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-[6rem] p-1 flex items-center gap-2 bg-white">
            <p className="text-sm">Status</p>
            <div className="flex items-center gap-2">
              <p>All</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
          <div className="w-[6rem] p-1 flex items-center gap-2 bg-white">
            <p className="text-sm">Sort</p>
            <div className="flex items-center gap-2">
              <p>A-Z</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
        <Link to={'/home/createSpace'} className="flex text-gray-600 py-1 px-.5 items-center gap-1 w-28 bg-white border-2 border-gray-200">
          <div className="border-r-2 border-gray-200">
            <GoPlus size={20} />
          </div>
          <p className="text-sm">Create Space</p>
        </Link>
      </div>

      <div className="w-full h-full mt-3">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-white">
              <th className="text-left text-gray-500 px-4 py-2">
                Space Name
              </th>
              <th className="text-left text-gray-500 px-4 py-2">Owner</th>
              <th className="text-left text-gray-500 px-4 py-2">Member</th>
            </tr>
          </thead>

          <tbody>
            {spaces?.data.map((space) => (
                
              <React.Fragment key={space._id}>
                {/* 🟦 Project Row with Gray Background */}
                <tr
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200"
                   onClick={()=>navigate(`/home/projectDashboard/${space._id}`)}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {space.spaceName}
                  </td>
                  <td className="px-4 py-3">
                    {space?.ownerId?.name}
                  </td>
                  <td className="px-4 py-3 space-x-2">
                    {space.members.map((member) => (
                      <span
                        key={member}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {member.name}
                      </span>
                    ))}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SpaceDashboard