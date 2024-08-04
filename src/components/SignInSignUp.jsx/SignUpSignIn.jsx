import React, { useState } from "react";
import Input from "../Input.jsx";
import Button from "../Button.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function SignUpSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const fetchWithRetry = async (
    url,
    options = {},
    retries = 5,
    delay = 1000
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          if (response.status === 429) {
            console.warn(`Rate limit hit. Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const data = await response.json();
        return data;
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }
        console.error(`Fetch error: ${error.message}. Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const fetchLeetCodeData = async (username) => {
    const profileUrl = `https://alfa-leetcode-api.onrender.com/${username}`;
    const contestUrl = `https://alfa-leetcode-api.onrender.com/${username}/contest`;
    const submissionsUrl = `https://alfa-leetcode-api.onrender.com/${username}/submission?limit=20`;

    const [profileData, contestData, submissionsData] = await Promise.all([
      fetchWithRetry(profileUrl),
      fetchWithRetry(contestUrl),
      fetchWithRetry(submissionsUrl),
    ]);

    // Validate data
    const validatedProfileData = profileData || {};
    const validatedContestData = contestData || {};
    const validatedSubmissionsData = submissionsData || { submission: [] };

    return {
      profile: validatedProfileData,
      contest: validatedContestData,
      submissions: validatedSubmissionsData,
    };
  };

  const signupUsingEmail = async () => {
    setLoading(true);
    if (username !== "" && email !== "" && password !== "") {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const leetcodeData = await fetchLeetCodeData(username);

        await setDoc(doc(db, "users", user.uid), {
          name: username,
          email: user.email,
          photoURL: user.photoURL || "",
          leetcodeData,
          createdAt: new Date(),
        });

        toast.success("User created!");
        setEmail("");
        setPassword("");
        setUserName("");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  const loginUsingEmail = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged in");
          navigate("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };

  return (
    <>
      {loginForm ? (
        <div className="h-[400px] w-[400px] flex flex-col justify-center items-center p-6 space-y-4 bg-custom-gradient rounded-lg shadow-lg font-mono ">
          <h2 className="text-2xl font-bold mb-4 text-slate-300">Login</h2>
          <Input
            type="text"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={loginUsingEmail} disabled={loading} text="Login" />
          <p className="inline-block text-gray-300">
            or don't have an Account?
          </p>
          <p
            className="font-bold text-sd-medium cursor-pointer inline-block ml-1"
            onClick={() => setLoginForm(!loginForm)}
          >
            Click here
          </p>
        </div>
      ) : (
        <div className="shadow-lg h-[500px] w-[400px] flex flex-col justify-center items-center p-6 space-y-4 bg-custom-gradient bg-opacity-60 rounded-lg font-mono">
          <h2 className="text-2xl font-bold mb-4 text-gray-300">Sign Up</h2>
          <Input
            type="text"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            label="LeetCode Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Button
            onClick={signupUsingEmail}
            disabled={loading}
            text="Sign Up"
          />
          <p className="inline-block text-gray-300">or have an Account?</p>
          <p
            className="font-bold text-sd-medium cursor-pointer inline-block ml-1"
            onClick={() => setLoginForm(!loginForm)}
          >
            Click here
          </p>
        </div>
      )}
    </>
  );
}

export default SignUpSignin;
