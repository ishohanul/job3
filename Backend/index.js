import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["https://job2-i0d3.onrender.com"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

 
//api's

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Code for deployment
// Check if the Node.js environment is set to 'production'
if (process.env.NODE_ENV === "production") {

  // Get the absolute path of the current directory
  const dirpath = path.resolve();

  // Serve static files from the 'Frontend/dist' directory
  app.use(express.static('./Frontend/dist'));

  // For any other route (i.e., wildcard '*'), send back the index.html file
  // This is useful for single-page applications (SPAs) that handle routing on the client side
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirpath, './Frontend/dist', 'index.html'));
  });

}




app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
