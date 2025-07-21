# Job Portal (ishohanul-job3)

A fullstack job portal application with a Node.js/Express backend and a modern React frontend. This project allows users to browse and apply for jobs, while companies can post and manage job listings. Admin features are included for platform management.

## Features
- User authentication & registration
- Job browsing, filtering, and application
- Company management and job posting
- Admin dashboard for analytics and user/job moderation
- Responsive UI with modern design

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Redux, Tailwind CSS, Vite
- **Other:** Cloudinary, Multer, JWT, dotenv

## Directory Structure
```
ishohanul-job3/
  └── Backend/
      ├── index.js
      ├── package.json
      ├── sample env
      ├── controllers/
      ├── models/
      ├── routes/
      ├── middleware/
      ├── utils/
      └── Frontend/
          ├── README.md
          ├── package.json
          ├── index.html
          ├── src/
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud)

### Backend Setup
```bash
cd ishohanul-job3/Backend
cp sample\ env .env   # Copy and configure your environment variables
npm install
npm run dev           # Starts backend with nodemon
```

### Frontend Setup
```bash
cd ishohanul-job3/Backend/Frontend
npm install
npm run dev           # Starts frontend (Vite)
```

### Build Full Project
From the Backend directory:
```bash
npm run build
```

## Environment Variables
Create a `.env` file in `Backend/` based on `sample env`. Example variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
```

## Scripts
- `npm run dev` (Backend): Start backend with nodemon
- `npm run dev` (Frontend): Start frontend with Vite
- `npm run build` (Backend): Install dependencies and build frontend

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[ISC](LICENSE) 