import { useState, useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const useGetAllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${APPLICATION_API_ENDPOINT}/admin/applications`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setApplications(response.data.applications);
        console.log("Applications fetched successfully:", response.data.applications);
      } else {
        setError("Failed to fetch applications");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError(error.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
  };
};

export default useGetAllApplications; 