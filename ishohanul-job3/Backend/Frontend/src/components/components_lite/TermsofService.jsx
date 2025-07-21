import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, Shield, Users, AlertTriangle, CheckCircle, XCircle, Mail, Calendar, Scale } from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        {
          subtitle: "Agreement to Terms",
          description: "By accessing and using Job Portal, you accept and agree to be bound by the terms and provision of this agreement.",
          items: [
            "You must be at least 18 years old to use our services",
            "You agree to provide accurate and complete information",
            "You are responsible for maintaining the security of your account",
            "You agree to comply with all applicable laws and regulations"
          ]
        },
        {
          subtitle: "Account Registration",
          description: "To access certain features, you must create an account with valid information.",
          items: [
            "Provide accurate personal and professional information",
            "Maintain the confidentiality of your login credentials",
            "Notify us immediately of any unauthorized use",
            "You may not create multiple accounts for the same person"
          ]
        }
      ]
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content: [
        {
          subtitle: "Acceptable Use",
          description: "You agree to use our platform only for lawful purposes and in accordance with these terms.",
          items: [
            "Use the platform for legitimate job seeking or hiring purposes",
            "Respect the rights and privacy of other users",
            "Do not post false, misleading, or fraudulent information",
            "Do not attempt to gain unauthorized access to our systems"
          ]
        },
        {
          subtitle: "Prohibited Activities",
          description: "The following activities are strictly prohibited on our platform.",
          items: [
            "Harassment, discrimination, or hate speech",
            "Spam, phishing, or fraudulent activities",
            "Posting inappropriate or offensive content",
            "Attempting to reverse engineer or hack our systems"
          ]
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: [
        {
          subtitle: "Our Rights",
          description: "Job Portal and its original content, features, and functionality are owned by us.",
          items: [
            "All content on the platform is protected by copyright",
            "Our trademarks and service marks are our property",
            "You may not reproduce or distribute our content",
            "You retain ownership of content you submit"
          ]
        },
        {
          subtitle: "User Content",
          description: "You grant us a license to use content you submit to our platform.",
          items: [
            "You retain ownership of your submitted content",
            "You grant us a worldwide, non-exclusive license",
            "We may use your content to provide our services",
            "You represent that you have the right to share your content"
          ]
        }
      ]
    },
    {
      title: "Privacy & Data Protection",
      icon: Shield,
      content: [
        {
          subtitle: "Data Collection",
          description: "We collect and process your data as described in our Privacy Policy.",
          items: [
            "We collect information you provide directly to us",
            "We automatically collect usage and technical data",
            "We use cookies and similar technologies",
            "We may share data with employers for job applications"
          ]
        },
        {
          subtitle: "Data Security",
          description: "We implement appropriate security measures to protect your data.",
          items: [
            "We use encryption to protect sensitive information",
            "We regularly update our security practices",
            "We limit access to your personal information",
            "We comply with applicable data protection laws"
          ]
        }
      ]
    }
  ];

  const limitations = [
    {
      title: "Service Availability",
      description: "We strive to maintain high availability but cannot guarantee uninterrupted service.",
      icon: AlertTriangle
    },
    {
      title: "Content Accuracy",
      description: "We do not verify all user-submitted content and are not responsible for its accuracy.",
      icon: AlertTriangle
    },
    {
      title: "Third-Party Services",
      description: "We may link to third-party services but are not responsible for their content or practices.",
      icon: AlertTriangle
    },
    {
      title: "Limitation of Liability",
      description: "Our liability is limited to the amount you paid for our services in the past 12 months.",
      icon: XCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our job portal platform.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contact: legal@jobportal.com</span>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-500" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Job Portal. These Terms of Service ("Terms") govern your use of our job portal platform, 
              including all features, services, and content available through our website and mobile applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part 
              of these terms, you may not access our services. These Terms apply to all visitors, users, and others 
              who access or use our platform.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-blue-600" />
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
                      <p className="text-gray-600 text-sm">
                        {subsection.description}
                      </p>
                      <ul className="space-y-2 ml-4">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
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

        {/* Limitations & Disclaimers */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Limitations & Disclaimers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {limitations.map((limitation, index) => (
                <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <limitation.icon className="h-5 w-5 text-orange-500" />
                    <h4 className="font-semibold text-gray-800">{limitation.title}</h4>
                  </div>
                  <p className="text-gray-700 text-sm">{limitation.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Account Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We may terminate or suspend your account and bar access to our services immediately, without prior notice 
              or liability, under our sole discretion, for any reason whatsoever, including without limitation if you 
              breach the Terms.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Grounds for Termination</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Violation of these Terms of Service</li>
                  <li>• Fraudulent or illegal activities</li>
                  <li>• Harassment or abuse of other users</li>
                  <li>• Extended period of account inactivity</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">After Termination</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Your right to use our services will cease</li>
                  <li>• We may delete your account and data</li>
                  <li>• You may not create a new account</li>
                  <li>• Certain provisions will survive termination</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Governing Law & Disputes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Governing Law</h4>
                <p className="text-gray-700 text-sm">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which Job Portal 
                  operates, without regard to its conflict of law provisions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Dispute Resolution</h4>
                <p className="text-gray-700 text-sm">
                  Any disputes arising from these Terms or your use of our services will be resolved through binding 
                  arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
              provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Important:</strong> Your continued use of our services after any changes constitutes acceptance 
                of the new Terms. We encourage you to review these Terms periodically.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Legal Department</h4>
                <div className="space-y-2 text-gray-700">
                  <p>Email: legal@jobportal.com</p>
                  <p>Phone: +880 1812-987654</p>
                  <p>Address: House #45, Road #12, Banani, Dhaka 1213, Bangladesh</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Questions & Support</h4>
                <p className="text-gray-700 text-sm">
                  If you have any questions about these Terms of Service, please contact our legal department. 
                  For general support inquiries, please use our contact form or support email.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            By using Job Portal, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
