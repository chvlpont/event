import React, { useState, useEffect } from "react";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { useAuth } from "@clerk/nextjs";
import {
  saveAdminToFirestore,
  removeAdminFromFirestore,
} from "../../../adminUtils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserList() {
  const [adminUsernames, setAdminUsernames] = useState([]);
  const [nonAdminUsernames, setNonAdminUsernames] = useState([]);
  const [showAdmins, setShowAdmins] = useState(false);
  const currentUser = useAuth();

  useEffect(() => {
    fetchData();
  }, [showAdmins]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/userData");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAdminUsernames(data.adminUsernames);
      setNonAdminUsernames(data.nonAdminUsernames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePromote = async (userId) => {
    try {
      console.log("Promoting user with userId:", userId);
      await saveAdminToFirestore(userId);

      // Update the state after successful promotion
      const promotedUser = nonAdminUsernames.find(
        (user) => user.userId === userId
      );
      setAdminUsernames([...adminUsernames, promotedUser]);
      setNonAdminUsernames(
        nonAdminUsernames.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error("Error promoting user to admin:", error);
    }
  };

  const handleDemote = async (userId) => {
    try {
      if (userId === currentUser.userId) {
        console.error("You cannot demote yourself.");
        return;
      }
      console.log("Demoting user with userId:", userId);
      await removeAdminFromFirestore(userId);

      // Update the state after successful demotion
      const demotedUser = adminUsernames.find((user) => user.userId === userId);
      setNonAdminUsernames([...nonAdminUsernames, demotedUser]);
      setAdminUsernames(
        adminUsernames.filter((user) => user.userId !== userId)
      );
    } catch (error) {
      console.error("Error demoting user:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={() => setShowAdmins(false)}
          className={`px-4 py-2 rounded-l ${
            !showAdmins ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          Regular
        </button>
        <button
          onClick={() => setShowAdmins(true)}
          className={`px-4 py-2 rounded-r ${
            showAdmins ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
          }`}
        >
          Admins
        </button>
      </div>
      <div className="bg-gray-800 rounded-md">
        <div
          className="grid p-2 text-white border-b border-gray-700"
          style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr auto" }}
        >
          <p className="pl-4 text-blue-500 font-semibold">User</p>
          <p className="text-blue-500 font-semibold pl-2">Role</p>
          <p className="text-left pl-5 text-blue-500 font-semibold">
            Created At
          </p>
          <p className="text-left pl-7 text-blue-500 font-semibold">
            Last Login
          </p>
          <p className="text-blue-500 font-semibold">Actions</p>
        </div>
        {(showAdmins ? adminUsernames : nonAdminUsernames).map(
          (user, index) => (
            <div
              key={index}
              className={`grid p-2 items-center ${
                index <
                (showAdmins ? adminUsernames : nonAdminUsernames).length - 1
                  ? "border-b border-gray-700"
                  : ""
              }`}
              style={{
                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                gridGap: "1rem",
              }}
            >
              <p className="font-bold text-lg pl-4">{user.username}</p>
              <p>{showAdmins ? "Admin" : "Regular"}</p>
              <p>{user.createdAt}</p>
              <p>{user.lastSignInAt}</p>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <IoEllipsisVerticalOutline />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 rounded p-2 shadow-2xl">
                    {showAdmins && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleDemote(user.userId)}
                      >
                        Demote
                      </DropdownMenuItem>
                    )}
                    {!showAdmins && (
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handlePromote(user.userId)}
                      >
                        Promote
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default UserList;
