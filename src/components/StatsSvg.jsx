import React from "react";

function StatsSvg({ username }) {
  return (
    <div>
      <img
        src={`https://leetcode-stats.vercel.app/api?username=${username}&theme=Dark`}
        alt={`${username}'s LeetCode Stats`}
        className="mx-auto h-80 mt-10"
      />
    </div>
  );
}

export default StatsSvg;
