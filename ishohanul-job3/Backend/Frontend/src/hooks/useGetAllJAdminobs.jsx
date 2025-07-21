import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching admin jobs from:", `${JOB_API_ENDPOINT}/admin/jobs`);
        const res = await axios.get(`${JOB_API_ENDPOINT}/admin/jobs`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
          console.log("Jobs dispatched to Redux:", res.data.jobs);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        console.error("Error response:", error.response?.data);
        setError(error.response?.data?.message || error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllAdminJobs;
