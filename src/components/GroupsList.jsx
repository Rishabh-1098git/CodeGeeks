import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";
import GroupIcon from "../../src/assets/groupIcon1.png";

const GroupsList = () => {
  const [user] = useAuthState(auth);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      if (!user) return;

      try {
        const groupsQuery = query(
          collection(db, "groups"),
          where("members", "array-contains", user.uid)
        );
        const groupDocs = await getDocs(groupsQuery);

        const groupsData = groupDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(groupsData);
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups: ", error);
      }
    };

    fetchGroups();
  }, [user]);

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-4 justify-center">
        {groups.map((group) => (
          <div
            key={group.id}
            className="group border-2 border-gray-700 p-4 rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-black-bg hover:border-gray-400 transition duration-300 flex flex-col items-center cursor-pointer"
            onClick={() => handleGroupClick(group.id)}
          >
            <Avatar
              size={64}
              src={group.avatar || GroupIcon} // Use the group's avatar URL or a default icon
              alt={group.name}
              className="mb-4"
            />
            <h3 className="font-mono text-2xl mb-2 text-sd-medium text-center">
              {group.name}
            </h3>
            <p className="text-sd-easy mb-2 text-center font-mono text-xl">
              {group.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsList;
