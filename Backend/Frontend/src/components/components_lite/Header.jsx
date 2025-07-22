import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search, TrendingUp, Users, Briefcase, MapPin, Clock, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    const searchQuery = location ? `${query} in ${location}` : query;
    dispatch(setSearchedQuery(searchQuery));
    navigate("/browse");
  };

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Briefcase, value: "10K+", label: "Job Openings" },
    { icon: TrendingUp, value: "95%", label: "Success Rate" },
  ];

  const featuredJobs = [
    { title: "Senior React Developer", company: "TechCorp", location: "Dhaka", salary: "$80K-120K", urgent: true },
    { title: "Data Scientist", company: "AI Solutions", location: "Chittagong", salary: "$70K-100K", urgent: false },
    { title: "DevOps Engineer", company: "CloudTech", location: "Sylhet", salary: "$75K-110K", urgent: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-orange-100 rounded-full border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-700">
                🚀 Trusted by 50,000+ professionals
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Where Talent Meets
                <span className="block bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                  Opportunity
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with Bangladesh's top companies. Find your next career move with our AI-powered job matching platform.
              </p>
            </div>

            {/* Search Section */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Job title, skills, or keywords"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, region, or remote"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <Button 
                  onClick={searchjobHandler}
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Your Perfect Job
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <stat.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Featured Jobs */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Trending Jobs</h3>
              <p className="text-gray-600">Hot opportunities you don't want to miss</p>
            </div>
            
            <div className="space-y-4">
              {featuredJobs.map((job, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                    </div>
                    {job.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Full-time
                    </div>
                    <div className="font-medium text-green-600">{job.salary}</div>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">4.8 (120 reviews)</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-600 to-orange-600 rounded-xl p-6 text-white">
              <h4 className="font-semibold mb-2">Ready to accelerate your career?</h4>
              <p className="text-purple-100 mb-4">Join thousands of professionals who found their dream jobs</p>
              <div className="flex justify-center">
                <Button 
                  onClick={() => navigate("/admin/companies")}
                  className="bg-white text-purple-600 hover:bg-gray-100 border-0 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                >
                  Browse Companies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
