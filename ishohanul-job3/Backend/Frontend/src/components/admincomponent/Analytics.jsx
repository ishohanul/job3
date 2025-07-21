import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Briefcase, 
  Building2, 
  FileText,
  Calendar,
  Download,
  Eye,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import { USER_API_ENDPOINT, JOB_API_ENDPOINT, COMPANY_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    users: { total: 0, students: 0, recruiters: 0, admins: 0, growth: 0 },
    jobs: { total: 0, active: 0, pending: 0, growth: 0 },
    companies: { total: 0, active: 0, pending: 0, growth: 0 },
    applications: { total: 0, pending: 0, accepted: 0, rejected: 0, growth: 0 },
    recentActivity: [],
    topCompanies: [],
    topJobs: [],
    monthlyData: {
      users: [],
      jobs: [],
      applications: []
    }
  });

  // Fetch real analytics data
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [usersRes, jobsRes, companiesRes, applicationsRes] = await Promise.all([
        axios.get(`${USER_API_ENDPOINT}/admin/users`, { withCredentials: true }),
        axios.get(`${JOB_API_ENDPOINT}/admin/jobs`, { withCredentials: true }),
        axios.get(`${COMPANY_API_ENDPOINT}/admin/companies`, { withCredentials: true }),
        axios.get(`${APPLICATION_API_ENDPOINT}/admin/applications`, { withCredentials: true })
      ]);

      const users = usersRes.data.users || [];
      const jobs = jobsRes.data.jobs || [];
      const companies = companiesRes.data.companies || [];
      const applications = applicationsRes.data.applications || [];

      // Calculate user statistics
      const students = users.filter(u => u.role === "Student").length;
      const recruiters = users.filter(u => u.role === "Recruiter").length;
      const admins = users.filter(u => u.role === "Admin").length;

      // Calculate job statistics
      const activeJobs = jobs.filter(j => j.status === "active").length;
      const pendingJobs = jobs.filter(j => j.status === "pending").length;

      // Calculate company statistics
      const activeCompanies = companies.filter(c => c.status === "active").length;
      const pendingCompanies = companies.filter(c => c.status === "pending").length;

      // Calculate application statistics
      const pendingApplications = applications.filter(a => a.status === "pending").length;
      const acceptedApplications = applications.filter(a => a.status === "accepted").length;
      const rejectedApplications = applications.filter(a => a.status === "rejected").length;

      // Generate monthly data for charts
      const monthlyData = generateMonthlyData(users, jobs, applications);

      // Get top companies by job count
      const companyJobCounts = {};
      jobs.forEach(job => {
        if (job.company && job.company.name) {
          companyJobCounts[job.company.name] = (companyJobCounts[job.company.name] || 0) + 1;
        }
      });
      const topCompanies = Object.entries(companyJobCounts)
        .map(([name, count]) => ({ name, jobs: count }))
        .sort((a, b) => b.jobs - a.jobs)
        .slice(0, 5);

      // Get top jobs by application count
      const jobApplicationCounts = {};
      applications.forEach(app => {
        if (app.job && app.job.title) {
          jobApplicationCounts[app.job.title] = (jobApplicationCounts[app.job.title] || 0) + 1;
        }
      });
      const topJobs = Object.entries(jobApplicationCounts)
        .map(([title, count]) => ({ title, applications: count }))
        .sort((a, b) => b.applications - a.applications)
        .slice(0, 5);

      // Generate recent activity
      const recentActivity = generateRecentActivity(users, jobs, companies, applications);

      setAnalyticsData({
        users: { 
          total: users.length, 
          students, 
          recruiters, 
          admins, 
          growth: calculateGrowth(users, 30) 
        },
        jobs: { 
          total: jobs.length, 
          active: activeJobs, 
          pending: pendingJobs, 
          growth: calculateGrowth(jobs, 30) 
        },
        companies: { 
          total: companies.length, 
          active: activeCompanies, 
          pending: pendingCompanies, 
          growth: calculateGrowth(companies, 30) 
        },
        applications: { 
          total: applications.length, 
          pending: pendingApplications, 
          accepted: acceptedApplications, 
          rejected: rejectedApplications, 
          growth: calculateGrowth(applications, 30) 
        },
        recentActivity,
        topCompanies,
        topJobs,
        monthlyData
      });

    } catch (error) {
      console.error("Error fetching analytics data:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate growth percentage
  const calculateGrowth = (items, days) => {
    const now = new Date();
    const pastDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    const recentItems = items.filter(item => new Date(item.createdAt) >= pastDate);
    const olderItems = items.filter(item => new Date(item.createdAt) < pastDate);
    
    if (olderItems.length === 0) return recentItems.length > 0 ? 100 : 0;
    
    return Math.round(((recentItems.length - olderItems.length) / olderItems.length) * 100);
  };

  // Generate monthly data for charts
  const generateMonthlyData = (users, jobs, applications) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    const userData = months.map((month, index) => {
      const monthUsers = users.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate.getMonth() === index;
      });
      return { month, users: monthUsers.length };
    });

    const jobData = months.map((month, index) => {
      const monthJobs = jobs.filter(job => {
        const jobDate = new Date(job.createdAt);
        return jobDate.getMonth() === index;
      });
      return { month, jobs: monthJobs.length };
    });

    const applicationData = months.map((month, index) => {
      const monthApplications = applications.filter(app => {
        const appDate = new Date(app.createdAt);
        return appDate.getMonth() === index;
      });
      return { month, applications: monthApplications.length };
    });

    return { users: userData, jobs: jobData, applications: applicationData };
  };

  // Generate recent activity
  const generateRecentActivity = (users, jobs, companies, applications) => {
    const activities = [];
    
    // Add recent users
    const recentUsers = users
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    
    recentUsers.forEach(user => {
      activities.push({
        type: "user",
        message: `New ${user.role.toLowerCase()} registered - ${user.name}`,
        time: formatTimeAgo(user.createdAt),
        color: "bg-green-500"
      });
    });

    // Add recent jobs
    const recentJobs = jobs
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    
    recentJobs.forEach(job => {
      activities.push({
        type: "job",
        message: `New job posted - ${job.title}`,
        time: formatTimeAgo(job.createdAt),
        color: "bg-blue-500"
      });
    });

    // Add recent applications
    const recentApplications = applications
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    
    recentApplications.forEach(app => {
      activities.push({
        type: "application",
        message: `New application for ${app.job?.title || 'Unknown Job'}`,
        time: formatTimeAgo(app.createdAt),
        color: "bg-orange-500"
      });
    });

    return activities.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: analyticsData.users.total,
      change: `${analyticsData.users.growth >= 0 ? '+' : ''}${analyticsData.users.growth}%`,
      trend: analyticsData.users.growth >= 0 ? "up" : "down",
      icon: Users,
      color: "text-blue-600",
      details: {
        students: analyticsData.users.students,
        recruiters: analyticsData.users.recruiters,
        admins: analyticsData.users.admins
      }
    },
    {
      title: "Active Jobs",
      value: analyticsData.jobs.total,
      change: `${analyticsData.jobs.growth >= 0 ? '+' : ''}${analyticsData.jobs.growth}%`,
      trend: analyticsData.jobs.growth >= 0 ? "up" : "down",
      icon: Briefcase,
      color: "text-green-600",
      details: {
        active: analyticsData.jobs.active,
        pending: analyticsData.jobs.pending
      }
    },
    {
      title: "Companies",
      value: analyticsData.companies.total,
      change: `${analyticsData.companies.growth >= 0 ? '+' : ''}${analyticsData.companies.growth}%`,
      trend: analyticsData.companies.growth >= 0 ? "up" : "down",
      icon: Building2,
      color: "text-purple-600",
      details: {
        active: analyticsData.companies.active,
        pending: analyticsData.companies.pending
      }
    },
    {
      title: "Applications",
      value: analyticsData.applications.total,
      change: `${analyticsData.applications.growth >= 0 ? '+' : ''}${analyticsData.applications.growth}%`,
      trend: analyticsData.applications.growth >= 0 ? "up" : "down",
      icon: FileText,
      color: "text-orange-600",
      details: {
        pending: analyticsData.applications.pending,
        accepted: analyticsData.applications.accepted,
        rejected: analyticsData.applications.rejected
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  const renderSimpleChart = (data, color = "#6B3AC2") => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">No data available</p>
        </div>
      );
    }

    const maxValue = Math.max(...data.map(d => d.users || d.jobs || d.applications || 0));
    const minValue = Math.min(...data.map(d => d.users || d.jobs || d.applications || 0));
    const range = maxValue - minValue;

    return (
      <div className="flex items-end justify-between h-32 space-x-1">
        {data.map((item, index) => {
          const value = item.users || item.jobs || item.applications || 0;
          const height = range > 0 ? ((value - minValue) / range) * 100 : 50;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full rounded-t"
                style={{
                  height: `${height}%`,
                  backgroundColor: color,
                  minHeight: '8px'
                }}
              />
              <span className="text-xs text-muted-foreground mt-2">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor platform performance and user activity</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B3AC2]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" onClick={fetchAnalyticsData}>
            <Download className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
              
              {/* Detailed breakdown */}
              {stat.details && (
                <div className="mt-3 space-y-1">
                  {stat.details.students !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Students:</span>
                      <span className="font-medium">{stat.details.students}</span>
                    </div>
                  )}
                  {stat.details.recruiters !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Recruiters:</span>
                      <span className="font-medium">{stat.details.recruiters}</span>
                    </div>
                  )}
                  {stat.details.admins !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Admins:</span>
                      <span className="font-medium">{stat.details.admins}</span>
                    </div>
                  )}
                  {stat.details.active !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Active:</span>
                      <span className="font-medium text-green-600">{stat.details.active}</span>
                    </div>
                  )}
                  {stat.details.pending !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Pending:</span>
                      <span className="font-medium text-yellow-600">{stat.details.pending}</span>
                    </div>
                  )}
                  {stat.details.accepted !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Accepted:</span>
                      <span className="font-medium text-green-600">{stat.details.accepted}</span>
                    </div>
                  )}
                  {stat.details.rejected !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span>Rejected:</span>
                      <span className="font-medium text-red-600">{stat.details.rejected}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user registration trends</CardDescription>
          </CardHeader>
          <CardContent>
            {renderSimpleChart(analyticsData.monthlyData.users, "#6B3AC2")}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Postings</CardTitle>
            <CardDescription>Job posting activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            {renderSimpleChart(analyticsData.monthlyData.jobs, "#FA4F09")}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Application submission trends</CardDescription>
          </CardHeader>
          <CardContent>
            {renderSimpleChart(analyticsData.monthlyData.applications, "#10B981")}
          </CardContent>
        </Card>
      </div>

      {/* Application Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status Overview</CardTitle>
          <CardDescription>Distribution of application statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-lg font-semibold">{analyticsData.applications.pending}</div>
                <div className="text-sm text-yellow-600">Pending</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-lg font-semibold">{analyticsData.applications.accepted}</div>
                <div className="text-sm text-green-600">Accepted</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-lg font-semibold">{analyticsData.applications.rejected}</div>
                <div className="text-sm text-red-600">Rejected</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-lg font-semibold">
                  {analyticsData.applications.total - analyticsData.applications.pending - analyticsData.applications.accepted - analyticsData.applications.rejected}
                </div>
                <div className="text-sm text-blue-600">Other</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentActivity.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No recent activity</p>
            ) : (
              analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Companies</CardTitle>
            <CardDescription>Companies with most job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topCompanies.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No company data available</p>
              ) : (
                analyticsData.topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{company.name}</span>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="h-2 rounded-full bg-[#6B3AC2]"
                        style={{ 
                          width: `${Math.max((company.jobs / Math.max(...analyticsData.topCompanies.map(c => c.jobs))) * 100, 20)}px`
                        }}
                      />
                      <span className="text-sm text-muted-foreground">{company.jobs} jobs</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Jobs</CardTitle>
            <CardDescription>Jobs with most applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topJobs.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No job data available</p>
              ) : (
                analyticsData.topJobs.map((job, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate max-w-[200px]" title={job.title}>
                      {job.title}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="h-2 rounded-full bg-[#FA4F09]"
                        style={{ 
                          width: `${Math.max((job.applications / Math.max(...analyticsData.topJobs.map(j => j.applications))) * 100, 20)}px`
                        }}
                      />
                      <span className="text-sm text-muted-foreground">{job.applications} apps</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics; 