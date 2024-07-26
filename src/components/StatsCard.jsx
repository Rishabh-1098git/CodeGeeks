import React from "react";
import PropTypes from "prop-types";

const StatsCard = ({ stats, contestStats }) => {
  const { solvedProblem, easySolved, mediumSolved, hardSolved } = stats || {};
  const {
    contestAttend,
    contestRating,
    contestGlobalRanking,
    totalParticipants,
  } = contestStats || {};

  return (
    <div
      className="mt-6 p-6 rounded-lg shadow-lg flex "
      style={{
        backgroundImage: "linear-gradient(to right, #282828 0%, #282828 100%)",
      }}
    >
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 font-mono text-slate-300">
          Contest Stats
        </h2>
        <ul className="list-disc list-inside">
          <li className="text-xl font-mono text-slate-300 mb-1">
            Contest Attendance:
            <p className="text-blue-300 inline"> {contestAttend} </p>
          </li>
          <li className="text-xl font-mono text-slate-300 mb-1">
            Contest Rating:{" "}
            <p className="text-blue-300 inline">
              {" "}
              {Math.floor(contestRating)}{" "}
            </p>
          </li>
          <li className="text-xl font-mono text-slate-300 mb-1">
            Global Ranking:{" "}
            <p className="text-blue-300 inline"> {contestGlobalRanking} </p>
          </li>
          <li className="text-xl font-mono text-slate-300 mb-1">
            Total Participants:{" "}
            <p className="text-blue-300 inline"> {totalParticipants} </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  stats: PropTypes.shape({
    solvedProblem: PropTypes.number,
    easySolved: PropTypes.number,
    mediumSolved: PropTypes.number,
    hardSolved: PropTypes.number,
  }),
};

export default StatsCard;
