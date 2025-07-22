import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { X, Mail, Phone, Calendar, User, MapPin, FileText } from "lucide-react";

const UserDetailsModal = ({ user, isOpen, onClose, onEdit }) => {
  if (!isOpen || !user) return null;

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Recruiter":
        return "bg-blue-100 text-blue-800";
      case "Student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <CardTitle>User Details</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.profile?.profilePhoto} />
              <AvatarFallback className="text-lg">
                {user.fullname.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{user.fullname}</h3>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge className={getRoleBadgeColor(user.role)}>
                {user.role}
              </Badge>
            </div>
            <Button onClick={() => onEdit(user)}>
              Edit User
            </Button>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">ID: {user.nationalId}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined: {formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Updated: {formatDate(user.updatedAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">User ID: {user._id}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          {user.profile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.profile.bio && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Bio</h4>
                    <p className="text-sm text-muted-foreground">{user.profile.bio}</p>
                  </div>
                )}
                
                {user.profile.skills && user.profile.skills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.profile.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.profile.resume && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Resume</h4>
                    <a 
                      href={user.profile.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {user.profile.resumeOriginalname || "View Resume"}
                    </a>
                  </div>
                )}

                {user.profile.company && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Company</h4>
                    <p className="text-sm text-muted-foreground">{user.profile.company}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(user)}>
              Edit User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsModal; 