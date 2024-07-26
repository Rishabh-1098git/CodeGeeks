import React from "react";
import PropTypes from "prop-types";

const SubmissionsCard = ({ submissions }) => (
  <div
    className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg "
    style={{
      backgroundImage: "linear-gradient(to right, #282828 0%, #282828 100%)",
    }}
  >
    <h2 className="text-2xl font-bold mb-4 text-gray-300 font-mono">
      Recent Submissions
    </h2>
    <ul className="list-disc list-inside">
      {submissions.length > 0 ? (
        submissions.map((submission, index) => (
          <li key={index} className="text-xl text-gray-300 mb-1 font-mono">
            {submission.title} -{" "}
            {submission.statusDisplay === "Accepted" ? (
              <p className="inline text-sd-easy"> {submission.statusDisplay}</p>
            ) : (
              <p className="inline text-sd-hard"> {submission.statusDisplay}</p>
            )}
          </li>
        ))
      ) : (
        <li className="text-xl">No recent submissions found.</li>
      )}
    </ul>
  </div>
);

export default SubmissionsCard;
