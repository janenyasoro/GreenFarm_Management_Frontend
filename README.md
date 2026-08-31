# GreenHarvest Farm Management Frontend

GreenHarvest is a responsive web application for organising and monitoring farm operations. It provides a clear interface for farm owners and staff to manage livestock, animal health, finances, inventory, and platform administration through the GreenHarvest API.

**Live application:** [https://greenfarm-management-frontend.onrender.com/](https://greenfarm-management-frontend.onrender.com/)

**Backend API:** [https://greenfarm-management-backend-kwjs.onrender.com/](https://greenfarm-management-backend-kwjs.onrender.com/)

## Features

- Public landing page with sign-in and registration entry points.
- JWT-based authentication with persistent browser sessions and automatic sign-out for expired or unauthorized sessions.
- Protected dashboard showing farm statistics, activity, and quick actions.
- Livestock management, including animal details and linked health-record pages.
- Health-record tracking for vaccinations, checkups, treatments, due dates, and veterinary notes.
- Expense and income recording for farm financial tracking.
- Inventory management for supplies, quantities, units, and reorder levels.
- Role-protected administration pages for user and farm management.
- Reusable resource-management forms for creating, editing, listing, and deleting records.
- Responsive navigation, notifications, charts, and animated user-interface elements.

## Technology

| Area | Technology |
| --- | --- |
| UI framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router |
| API client | Axios |
| Forms and validation | React Hook Form, Yup, and Hookform Resolvers |
| Data visualisation | Chart.js, React Chart.js 2, Recharts |
| Styling | Tailwind CSS and custom CSS |
| UI feedback | React Toastify, Lucide React, React Icons, Framer Motion |
| State tooling | React Context; Redux Toolkit and React Redux are available in the project |
| Hosting | Render |

## Project structure

```text
.
├── public/
│   └── _redirects                 # SPA route fallback for deployment
├── src/
│   ├── api/api.js                 # Axios instance and authentication interceptors
│   ├── components/
│   │   ├── common/                # Layout, navigation, footer, route protection
│   │   ├── dashboard/             # Dashboard cards and activity components
│   │   └── ui/                    # Reusable UI elements
│   ├── context/                   # Authentication provider and hook
│   ├── pages/                     # Route-level screens and admin screens
│   ├── styles/                    # Shared styling
│   ├── App.jsx                    # Application routes
│   └── main.jsx                   # React entry point
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- A running GreenHarvest backend API

### Installation

1. Clone the repository and enter the project directory.

   ```bash
   git clone <repository-url>
   cd GreenFarm_Management_Frontend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create a `.env` file at the repository root and set the API base URL.

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

Vite will print the local address, typically `http://localhost:5173`.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for review |
| `npm run lint` | Runs ESLint across the project |

## Environment configuration

The API client reads the first defined setting below, then falls back to `/api`:

1. `VITE_API_BASE_URL`
2. `VITE_API_URL`
3. `VITE_API_BASE`

For the deployed frontend, configure the Render environment with:

```env
VITE_API_BASE_URL=https://greenfarm-management-backend-kwjs.onrender.com/api
```

Vite exposes only variables prefixed with `VITE_` to browser code. Because they are embedded during the build, redeploy the frontend after changing an environment variable.

## Authentication and access control

The app signs users in through `/auth/login` and stores the JWT access token and user profile in browser local storage. Axios attaches the token to API requests as:

```http
Authorization: Bearer <access_token>
```

On application startup, the authentication provider verifies a stored session with `/auth/profile`. If an API call returns `401 Unauthorized`, stored session data is cleared and the user is redirected to the login page.

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/login` | Public | User sign-in |
| `/register` | Public | Account registration |
| `/dashboard` | Authenticated | Farm dashboard and summary data |
| `/livestock` | Authenticated | Livestock management |
| `/health-records/:livestock_id` | Authenticated | Health records for a selected animal |
| `/expenses` | Authenticated | Expense tracking |
| `/income` | Authenticated | Income tracking |
| `/inventory` | Authenticated | Inventory tracking |
| `/admin/users` | Admin | User administration |
| `/admin/farms` | Admin | Farm administration |

## API integration

The interface communicates with the backend through a shared Axios client. Core resource screens use the following API areas:

| UI area | API endpoint |
| --- | --- |
| Authentication | `/auth/register`, `/auth/login`, `/auth/profile` |
| Dashboard | `/dashboard/*` |
| Livestock | `/livestock` |
| Health records | `/health/livestock/:livestock_id/health-records` |
| Expenses | `/expenses` |
| Income | `/income` |
| Inventory | `/inventory` |
| Administration | `/admin/*` |

The server must allow the frontend origin through its CORS configuration.

## Deployment

This app is deployed on Render as a static single-page application. The `public/_redirects` rule sends all routes to `index.html`, which allows React Router pages such as `/dashboard` to load correctly on refresh.

Suggested Render settings:

| Setting | Value |
| --- | --- |
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |
| Environment variable | `VITE_API_BASE_URL=https://greenfarm-management-backend-kwjs.onrender.com/api` |

After deployment, visit the [live application](https://greenfarm-management-frontend.onrender.com/) and confirm that registration, login, and a protected page can reach the API.

## Agile delivery and team contribution

This project was delivered using Scrum practices. As Scrum Master, I supported the team by facilitating sprint planning, daily stand-ups, reviews, and retrospectives; helping refine and prioritise work; removing blockers; and maintaining transparent communication around the sprint goal and progress.

| Contributor | Role |
| --- | --- |
| _Your name_ | Scrum Master |
| Felix Macharia | Frontend Developer |
| Hiel Sang | Frontend Developer |
| Jane Nyasoro | Frontend Developer |
| Gloria Wanja | Frontend Developer |
| Ezra Kipyego | Frontend Developer |
| Ian Kinoti | Frontend Developer |

Replace `_Your name_` with your name before publishing the project documentation.

## Contributing

1. Create a branch from `main`.
2. Keep changes focused and never commit `.env` files or secrets.
3. Run `npm run lint` and `npm run build` before opening a pull request.
4. Describe user-facing changes and any required backend or environment updates in the pull request.

## License

No license has been specified for this repository. Add one before distributing the project outside the team.
