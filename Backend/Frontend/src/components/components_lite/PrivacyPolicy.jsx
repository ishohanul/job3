import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Shield, Lock, Eye, Users, Mail, Calendar, AlertTriangle } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Full name and contact details",
            "Email address and phone number",
            "Professional resume/CV and cover letters",
            "Employment history and qualifications",
            "Profile information and preferences"
          ]
        },
        {
          subtitle: "Usage Data",
          items: [
            "IP address and device information",
            "Browser type and version",
            "Pages visited and time spent",
            "Search queries and job applications",
            "Interaction with job postings and companies"
          ]
        },
        {
          subtitle: "Technical Data",
          items: [
            "Cookies and session data",
            "Analytics and performance metrics",
            "Error logs and system information",
            "Geographic location data"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Provision",
          items: [
            "Create and manage your account",
            "Match you with relevant job opportunities",
            "Process job applications and communications",
            "Provide personalized job recommendations",
            "Enable employer-candidate connections"
          ]
        },
        {
          subtitle: "Communication",
          items: [
            "Send job alerts and notifications",
            "Provide customer support and assistance",
            "Share important service updates",
            "Respond to your inquiries and requests"
          ]
        },
        {
          subtitle: "Improvement & Analytics",
          items: [
            "Analyze usage patterns and trends",
            "Improve our platform and services",
            "Develop new features and functionality",
            "Ensure platform security and performance"
          ]
        }
      ]
    },
    {
      title: "Data Security & Protection",
      icon: Shield,
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "End-to-end encryption for sensitive data",
            "Regular security audits and assessments",
            "Secure data centers with 24/7 monitoring",
            "Multi-factor authentication options",
            "Regular security updates and patches"
          ]
        },
        {
          subtitle: "Data Retention",
          items: [
            "Personal data retained only as necessary",
            "Automatic deletion of inactive accounts",
            "Secure disposal of outdated information",
            "Compliance with data protection regulations"
          ]
        }
      ]
    },
    {
      title: "Your Rights & Choices",
      icon: Lock,
      content: [
        {
          subtitle: "Access & Control",
          items: [
            "Access and download your personal data",
            "Update or correct your information",
            "Delete your account and associated data",
            "Opt-out of marketing communications",
            "Control cookie preferences"
          ]
        },
        {
          subtitle: "Data Portability",
          items: [
            "Export your data in standard formats",
            "Transfer data to other services",
            "Request data processing restrictions",
            "Object to certain data processing activities"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contact: privacy@jobportal.com</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              At Job Portal, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our job 
              portal platform and services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              We will not use or share your information with anyone except as described in this Privacy Policy.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-purple-600" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex} className="space-y-3">
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {subsection.subtitle}
                      </h4>
                      <ul className="space-y-2 ml-4">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Sharing */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">With Your Consent</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• When you explicitly authorize sharing</li>
                  <li>• For specific job applications you submit</li>
                  <li>• When connecting with employers</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Legal Requirements</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• To comply with applicable laws</li>
                  <li>• To respond to legal requests</li>
                  <li>• To protect our rights and safety</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Updates */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Us & Policy Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-2 text-gray-700">
                  <p>Email: privacy@jobportal.com</p>
                  <p>Phone: +880 1712-345678</p>
                  <p>Address: House #45, Road #12, Banani, Dhaka 1213, Bangladesh</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Policy Updates</h4>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            If you have any questions about this Privacy Policy, please don't hesitate to contact us. 
            We're here to help protect your privacy and ensure your data is handled responsibly.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
