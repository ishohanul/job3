import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { toast } from "sonner";

const JobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${id}`, { withCredentials: true });
        if (res.data.status && res.data.job) {
          setForm({
            title: res.data.job.title || "",
            description: res.data.job.description || "",
            requirements: Array.isArray(res.data.job.requirements) ? res.data.job.requirements.join(", ") : (res.data.job.requirements || ""),
            salary: res.data.job.salary || "",
            location: res.data.job.location || "",
            jobType: res.data.job.jobType || "",
            experienceLevel: res.data.job.experienceLevel || "",
            position: res.data.job.position || "",
          });
        } else {
          toast.error("Failed to fetch job data");
        }
      } catch (err) {
        toast.error("Error fetching job data");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        requirements: form.requirements.split(",").map((r) => r.trim()),
      };
      const res = await axios.patch(`${JOB_API_ENDPOINT}/${id}/update`, payload, { withCredentials: true });
      if (res.data.status) {
        toast.success("Job updated successfully");
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Failed to update job");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating job");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <Input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
          <Input name="requirements" value={form.requirements} onChange={handleChange} placeholder="Requirements (comma separated)" required />
          <Input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" required />
          <Input name="location" value={form.location} onChange={handleChange} placeholder="Location" required />
          <Input name="jobType" value={form.jobType} onChange={handleChange} placeholder="Job Type" required />
          <Input name="experienceLevel" value={form.experienceLevel} onChange={handleChange} placeholder="Experience Level (years)" required />
          <Input name="position" value={form.position} onChange={handleChange} placeholder="Positions" required />
          <div className="flex gap-4 mt-4">
            <Button type="submit" className="bg-purple-600 text-white">Save Changes</Button>
            <Button type="button" variant="outline" onClick={() => navigate("/admin/jobs")}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobEdit; 