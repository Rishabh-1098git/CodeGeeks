import React, { useState } from "react";
import { Modal } from "antd";
import Button from "./Button";
import CreateGroup from "./CreateGroup";
import GroupsList from "./GroupsList";
import JoinGroupModal from "./JoinGroupModal";

const GroupsCard = () => {
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] =
    useState(false);
  const [isJoinGroupModalVisible, setIsJoinGroupModalVisible] = useState(false);

  const showCreateGroupModal = () => {
    setIsCreateGroupModalVisible(true);
  };

  const handleCreateGroupModalOk = () => {
    setIsCreateGroupModalVisible(false);
  };

  const handleCreateGroupModalCancel = () => {
    setIsCreateGroupModalVisible(false);
  };

  const showJoinGroupModal = () => {
    setIsJoinGroupModalVisible(true);
  };

  const handleJoinGroupModalOk = () => {
    setIsJoinGroupModalVisible(false);
  };

  const handleJoinGroupModalCancel = () => {
    setIsJoinGroupModalVisible(false);
  };

  return (
    <div
      className="p-6 rounded-lg shadow-lg text-center w-full m-auto mt-24 h-auto max-w-[90%]"
      style={{
        backgroundImage: "linear-gradient(to right, #282828 0%, #282828 100%)",
      }}
    >
      <div className="p-4 rounded-lg">
        <h2 className="text-2xl font-bold font-mono mb-4 text-slate-300">
          Groups
        </h2>
        <div className="flex justify-evenly">
          <Button text={"Create Group"} onClick={showCreateGroupModal} />
          <Button text={"Join Group"} onClick={showJoinGroupModal} />
        </div>

        {/* Create Group Modal */}
        <Modal
          className="font-mono font-bold "
          title="Create a New Group"
          visible={isCreateGroupModalVisible}
          onOk={handleCreateGroupModalOk}
          onCancel={handleCreateGroupModalCancel}
          footer={null}
        >
          <CreateGroup onClose={handleCreateGroupModalCancel} />
        </Modal>

        {/* Join Group Modal */}
        <Modal
          className="font-mono font-bold"
          title="Join an Existing Group"
          visible={isJoinGroupModalVisible}
          onOk={handleJoinGroupModalOk}
          onCancel={handleJoinGroupModalCancel}
          footer={null}
        >
          <JoinGroupModal onClose={handleJoinGroupModalCancel} />
        </Modal>

        {/* Groups List */}
        <GroupsList />
      </div>
    </div>
  );
};

export default GroupsCard;
