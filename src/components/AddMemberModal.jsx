import React, { useState } from "react";
import { Modal, Input, Button, Form, notification } from "antd";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const AddMemberModal = ({ visible, onClose, groupId, onMemberAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userExists, setUserExists] = useState(false);

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setEmail(email);

    try {
      // Query Firestore to find the user by email
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userDocs = await getDocs(usersQuery);
      setUserExists(!userDocs.empty);
    } catch (error) {
      console.error("Error checking user existence: ", error);
    }
  };

  const handleAddMember = async () => {
    if (!userExists) {
      notification.error({
        message: "User Not Found",
        description:
          "The email provided does not correspond to a user in the database.",
      });
      return;
    }

    setLoading(true);
    try {
      // Query Firestore to find the user by email
      const usersQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userDocs = await getDocs(usersQuery);
      if (userDocs.empty) {
        throw new Error("User not found in database");
      }

      const user = userDocs.docs[0].data();
      const userId = userDocs.docs[0].id; // Get the user document ID

      // Update Firestore with new member
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(userId), // Add only the user ID to the group members
      });

      // Notify parent component of the new member
      onMemberAdded(userId);

      form.resetFields();
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error("Error adding member: ", error);
      notification.error({
        message: "Error",
        description: "There was an error adding the member.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Member by Email"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Member Email"
          name="memberEmail"
          rules={[{ required: true, message: "Please enter the member email" }]}
        >
          <Input onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleAddMember} loading={loading}>
            Add Member
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberModal;
