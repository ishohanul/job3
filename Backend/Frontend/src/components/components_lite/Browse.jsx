import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  // Filter jobs based on searchedQuery
  const filteredJobs = !searchedQuery || searchedQuery.trim() === ""
    ? allJobs
    : allJobs.filter((job) => {
        const query = searchedQuery.toLowerCase();
        return (
          job.title?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query) ||
          job.location?.toLowerCase().includes(query) ||
          job.experience?.toLowerCase().includes(query) ||
          job.salary?.toLowerCase().includes(query)
        );
      });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-xl">Search Results {filteredJobs.length}</h1>
          <input
            type="text"
            className="w-80 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Search jobs by title, company, location..."
            value={searchedQuery || ""}
            onChange={e => dispatch(setSearchedQuery(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-3 gap-4  ">
          {filteredJobs.map((job) => {
            return <Job1 key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
