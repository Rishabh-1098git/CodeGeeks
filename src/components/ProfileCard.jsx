import React from "react";

const ProfileCard = ({ profile }) => (
  <div
    className="p-6 rounded-lg shadow-lg text-center mt-10 max-w-96 w-full"
    style={{
      backgroundImage: "linear-gradient(to right, #282828 0%, #282828 100%)",
    }}
  >
    <div className="p-4 rounded-lg">
      <img
        src={profile?.avatar}
        alt="avatar"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold font-mono mb-1 text-gray-300">
        {profile?.name}
      </h2>
      <p className="text-xl font-mono mb-1 text-green-400">
        @{profile?.username}
      </p>
      <p className="text-lg font-mono text-blue-300">
        Ranking: {profile?.ranking}
      </p>
    </div>
  </div>
);

export default ProfileCard;
