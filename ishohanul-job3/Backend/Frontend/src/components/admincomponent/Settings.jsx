import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import { 
  Save, 
  RefreshCw, 
  Shield, 
  Users, 
  Mail, 
  Globe, 
  Database, 
  Bell,
  Palette,
  Lock,
  Eye,
  Trash2,
  Download,
  Upload
} from "lucide-react";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Job Portal",
    siteDescription: "Find your dream job or hire the perfect candidate",
    siteUrl: "http://localhost:5173",
    adminEmail: "admin@jobportal.com",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    
    // User Management
    allowRegistration: true,
    requireEmailVerification: true,
    allowProfileUpdates: true,
    maxProfileImageSize: 5, // MB
    allowedImageTypes: ["jpg", "jpeg", "png", "gif"],
    
    // Job Settings
    allowJobPosting: true,
    requireJobApproval: true,
    maxJobDuration: 90, // days
    allowJobEditing: true,
    maxApplicationsPerJob: 100,
    
    // Company Settings
    allowCompanyRegistration: true,
    requireCompanyApproval: true,
    allowCompanyLogo: true,
    maxCompanyLogoSize: 2, // MB
    
    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    emailFromName: "Job Portal",
    emailFromAddress: "noreply@jobportal.com",
    
    // Security Settings
    sessionTimeout: 24, // hours
    maxLoginAttempts: 5,
    lockoutDuration: 30, // minutes
    requireStrongPassword: true,
    enableTwoFactor: false,
    
    // Notification Settings
    emailNotifications: true,
    jobAlerts: true,
    applicationUpdates: true,
    systemMaintenance: true,
    
    // Appearance Settings
    primaryColor: "#6B3AC2",
    secondaryColor: "#FA4F09",
    enableDarkMode: false,
    showAnalytics: true,
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: 30, // days
    backupEmail: "",
  });

  // Load settings from localStorage or API
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('adminSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Save settings
  const saveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  // Reset settings to defaults
  const resetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to defaults?")) {
      setSettings({
        siteName: "Job Portal",
        siteDescription: "Find your dream job or hire the perfect candidate",
        siteUrl: "http://localhost:5173",
        adminEmail: "admin@jobportal.com",
        timezone: "UTC",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "12h",
        allowRegistration: true,
        requireEmailVerification: true,
        allowProfileUpdates: true,
        maxProfileImageSize: 5,
        allowedImageTypes: ["jpg", "jpeg", "png", "gif"],
        allowJobPosting: true,
        requireJobApproval: true,
        maxJobDuration: 90,
        allowJobEditing: true,
        maxApplicationsPerJob: 100,
        allowCompanyRegistration: true,
        requireCompanyApproval: true,
        allowCompanyLogo: true,
        maxCompanyLogoSize: 2,
        smtpHost: "smtp.gmail.com",
        smtpPort: 587,
        smtpUser: "",
        smtpPassword: "",
        emailFromName: "Job Portal",
        emailFromAddress: "noreply@jobportal.com",
        sessionTimeout: 24,
        maxLoginAttempts: 5,
        lockoutDuration: 30,
        requireStrongPassword: true,
        enableTwoFactor: false,
        emailNotifications: true,
        jobAlerts: true,
        applicationUpdates: true,
        systemMaintenance: true,
        primaryColor: "#6B3AC2",
        secondaryColor: "#FA4F09",
        enableDarkMode: false,
        showAnalytics: true,
        autoBackup: true,
        backupFrequency: "daily",
        backupRetention: 30,
        backupEmail: "",
      });
      toast.success("Settings reset to defaults");
    }
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'admin-settings.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Settings exported successfully!");
  };

  // Import settings
  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          toast.success("Settings imported successfully!");
        } catch (error) {
          toast.error("Invalid settings file");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Admin Settings</h2>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" onClick={exportSettings}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <label htmlFor="import-settings">
            <Button variant="outline" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </span>
            </Button>
          </label>
          <input
            id="import-settings"
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
          />
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic site configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={settings.siteUrl}
                onChange={(e) => handleInputChange("siteUrl", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleInputChange("adminEmail", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">EST</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => handleInputChange("dateFormat", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>User registration and profile settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Registration</Label>
                <p className="text-sm text-muted-foreground">Allow new users to register</p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => handleInputChange("allowRegistration", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">Users must verify their email</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleInputChange("requireEmailVerification", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Profile Updates</Label>
                <p className="text-sm text-muted-foreground">Users can update their profiles</p>
              </div>
              <Switch
                checked={settings.allowProfileUpdates}
                onCheckedChange={(checked) => handleInputChange("allowProfileUpdates", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxProfileImageSize">Max Profile Image Size (MB)</Label>
              <Input
                id="maxProfileImageSize"
                type="number"
                value={settings.maxProfileImageSize}
                onChange={(e) => handleInputChange("maxProfileImageSize", parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Job Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Job Settings
            </CardTitle>
            <CardDescription>Job posting and application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Job Posting</Label>
                <p className="text-sm text-muted-foreground">Allow companies to post jobs</p>
              </div>
              <Switch
                checked={settings.allowJobPosting}
                onCheckedChange={(checked) => handleInputChange("allowJobPosting", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Job Approval</Label>
                <p className="text-sm text-muted-foreground">Jobs must be approved by admin</p>
              </div>
              <Switch
                checked={settings.requireJobApproval}
                onCheckedChange={(checked) => handleInputChange("requireJobApproval", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Job Editing</Label>
                <p className="text-sm text-muted-foreground">Companies can edit their jobs</p>
              </div>
              <Switch
                checked={settings.allowJobEditing}
                onCheckedChange={(checked) => handleInputChange("allowJobEditing", checked)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxJobDuration">Max Job Duration (days)</Label>
                <Input
                  id="maxJobDuration"
                  type="number"
                  value={settings.maxJobDuration}
                  onChange={(e) => handleInputChange("maxJobDuration", parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxApplicationsPerJob">Max Applications per Job</Label>
                <Input
                  id="maxApplicationsPerJob"
                  type="number"
                  value={settings.maxApplicationsPerJob}
                  onChange={(e) => handleInputChange("maxApplicationsPerJob", parseInt(e.target.value))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Authentication and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Strong Password</Label>
                <p className="text-sm text-muted-foreground">Enforce strong password policy</p>
              </div>
              <Switch
                checked={settings.requireStrongPassword}
                onCheckedChange={(checked) => handleInputChange("requireStrongPassword", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Allow 2FA for users</p>
              </div>
              <Switch
                checked={settings.enableTwoFactor}
                onCheckedChange={(checked) => handleInputChange("enableTwoFactor", checked)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                <Input
                  id="maxLoginAttempts"
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleInputChange("maxLoginAttempts", parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
              <Input
                id="lockoutDuration"
                type="number"
                value={settings.lockoutDuration}
                onChange={(e) => handleInputChange("lockoutDuration", parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>SMTP configuration and email preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="smtpHost">SMTP Host</Label>
                <Input
                  id="smtpHost"
                  value={settings.smtpHost}
                  onChange={(e) => handleInputChange("smtpHost", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input
                  id="smtpPort"
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleInputChange("smtpPort", parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input
                id="smtpUser"
                value={settings.smtpUser}
                onChange={(e) => handleInputChange("smtpUser", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => handleInputChange("smtpPassword", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emailFromName">From Name</Label>
                <Input
                  id="emailFromName"
                  value={settings.emailFromName}
                  onChange={(e) => handleInputChange("emailFromName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailFromAddress">From Address</Label>
                <Input
                  id="emailFromAddress"
                  type="email"
                  value={settings.emailFromAddress}
                  onChange={(e) => handleInputChange("emailFromAddress", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Email notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable email notifications</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Job Alerts</Label>
                <p className="text-sm text-muted-foreground">Send job alerts to users</p>
              </div>
              <Switch
                checked={settings.jobAlerts}
                onCheckedChange={(checked) => handleInputChange("jobAlerts", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Application Updates</Label>
                <p className="text-sm text-muted-foreground">Notify about application status</p>
              </div>
              <Switch
                checked={settings.applicationUpdates}
                onCheckedChange={(checked) => handleInputChange("applicationUpdates", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Maintenance</Label>
                <p className="text-sm text-muted-foreground">System maintenance notifications</p>
              </div>
              <Switch
                checked={settings.systemMaintenance}
                onCheckedChange={(checked) => handleInputChange("systemMaintenance", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance Settings
            </CardTitle>
            <CardDescription>Theme and visual preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Allow users to use dark theme</p>
              </div>
              <Switch
                checked={settings.enableDarkMode}
                onCheckedChange={(checked) => handleInputChange("enableDarkMode", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Analytics</Label>
                <p className="text-sm text-muted-foreground">Display analytics in admin panel</p>
              </div>
              <Switch
                checked={settings.showAnalytics}
                onCheckedChange={(checked) => handleInputChange("showAnalytics", checked)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    value={settings.secondaryColor}
                    onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Backup Settings
            </CardTitle>
            <CardDescription>Database backup configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Enable automatic backups</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleInputChange("autoBackup", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleInputChange("backupFrequency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backupRetention">Backup Retention (days)</Label>
              <Input
                id="backupRetention"
                type="number"
                value={settings.backupRetention}
                onChange={(e) => handleInputChange("backupRetention", parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backupEmail">Backup Notification Email</Label>
              <Input
                id="backupEmail"
                type="email"
                value={settings.backupEmail}
                onChange={(e) => handleInputChange("backupEmail", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current system information and health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-green-800">Database</div>
                <div className="text-xs text-green-600">Connected</div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-blue-800">Server</div>
                <div className="text-xs text-blue-600">Running</div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Online</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <div className="text-sm font-medium text-purple-800">Last Backup</div>
                <div className="text-xs text-purple-600">2 hours ago</div>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">Recent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings; 