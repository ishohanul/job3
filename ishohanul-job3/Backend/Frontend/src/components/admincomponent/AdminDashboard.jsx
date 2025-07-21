import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import Footer from "../components_lite/Footer";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { 
  Users, 
  Briefcase, 
  Building2, 
  FileText, 
  BarChart3, 
  Settings as SettingsIcon,
  Home,
  Search,
  Plus,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";
import JobManagement from "./JobManagement";
import CompanyManagement from "./CompanyManagement";
import ApplicationManagement from "./ApplicationManagement";
import SettingsComponent from "./Settings";
import { useAdminData } from "@/hooks/useAdminData";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const { stats } = useAdminData();

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "User Management", icon: Users },
    { id: "jobs", label: "Job Management", icon: Briefcase },
    { id: "companies", label: "Company Management", icon: Building2 },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const dashboardStats = [
    { title: "Total Users", value: stats.totalUsers || "0", icon: Users, color: "text-blue-600" },
    { title: "Students", value: stats.students || "0", icon: Users, color: "text-green-600" },
    { title: "Recruiters", value: stats.recruiters || "0", icon: Users, color: "text-purple-600" },
    { title: "Admins", value: stats.admins || "0", icon: Users, color: "text-orange-600" },
  ];

  const quickActions = [
    { label: "View All Users", action: () => setActiveTab("users"), icon: Eye },
    { label: "Post New Job", action: () => navigate("/admin/jobs/create"), icon: Plus },
    { label: "Add Company", action: () => navigate("/admin/companies/create"), icon: Plus },
    { label: "View Analytics", action: () => setActiveTab("analytics"), icon: BarChart3 },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                onClick={action.action}
              >
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">New user registered - John Doe</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">New job posted - Software Engineer</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Company approved - Tech Corp</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUsers = () => (
    <UserManagement />
  );

  const renderJobs = () => (
    <JobManagement />
  );

  const renderCompanies = () => (
    <CompanyManagement />
  );

  const renderApplications = () => (
    <ApplicationManagement />
  );

  const renderAnalytics = () => (
    <Analytics />
  );

  const renderSettings = () => (
    <SettingsComponent />
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "users":
        return renderUsers();
      case "jobs":
        return renderJobs();
      case "companies":
        return renderCompanies();
      case "applications":
        return renderApplications();
      case "analytics":
        return renderAnalytics();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? "bg-[#6B3AC2] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard; 