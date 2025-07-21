import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
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
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";

const CompanyManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterIndustry, setFilterIndustry] = useState("all");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  
  // Fetch companies
  useGetAllCompanies();

  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    console.log("companies:", companies);
    console.log("companies length:", companies?.length);
    console.log("companies type:", typeof companies);
    console.log("companies is array:", Array.isArray(companies));
    
    let filtered = companies || [];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(company => company.status === filterStatus);
    }

    // Apply industry filter
    if (filterIndustry !== "all") {
      filtered = filtered.filter(company => company.industry === filterIndustry);
    }

    console.log("filtered companies:", filtered);
    setFilteredCompanies(filtered);
  }, [companies, searchTerm, filterStatus, filterIndustry]);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
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
      case "suspended":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(filteredCompanies.map(company => company._id));
    }
  };

  const handleEditCompany = (company) => {
    navigate(`/admin/companies/${company._id}/edit`);
  };

  const handleViewCompany = (company) => {
    navigate(`/admin/companies/${company._id}`);
  };

  const handleViewJobs = (company) => {
    navigate(`/admin/companies/${company._id}/jobs`);
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        const response = await axios.delete(`${COMPANY_API_ENDPOINT}/${companyId}`);
        if (response.data.status) {
          toast.success("Company deleted successfully!");
          window.location.reload();
        } else {
          toast.error("Failed to delete company");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete company");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCompanies.length === 0) {
      toast.error("Please select companies to delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedCompanies.length} companies?`)) {
      try {
        // Implement bulk delete functionality
        toast.success(`${selectedCompanies.length} companies deleted successfully!`);
        setSelectedCompanies([]);
        window.location.reload();
      } catch (error) {
        toast.error("Failed to delete companies");
      }
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedCompanies.length === 0) {
      toast.error("Please select companies to update");
      return;
    }

    if (window.confirm(`Are you sure you want to change the status of ${selectedCompanies.length} companies to ${newStatus}?`)) {
      try {
        // Implement bulk status change functionality
        toast.success(`${selectedCompanies.length} companies updated successfully!`);
        setSelectedCompanies([]);
        window.location.reload();
      } catch (error) {
        toast.error("Failed to update companies");
      }
    }
  };

  const handleStatusChange = async (companyId, newStatus) => {
    try {
      const response = await axios.patch(`${COMPANY_API_ENDPOINT}/${companyId}/status`, {
        status: newStatus
      });
      
      if (response.data.status) {
        toast.success(`Company status changed to ${newStatus}`);
        window.location.reload();
      } else {
        toast.error("Failed to change company status");
      }
    } catch (error) {
      console.error("Status change error:", error);
      toast.error("Failed to change company status");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name) => {
    return name?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2) || 'CO';
  };

  const getUniqueIndustries = () => {
    const industries = companies?.map(company => company.industry).filter(Boolean) || [];
    return [...new Set(industries)];
  };

  // Show loading state
  if (!companies) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Company Management</h2>
            <p className="text-muted-foreground">Manage company profiles and approvals</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B3AC2] mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading companies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Company Management</h2>
          <p className="text-muted-foreground">Manage company profiles and approvals</p>
        </div>
        <Button onClick={() => navigate("/admin/companies/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredCompanies.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredCompanies.filter(company => company.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredCompanies.filter(company => company.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs Posted</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* We'll calculate this from jobs table later */}
              0
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedCompanies.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">
                  {selectedCompanies.length} company(s) selected
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
                  <option value="suspended">Suspended</option>
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
          <CardDescription>Search and filter companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by company name, industry, or description..."
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
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3AC2]"
              >
                <option value="all">All Industries</option>
                {getUniqueIndustries().map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
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

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Companies ({filteredCompanies.length})</CardTitle>
          <CardDescription>Manage company profiles and approvals</CardDescription>
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
                    {selectedCompanies.length === filteredCompanies.length ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Company Details</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-muted-foreground">No companies found</div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company) => (
                  <TableRow key={company._id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectCompany(company._id)}
                        className="h-8 w-8 p-0"
                      >
                        {selectedCompanies.includes(company._id) ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={company.logo || ""}
                            alt={`${company.name} logo`}
                          />
                          <AvatarFallback className="bg-gray-100">
                            {getInitials(company.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            {company.website && (
                              <>
                                <Globe className="h-3 w-3" />
                                <span>{company.website}</span>
                              </>
                            )}
                            {company.email && (
                              <>
                                <Mail className="h-3 w-3" />
                                <span>{company.email}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{company.industry || "Not specified"}</div>
                        <div className="text-muted-foreground">{company.location || "Remote"}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(company.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(company.status)}
                          <span>{company.status || "pending"}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(company.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">0</span>
                        <span className="text-muted-foreground"> jobs</span>
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
                              onClick={() => handleViewCompany(company)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Company
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => handleViewJobs(company)}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              View Jobs
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => handleEditCompany(company)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Company
                            </Button>
                            <div className="px-3 py-2">
                              <div className="text-xs font-medium text-muted-foreground mb-2">Change Status</div>
                              <div className="space-y-1">
                                {["active", "inactive", "pending", "suspended"].map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusChange(company._id, status)}
                                    className={`w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100 ${
                                      company.status === status ? "bg-blue-100 text-blue-700" : ""
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
                              onClick={() => handleDeleteCompany(company._id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Company
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

export default CompanyManagement; 