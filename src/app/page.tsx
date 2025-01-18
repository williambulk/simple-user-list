"use client";

import { useEffect, useState } from "react";
import Pagination from "./components/Pagination/pagination";
import { BarLoader } from "react-spinners";

export default function Home() {

  // setting a new type for the API elements
  type Users = {
    name?: {
      first?: string;
      last?: string;
    }
    login?: {
      uuid: string
    }
  }

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<Users[]>([]);

  // API address
  const API_URL = "https://randomuser.me/api/?results=20";

  // asyncronous function
  const fetchData = async () => {
    try {
      // using the window.fetch method to get the request
      const res = await window.fetch(API_URL);
      // Throwing error in case the response variable is unavailable
      if (res.ok) {
        // transforming the "res" variable to json
        const json = await res.json();
        // setting the state
        setUsers(json.results); // results is the API array
      } else {
        setError("There was a problem fetching users. Please try again later.");
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Could not fetch users", error);
    } finally {
      setLoading(false);
    }
  }
  
  // using useEffect to get the results when the page loads (component mount), hence the []
  useEffect(() => {
    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage; // setting the last index
  const firstPostIndex = lastPostIndex - postsPerPage; // setting the first index
  const currentPosts = users.slice(firstPostIndex, lastPostIndex); // using slice to get starting index and last index

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        { loading ? (
          <BarLoader color="#5fee69" />
        ) : error ? (
          <div className="text-red-500">There is an error. Please try again later.</div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            { currentPosts.map((user) => ( // mapping the users via "user"
              <div key={user.login?.uuid}>
                {user.name?.first || "No first name available"}
              </div>
            )) }
            <Pagination
              totalPosts={users.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        ) }
      </main>
    </div>
  );

}
