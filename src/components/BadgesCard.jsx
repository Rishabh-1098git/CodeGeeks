import React from "react";

const BadgesCard = ({ badges }) => (
  <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Badges</h2>
    <ul className="list-disc list-inside">
      {badges.length > 0 ? (
        badges.map((badge, index) => (
          <li key={index} className="text-xl">
            {badge.name}
          </li>
        ))
      ) : (
        <li className="text-xl">No badges available</li>
      )}
    </ul>
  </div>
);

export default BadgesCard;
