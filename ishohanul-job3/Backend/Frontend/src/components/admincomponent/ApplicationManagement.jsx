import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/data";

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [jobs, setJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${APPLICATION_API_ENDPOINT}/admin/applications`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setApplications(response.data.applications);
        console.log("Applications fetched:", response.data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs for filter
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${JOB_API_ENDPOINT}/admin/jobs`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  // Filter applications
  const filteredApplications = applications.filter((application) => {
    const matchesSearch = 
      application.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || application.status === statusFilter;
    const matchesJob = jobFilter === "all" || application.job?._id === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  // Handle bulk status update
  const handleBulkStatusUpdate = async (newStatus) => {
    if (selectedApplications.length === 0) {
      toast.error("Please select applications to update");
      return;
    }

    try {
      const promises = selectedApplications.map(applicationId =>
        axios.patch(
          `${APPLICATION_API_ENDPOINT}/admin/status/${applicationId}`,
          { status: newStatus },
          { withCredentials: true }
        )
      );

      await Promise.all(promises);
      toast.success(`Updated ${selectedApplications.length} applications to ${newStatus}`);
      setSelectedApplications([]);
      fetchApplications();
    } catch (error) {
      console.error("Error updating applications:", error);
      toast.error("Failed to update applications");
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedApplications.length === 0) {
      toast.error("Please select applications to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedApplications.length} applications?`)) {
      return;
    }

    try {
      const promises = selectedApplications.map(applicationId =>
        axios.delete(`${APPLICATION_API_ENDPOINT}/admin/${applicationId}`, {
          withCredentials: true,
        })
      );

      await Promise.all(promises);
      toast.success(`Deleted ${selectedApplications.length} applications`);
      setSelectedApplications([]);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting applications:", error);
      toast.error("Failed to delete applications");
    }
  };

  // Handle individual status update
  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await axios.patch(
        `${APPLICATION_API_ENDPOINT}/admin/status/${applicationId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success(`Application status updated to ${newStatus}`);
      fetchApplications();
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status");
    }
  };

  // Handle individual delete
  const handleDelete = async (applicationId) => {
    if (!confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      await axios.delete(`${APPLICATION_API_ENDPOINT}/admin/${applicationId}`, {
        withCredentials: true,
      });
      toast.success("Application deleted successfully");
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map(app => app._id));
    } else {
      setSelectedApplications([]);
    }
  };

  // Handle individual select
  const handleSelect = (applicationId, checked) => {
    if (checked) {
      setSelectedApplications(prev => [...prev, applicationId]);
    } else {
      setSelectedApplications(prev => prev.filter(id => id !== applicationId));
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      withdrawn: "bg-gray-100 text-gray-800",
      interviewing: "bg-blue-100 text-blue-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Application Management</h2>
          <p className="text-gray-600">Review and manage job applications</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => fetchApplications()}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{applications.length}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter(app => app.status === "pending").length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {applications.filter(app => app.status === "accepted").length}
            </div>
            <div className="text-sm text-gray-600">Accepted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {applications.filter(app => app.status === "rejected").length}
            </div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="Search by name, job, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Job</Label>
              <Select value={jobFilter} onValueChange={setJobFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  {jobs.map((job) => (
                    <SelectItem key={job._id} value={job._id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setJobFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedApplications.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedApplications.length} applications selected
                </span>
                <Select onValueChange={handleBulkStatusUpdate}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Mark as Pending</SelectItem>
                    <SelectItem value="accepted">Mark as Accepted</SelectItem>
                    <SelectItem value="rejected">Mark as Rejected</SelectItem>
                    <SelectItem value="withdrawn">Mark as Withdrawn</SelectItem>
                    <SelectItem value="interviewing">Mark as Interviewing</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedApplications.includes(application._id)}
                        onCheckedChange={(checked) => handleSelect(application._id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.user?.name || "N/A"}</div>
                        <div className="text-sm text-gray-500">{application.user?.email || "N/A"}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.job?.title || "N/A"}</div>
                        <div className="text-sm text-gray-500">{application.job?.location || "N/A"}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {application.company?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {formatDate(application.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(application.status)}>
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Review application details and update status
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-medium">Applicant</Label>
                                    <p>{selectedApplication.user?.name}</p>
                                    <p className="text-sm text-gray-500">{selectedApplication.user?.email}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">Job</Label>
                                    <p>{selectedApplication.job?.title}</p>
                                    <p className="text-sm text-gray-500">{selectedApplication.job?.location}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">Company</Label>
                                    <p>{selectedApplication.company?.name}</p>
                                  </div>
                                  <div>
                                    <Label className="font-medium">Applied Date</Label>
                                    <p>{formatDate(selectedApplication.createdAt)}</p>
                                  </div>
                                </div>
                                
                                {selectedApplication.coverLetter && (
                                  <div>
                                    <Label className="font-medium">Cover Letter</Label>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                                      <p className="text-sm">{selectedApplication.coverLetter}</p>
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <Label className="font-medium">Status</Label>
                                  <Select
                                    value={selectedApplication.status}
                                    onValueChange={(value) => handleStatusUpdate(selectedApplication._id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="accepted">Accepted</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                      <SelectItem value="withdrawn">Withdrawn</SelectItem>
                                      <SelectItem value="interviewing">Interviewing</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      handleDelete(selectedApplication._id);
                                      setIsDetailOpen(false);
                                    }}
                                  >
                                    Delete Application
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Select
                          value={application.status}
                          onValueChange={(value) => handleStatusUpdate(application._id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="withdrawn">Withdrawn</SelectItem>
                            <SelectItem value="interviewing">Interviewing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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

export default ApplicationManagement; 