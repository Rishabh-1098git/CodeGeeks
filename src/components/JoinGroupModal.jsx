import React, { useState } from "react";
import { Modal, Input, Button, Form, notification } from "antd";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const JoinGroupModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupExists, setGroupExists] = useState(false);

  const handleGroupNameChange = async (e) => {
    const name = e.target.value.trim();
    setGroupName(name);

    if (name.length === 0) {
      setGroupExists(false);
      return;
    }

    try {
      const groupsCollection = collection(db, "groups");
      const groupQuery = query(groupsCollection, where("name", "==", name));
      const querySnapshot = await getDocs(groupQuery);

      setGroupExists(!querySnapshot.empty);
    } catch (error) {
      console.error("Error checking group existence: ", error);
    }
  };

  const handleJoinGroup = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      notification.error({
        message: "Not Authenticated",
        description: "You need to be logged in to join a group.",
      });
      return;
    }

    if (!groupExists) {
      notification.error({
        message: "Group Not Found",
        description: "The group with the specified name does not exist.",
      });
      return;
    }

    setLoading(true);
    try {
      const userId = user.uid;
      const groupsCollection = collection(db, "groups");
      const groupQuery = query(
        groupsCollection,
        where("name", "==", groupName)
      );
      const querySnapshot = await getDocs(groupQuery);

      if (querySnapshot.empty) {
        notification.error({
          message: "Group Not Found",
          description: "The group with the specified name does not exist.",
        });
        return;
      }

      const groupDoc = querySnapshot.docs[0];
      const groupRef = groupDoc.ref;

      // Add user to the group
      await updateDoc(groupRef, {
        members: arrayUnion(userId),
      });

      notification.success({
        message: "Success",
        description: "You have successfully joined the group.",
      });

      form.resetFields();
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error("Error joining group: ", error);
      notification.error({
        message: "Error",
        description: "There was an error joining the group.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Group Name"
        name="groupName"
        rules={[{ required: true, message: "Please enter the group name" }]}
      >
        <Input onChange={handleGroupNameChange} />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleJoinGroup}
          loading={loading}
          className="bg-sd-medium font-mono text-black font-bold"
        >
          Join Group
        </Button>
      </Form.Item>
    </Form>
  );
};

export default JoinGroupModal;
