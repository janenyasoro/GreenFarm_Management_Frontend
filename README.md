# GreenHarvest — Frontend

A React-based web application for the GreenFarm Management System. It provides a dashboard and management interface for farms, crops, livestock, expenses, income, inventory, and tasks.

## Tech Stack

- React 19 + Vite
- Redux Toolkit + React Redux (state management)
- React Router DOM (routing)
- Axios (API requests)
- React Hook Form + Yup (form validation)
- Chart.js + React-Chartjs-2 (data visualization)
- Tailwind CSS (styling)
- React Toastify (notifications)
- React Icons

### Prerequisites

- Node.js 18+
- npm

npm run lint     # Run ESL### Installation


## Project Structure

```
GreenFarm_Management_Frontend/
├── public/          # Static assets
├── src/
│   ├── api/         # Axios API calls
│   ├── components/  # Reusable UI components
│   ├── context/     # React context providers
│   ├── pages/       # Page-level components
│   ├── styles/      # Global styles
│   ├── App.jsx      # Root component
│   └── main.jsx     # Entry point
├── index.html
├── vite.config.js
└── tailwind.config.js
```

## Environment Setup

Create a `.env` file in the root of the frontend directory and set the backend API base URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Features

- User authentication (login / register)
- Farm dashboard with charts and summaries
- Crop tracking with growth stage management
- Livestock management with health records
- Expense and income recording
- Inventory tracking with low-stock alerts
- Task management with priority and status tracking
- Admin panel

## Contributors

| Name             | Role                |
|------------------|---------------------|
| Felix Macharia   | Frontend Developer  |
| Hiel Sang        | Frontend Developer  |
| Jane Nyasoro     | Frontend Developer  |
| Gloria Wanja     | Frontend Developer  |
| Ezra Kipyego     | Frontend Developer  |
| Ian Kinoti       | Frontend Developer  |
