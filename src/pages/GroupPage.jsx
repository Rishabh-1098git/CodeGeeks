import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { Avatar } from "antd";
import AddMemberModal from "../components/AddMemberModal";
import { PlusOutlined } from "@ant-design/icons";
import { IoIosRemoveCircle } from "react-icons/io";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "../components/Chat";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

// Function to determine the medal based on rank
const getMedal = (rank) => {
  switch (rank) {
    case 1:
      return "🥇"; // Gold medal
    case 2:
      return "🥈"; // Silver medal
    case 3:
      return "🥉"; // Bronze medal
    default:
      return "";
  }
};

const GroupPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [user] = useAuthState(auth); // Current authenticated user

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupDoc = await getDoc(doc(db, "groups", groupId));
        const groupData = groupDoc.data();
        setGroup(groupData);

        if (groupData) {
          const membersData = await Promise.all(
            groupData.members.map(async (memberId) => {
              const memberDoc = await getDoc(doc(db, "users", memberId));
              const memberData = memberDoc.data();
              return {
                ...memberData,
                id: memberId,
                avatar: memberData.leetcodeData?.profile?.avatar || "",
                contestRating:
                  memberData.leetcodeData?.contest?.contestRating || NaN,
              };
            })
          );
          setMembers(membersData);
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleAddMemberClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRemove = async (memberId) => {
    if (!group) return;

    try {
      // Remove member from the group's members array
      await updateDoc(doc(db, "groups", groupId), {
        members: arrayRemove(memberId),
      });

      // Update the members state
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
    } catch (error) {
      console.error("Error removing member: ", error);
    }
  };

  const handleMemberAdded = async (newMemberId) => {
    try {
      const memberDoc = await getDoc(doc(db, "users", newMemberId));
      const memberData = memberDoc.data();
      const newMember = {
        ...memberData,
        id: newMemberId,
        avatar: memberData.leetcodeData?.profile?.avatar || "",
        contestRating: memberData.leetcodeData?.contest?.contestRating || NaN,
      };

      setMembers((prevMembers) => [...prevMembers, newMember]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding member: ", error);
    }
  };

  const handleChatClick = () => {
    console.log("Chat Clicked!!!");
    setIsChatVisible(true);
  };

  const handleBackClick = () => {
    console.log("Back Clicked!!!");
    setIsChatVisible(false);
  };

  return (
    <div className="p-10 bg-black-bg bg-opacity-90 min-h-screen">
      {isChatVisible ? (
        <div
          className="bg-custom-gradient h-[80%] mt-12 "
          onClick={() => console.log("Cilcked baby")}
        >
          <button
            className="bg-sd-medium text-black p-2 rounded-lg font-mono font-bold mb-4 mt-3 ml-2 z-50 relative "
            onClick={handleBackClick}
          >
            Back
          </button>

          <Chat
            handleBackClick={handleBackClick}
            setIsChatVisible={setIsChatVisible}
          />
        </div>
      ) : (
        <>
          {/* Group Info Section */}
          {group && (
            <div className="mb-10 mt-24 p-4 bg-custom-gradient shadow-lg rounded-lg">
              <div className="flex lg:justify-between">
                <h2 className="text-3xl font-mono text-gray-200 mb-4">
                  <Avatar
                    size={40}
                    src={group.avatar}
                    alt={group.name}
                    className="mb-2 text-xl mr-2"
                  />
                  {group.name}
                </h2>
                <button
                  className="ml-10 bg-sd-medium h-10 w-20 rounded-3xl"
                  onClick={handleChatClick}
                >
                  Chat
                </button>
              </div>
              <p className="text-lg text-sd-easy mb-4 font-mono">
                {group.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-2 shadow-lg p-2 rounded-lg"
                  >
                    <Avatar
                      size={40}
                      src={member.avatar}
                      alt={member.name}
                      className="mb-2 text-xl"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-200 font-mono text-xl">
                        {member.name}
                      </span>
                      {group.createdBy === member.id && (
                        <span className="text-sm text-sd-medium font-mono font-bold">
                          Admin
                        </span>
                      )}
                      {group.createdBy === user.uid &&
                        group.createdBy !== member.id && (
                          <span
                            className="text-lg text-sd-hard font-mono font-bold cursor-pointer"
                            onClick={() => handleRemove(member.id)}
                          >
                            <IoIosRemoveCircle />
                          </span>
                        )}
                    </div>
                  </div>
                ))}
                {group.createdBy === user.uid && (
                  <div
                    className="flex items-center justify-center shadow-lg p-2 rounded-lg transition bg-sd-medium duration-300 cursor-pointer"
                    onClick={handleAddMemberClick}
                    title="Add Member"
                  >
                    <PlusOutlined className="text-2xl text-black" />
                    <span className="ml-2 text-black font-mono font-bold">
                      Add Member
                    </span>
                  </div>
                )}
              </div>
              <div className="bg-custom-gradient shadow-lg rounded-lg p-4">
                <h2 className="text-3xl font-mono text-gray-200 mb-4">
                  Leaderboard
                </h2>
                <ul className="list-none">
                  {members
                    .sort((a, b) => {
                      if (isNaN(a.contestRating)) return 1;
                      if (isNaN(b.contestRating)) return -1;
                      return b.contestRating - a.contestRating;
                    })
                    .map((member, index) => (
                      <li key={index} className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2 text-gray-300">
                            {getMedal(index + 1) || `${index + 1}`}
                          </span>
                          <Avatar
                            size={48}
                            src={member.avatar}
                            alt={member.name}
                            className="mr-2"
                          />
                          <div className="flex flex-col">
                            <span className="text-gray-200 font-mono text-xl">
                              {member.name}
                            </span>
                            <span className="text-sd-hard font-mono text-lg mt-1">
                              Contest Rating:{" "}
                              {isNaN(member.contestRating)
                                ? "N/A"
                                : Math.floor(member.contestRating)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          <AddMemberModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            groupId={groupId}
            onMemberAdded={handleMemberAdded}
          />
        </>
      )}
    </div>
  );
};

export default GroupPage;
