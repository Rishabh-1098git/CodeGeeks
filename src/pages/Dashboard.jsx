import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileCard from "../components/ProfileCard";
import StatsCard from "../components/StatsCard";
import SubmissionsCard from "../components/SubmissionsCard";
import GroupsCard from "../components/GroupsCard";
import { useAuthState } from "react-firebase-hooks/auth";
import StatsSvg from "../components/StatsSvg";

function Dashboard() {
  const [user] = useAuthState(auth);
  const userId = user ? user.uid : null;
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState(null);
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [contest, setContest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          throw new Error("userId is undefined");
        }

        console.log("Fetching data for userId:", userId);

        // Fetch user document from Firestore
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          throw new Error(`No user found with userId: ${userId}`);
        }

        const userData = userDoc.data();
        const username = userData.name;

        console.log("Fetched username:", username);
        setUsername(username);

        // Use the stored LeetCode data from Firestore
        const leetcodeData = userData.leetcodeData;

        // Set state with the fetched data
        setProfile(leetcodeData.profile);
        setStats(leetcodeData.profile); // Assuming leetcodeData.profile has the necessary stats
        setContest(leetcodeData.contest);
        setSubmissions(leetcodeData.submissions.submission);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleCreateGroup = () => {
    console.log("Create Group button clicked");
    // Add logic to create a group
  };

  return (
    <div>
      <Header />
      <div className="h-full p-4 md:p-8 lg:p-24">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full lg:w-2/5 ">
            <ProfileCard profile={profile} />
          </div>
          <div className="w-full lg:w-3/5">
            <StatsSvg username={username} />
          </div>
        </div>
        <div className="mt-4">
          <StatsCard stats={stats} contestStats={contest} />
        </div>
        <div className="mt-4">
          <SubmissionsCard submissions={submissions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
