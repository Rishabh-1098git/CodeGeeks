import React, { useState } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Input, Form, Upload, Progress } from "antd";
import Button from "./Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";
import defaultAvatar from "../assets/groupIcon1.png";

const CreateGroup = ({ onClose }) => {
  const [user] = useAuthState(auth);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCreateGroup = async () => {
    if (!groupName) return;

    try {
      let avatarUrl = defaultAvatar;

      if (avatarFile) {
        console.log("Starting avatar upload...");
        const storageRef = ref(storage, `groupAvatars/${avatarFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, avatarFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            console.log("Upload progress:", progress + "%");
          },
          (error) => {
            console.error("Upload error:", error);
          },
          async () => {
            try {
              avatarUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Avatar uploaded and available at:", avatarUrl);
              // Proceed with group creation
              await createGroup(avatarUrl);
            } catch (error) {
              console.error("Error getting download URL:", error);
            }
          }
        );
      } else {
        // No file selected, proceed with default avatar URL
        console.log("hum yha hai guddu");
        await createGroup(avatarUrl);
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const createGroup = async (avatarUrl) => {
    const groupRef = await addDoc(collection(db, "groups"), {
      name: groupName,
      description: groupDescription,
      createdBy: user.uid,
      members: [user.uid],
      avatar: avatarUrl,
    });

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      groups: arrayUnion(groupRef.id),
    });

    setGroupName("");
    setGroupDescription("");
    setAvatarFile(null);
    setUploadProgress(0);
    toast.success("Group created successfully");
    onClose();
  };

  const handleAvatarChange = ({ file }) => {
    setAvatarFile(file);
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Group Name" className="font-mono font-bold text-xl">
        <Input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
          className="font-mono"
        />
      </Form.Item>
      <Form.Item label="Group Description" className="font-mono font-bold">
        <Input
          type="text"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="Group Description"
        />
      </Form.Item>
      <Form.Item label="Group Avatar" className="font-mono font-bold">
        <Upload
          accept="image/*"
          showUploadList={true}
          beforeUpload={() => false}
          onChange={handleAvatarChange}
        >
          <Button text={"Choose Avatar"} icon={<UploadOutlined />} />
        </Upload>
        {avatarFile && <p className="font-mono">{avatarFile.name}</p>}
      </Form.Item>
      {uploadProgress > 0 && <Progress percent={Math.round(uploadProgress)} />}
      <Form.Item>
        <Button text={"Create Group"} onClick={handleCreateGroup}>
          Create Group
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGroup;
