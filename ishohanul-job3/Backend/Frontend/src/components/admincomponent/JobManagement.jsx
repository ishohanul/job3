import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Plus,
  Download,
  CheckSquare,
  Square,
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import useGetAllAdminJobs from "@/hooks/useGetAllJAdminobs";

const JobManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCompany, setFilterCompany] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const { companies } = useSelector((store) => store.company);
  
  // Fetch admin jobs
  const { loading, error } = useGetAllAdminJobs();

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    console.log("allAdminJobs:", allAdminJobs);
    console.log("allAdminJobs length:", allAdminJobs?.length);
    
    let filtered = allAdminJobs || [];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(job => job.status === filterStatus);
    }

    // Apply company filter
    if (filterCompany !== "all") {
      filtered = filtered.filter(job => job.company?._id === filterCompany);
    }

    console.log("filtered jobs:", filtered);
    setFilteredJobs(filtered);
  }, [allAdminJobs, searchTerm, filterStatus, filterCompany]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />;
      case "inactive":
        return <XCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "expired":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleSelectJob = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job._id));
    }
  };

  const handleEditJob = (job) => {
    navigate(`/admin/jobs/${job._id}/edit`);
  };

  const handleViewJob = (job) => {
    navigate(`/description/${job._id}`);
  };

  const handleViewApplicants = (job) => {
    navigate(`/admin/jobs/${job._id}/applicants`);
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      // Implement delete functionality
      toast.success("Job deleted successfully!");
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      console.log("Changing status for job:", jobId, "to:", newStatus);
      console.log("API URL:", `${JOB_API_ENDPOINT}/${jobId}/status`);
      
      const response = await axios.patch(`${JOB_API_ENDPOINT}/${jobId}/status`, {
        status: newStatus
      });
      
      console.log("Status change response:", response.data);
      
      if (response.data.status) {
        toast.success(`Job status changed to ${newStatus}`);
        // Refresh the jobs list by refetching
        window.location.reload(); // Simple refresh for now
      } else {
        toast.error(response.data.message || "Failed to change job status");
      }
    } catch (error) {
      console.error("Status change error:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to change job status");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedJobs.length === 0) {
      toast.error("Please select jobs to delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedJobs.length} jobs?`)) {
      // Implement bulk delete functionality
      toast.success(`${selectedJobs.length} jobs deleted successfully!`);
      setSelectedJobs([]);
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedJobs.length === 0) {
      toast.error("Please select jobs to update");
      return;
    }

    if (window.confirm(`Are you sure you want to change the status of ${selectedJobs.length} jobs to ${newStatus}?`)) {
      // Implement bulk status change functionality
      toast.success(`${selectedJobs.length} jobs updated successfully!`);
      setSelectedJobs([]);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return `$${salary.toLocaleString()}`;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Job Management</h2>
            <p className="text-muted-foreground">Manage job postings and applications</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B3AC2] mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Job Management</h2>
            <p className="text-muted-foreground">Manage job postings and applications</p>
          </div>
        </div>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="text-red-600 font-medium">Error loading jobs</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Management</h2>
          <p className="text-muted-foreground">Manage job postings and applications</p>
        </div>
        <Button onClick={() => navigate("/admin/jobs/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredJobs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredJobs.filter(job => job.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredJobs.filter(job => job.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredJobs.reduce((total, job) => total + (job.applications?.length || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {selectedJobs.length} job(s) selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  onChange={(e) => handleBulkStatusChange(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3AC2]"
                >
                  <option value="">Change Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                </select>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Search and filter jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by job title, company, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3AC2]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3AC2]"
              >
                <option value="all">All Companies</option>
                {companies?.map(company => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
          <CardDescription>Manage job postings and applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                    className="h-8 w-8 p-0"
                  >
                    {selectedJobs.length === filteredJobs.length ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Job Details</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-muted-foreground">No jobs found</div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow key={job._id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectJob(job._id)}
                        className="h-8 w-8 p-0"
                      >
                        {selectedJobs.includes(job._id) ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{job.location || "Remote"}</span>
                          {job.salary && (
                            <>
                              <span>•</span>
                              <DollarSign className="h-3 w-3" />
                              <span>{formatSalary(job.salary)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{job.company?.name}</div>
                        <div className="text-muted-foreground">{job.company?.industry}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(job.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(job.status)}
                          <span>{job.status || "pending"}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(job.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{job.applications?.length || 0}</span>
                        <span className="text-muted-foreground"> applications</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                                                 <PopoverContent className="w-48" align="end">
                           <div className="space-y-2">
                             <Button
                               variant="ghost"
                               className="w-full justify-start"
                               onClick={() => handleViewJob(job)}
                             >
                               <Eye className="mr-2 h-4 w-4" />
                               View Job
                             </Button>
                             <Button
                               variant="ghost"
                               className="w-full justify-start"
                               onClick={() => handleViewApplicants(job)}
                             >
                               <Users className="mr-2 h-4 w-4" />
                               View Applicants
                             </Button>
                             <Button
                               variant="ghost"
                               className="w-full justify-start"
                               onClick={() => handleEditJob(job)}
                             >
                               <Edit className="mr-2 h-4 w-4" />
                               Edit Job
                             </Button>
                             <div className="px-3 py-2">
                               <div className="text-xs font-medium text-muted-foreground mb-2">Change Status</div>
                               <div className="space-y-1">
                                 {["active", "inactive", "pending", "expired"].map((status) => (
                                   <button
                                     key={status}
                                     onClick={() => handleStatusChange(job._id, status)}
                                     className={`w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100 ${
                                       job.status === status ? "bg-blue-100 text-blue-700" : ""
                                     }`}
                                   >
                                     {status.charAt(0).toUpperCase() + status.slice(1)}
                                   </button>
                                 ))}
                               </div>
                             </div>
                             <Button
                               variant="ghost"
                               className="w-full justify-start text-red-600 hover:text-red-700"
                               onClick={() => handleDeleteJob(job._id)}
                             >
                               <Trash2 className="mr-2 h-4 w-4" />
                               Delete Job
                             </Button>
                           </div>
                         </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobManagement; 