import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const AddMember = ({ groupId }) => {
  const [memberEmail, setMemberEmail] = useState("");

  const handleAddMember = async () => {
    if (!memberEmail) return;

    try {
      // Find user by email
      const userSnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", memberEmail))
      );
      if (userSnapshot.empty) {
        alert("User not found");
        return;
      }

      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;

      // Add user to group members
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(groupRef, {
        members: arrayUnion(userId),
      });

      // Update user's groups
      await updateDoc(userDoc.ref, {
        groups: arrayUnion(groupId),
      });

      setMemberEmail("");
      alert("Member added successfully!");
    } catch (error) {
      console.error("Error adding member: ", error);
    }
  };

  return (
    <div>
      <h2>Add Member</h2>
      <input
        type="email"
        value={memberEmail}
        onChange={(e) => setMemberEmail(e.target.value)}
        placeholder="Member Email"
      />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default AddMember;
