# Smart Personal Finance Tracker - Frontend

A modern and intuitive financial management application built with Next.js, React, and DaisyUI.

## Features

- User authentication (login/register)
- Dashboard with financial overview
- Transaction management
- Budget tracking
- Financial goals
- Currency conversion
- AI-powered financial advice

## Tech Stack

- Next.js
- React
- TailwindCSS with DaisyUI
- Axios for API communication

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Derric01/Finance_Tracker_frontend.git
cd Finance_Tracker_frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

This application is configured for easy deployment on Vercel.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of the backend API
