import React from "react";
import Header from "../components/Header/Header";
import GroupsCard from "../components/GroupsCard";
function Groups() {
  return (
    <div>
      <Header />
      <div className="flex justify-center h-screen items-center">
        <GroupsCard />
      </div>
    </div>
  );
}

export default Groups;
