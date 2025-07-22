import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from '../utils/cloud.js';


export const registerCompany = async (req, res) => {
  try {
    const { 
      companyName, 
      industry, 
      description, 
      website, 
      location, 
      email, 
      phone 
    } = req.body;
    
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    
    company = await Company.create({
      name: companyName,
      industry,
      description,
      website,
      location,
      email,
      phone,
      userId: req.id || "admin", // For admin creation, use a default ID
    });
    
    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    // Since we removed authentication, return all companies for admin view
    const companies = await Company.find({})
      .sort({ createdAt: -1 });
    
    console.log("Found companies:", companies.length);
    
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

export const getAdminCompanies = async (req, res) => {
  try {
    const companies = await Company.find({})
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin companies:", error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
  }
};

//update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "Company updated" });
  } catch (error) {
    console.error(error);
  }
};

// Update company status
export const updateCompanyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "inactive", "pending", "suspended"].includes(status)) {
      return res.status(400).json({ 
        message: "Valid status is required (active, inactive, pending, suspended)", 
        status: false 
      });
    }

    const company = await Company.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found", status: false });
    }

    return res.status(200).json({ 
      message: "Company status updated successfully", 
      company, 
      status: true 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};

// Delete company
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findByIdAndDelete(id);
    
    if (!company) {
      return res.status(404).json({ message: "Company not found", status: false });
    }

    return res.status(200).json({ 
      message: "Company deleted successfully", 
      status: true 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", status: false });
  }
};
