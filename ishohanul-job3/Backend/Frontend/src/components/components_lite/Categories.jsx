import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { 
  Code, 
  Database, 
  Brain, 
  Shield, 
  Palette, 
  BarChart3, 
  Cloud, 
  Smartphone,
  Globe,
  Zap,
  Cpu,
  Eye,
  Layers,
  Sparkles
} from "lucide-react";

const categories = [
  {
    name: "Frontend Development",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    jobs: "2.5K+",
    description: "React, Vue, Angular"
  },
  {
    name: "Backend Development",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    jobs: "1.8K+",
    description: "Node.js, Python, Java"
  },
  {
    name: "Full Stack",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    jobs: "3.2K+",
    description: "End-to-end solutions"
  },
  {
    name: "Data Science",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    jobs: "1.2K+",
    description: "ML, AI, Analytics"
  },
  {
    name: "DevOps",
    icon: Cloud,
    color: "from-indigo-500 to-blue-500",
    jobs: "950+",
    description: "AWS, Docker, Kubernetes"
  },
  {
    name: "Mobile Development",
    icon: Smartphone,
    color: "from-teal-500 to-green-500",
    jobs: "1.1K+",
    description: "iOS, Android, React Native"
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    jobs: "800+",
    description: "Figma, Adobe, Prototyping"
  },
  {
    name: "Cybersecurity",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    jobs: "650+",
    description: "Security, Penetration Testing"
  },
  {
    name: "Product Management",
    icon: BarChart3,
    color: "from-yellow-500 to-orange-500",
    jobs: "750+",
    description: "Agile, Scrum, Strategy"
  },
  {
    name: "Blockchain",
    icon: Zap,
    color: "from-purple-500 to-indigo-500",
    jobs: "420+",
    description: "Web3, Smart Contracts"
  },
  {
    name: "Game Development",
    icon: Cpu,
    color: "from-green-500 to-teal-500",
    jobs: "380+",
    description: "Unity, Unreal Engine"
  },
  {
    name: "Digital Marketing",
    icon: Eye,
    color: "from-blue-500 to-purple-500",
    jobs: "1.5K+",
    description: "SEO, Social Media, PPC"
  }
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-orange-100 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Explore Opportunities</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Perfect
            <span className="block bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
              Career Path
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From cutting-edge tech to creative design, find opportunities that match your skills and aspirations.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => searchjobHandler(category.name)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group-hover:border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {category.jobs}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Click to explore</span>
                  <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-purple-100 transition-colors flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Browse all available positions or set up job alerts to get notified about new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/browse")}
                className="bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border-0"
              >
                Browse All Jobs
              </Button>
              <Button 
                className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 bg-white"
              >
                Set Job Alerts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
