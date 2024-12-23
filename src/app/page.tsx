"use client";

import { useEffect, useState } from "react";
import Pagination from "./pagination";

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

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

  const [users, setUsers] = useState<Users[]>([]);

  // API address
  const API_URL = "https://randomuser.me/api/?results=20";

  // asyncronous function
  const fetchData = async () => {
    // using the window.fetch method to get the request
    const res = await window.fetch(API_URL);
    // transforming the "res" variable to json
    const json = await res.json();
    // setting the state
    setUsers(json.results); // results is the API array
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
      </main>
    </div>
  );

}
