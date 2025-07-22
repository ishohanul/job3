import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

export const useAdminData = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${USER_API_ENDPOINT}/admin/users`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/admin/stats`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setStats(response.data.stats);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError("Failed to fetch stats");
      toast.error("Failed to fetch stats");
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(
        `${USER_API_ENDPOINT}/admin/users/${userId}`,
        userData,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success("User updated successfully");
        fetchUsers(); // Refresh the users list
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
      return false;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${USER_API_ENDPOINT}/admin/users/${userId}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh the users list
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  return {
    users,
    stats,
    loading,
    error,
    fetchUsers,
    fetchStats,
    updateUser,
    deleteUser,
  };
}; 