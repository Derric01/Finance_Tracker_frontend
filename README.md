# 💰 Smart Personal Finance Tracker (Frontend)

The **Smart Personal Finance Tracker** is a full-featured web application that helps users take control of their finances with powerful tools for tracking transactions, setting budgets, managing financial goals, and receiving AI-driven insights.

Built with **Next.js**, **Tailwind CSS (DaisyUI)**, and powered by a **Node.js + MongoDB** backend, this app offers an intuitive interface, multi-currency support, reminder system, and AI financial assistant using **Gemini API**.

---

## 🚀 Live Deployment

> ⚠️ **IMPORTANT**: Before opening the frontend, click the backend Render link to wake the server. This avoids any connection issues between frontend and backend.

🔗 **Backend (Render)**:  
👉 [https://finance-tracker-backend-m5sf.onrender.com](https://finance-tracker-backend-m5sf.onrender.com)

🔗 **Frontend (Vercel)**:  
👉 right corner!!

---

## ⚙️ Tech Stack

- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: React Hooks
- **Routing**: Next.js Routing
- **API Handling**: Axios with JWT token support
- **Authentication**: JWT-based, localStorage
- **Backend**: Node.js + Express.js + MongoDB (via Mongoose)
- **AI Integration**: Gemini API
- **Currency Conversion**: External currency exchange API

---

## 🎯 Core Features

- 🔐 User Authentication (JWT)
- 💸 Income & Expense Tracking with Categories
- 💰 Budget Planning (with visual trackers)
- 🎯 Financial Goal Tracking with Milestones
- ⏰ Smart Reminders for Bills & Goals
- 🧠 AI-powered Financial Insights
- 🌍 Multi-Currency Support (with auto conversion)
- 📈 Dashboard with Graphs & Summaries
- 🎨 Fully Responsive UI (mobile/tablet/desktop)

---

## 🧪 Local Development

```bash
git clone https://github.com/Derric01/Finance_Tracker_frontend.git
cd Finance_Tracker_frontend
npm install

# Set up environment variables
touch .env.local
```

Add the following to `.env.local`:

```
NEXT_PUBLIC_API_URL=https://finance-tracker-backend-m5sf.onrender.com
```

Start the development server:

```bash
npm run dev
```

---

## 📂 Folder Structure

```
/pages         → Next.js routing pages  
/components    → Reusable UI components  
/utils         → Axios config and helper functions  
/styles        → Tailwind and DaisyUI styling
```

---

## 🔒 Security Highlights

- JWT-based secure authentication  
- Password hashing with industry best practices  
- CORS configuration and HTTPS  
- Environment variable-based sensitive data handling  
- Input validation and sanitization  

---

## 🔮 Future Enhancements

- 📱 Mobile app using React Native  
- 📊 Advanced analytics and reporting  
- 🧾 Subscription & debt management tools  
- 🏦 Bank API integration for auto transaction import  
- 👨‍👩‍👧 Family or group-based expense sharing  
- 🔁 Recurring transactions and auto-reminders  

---

## 👨‍💻 Author & Project Links

Developed by **Derric Samson**  
📬 GitHub Profile: [@Derric01](https://github.com/Derric01)

🗂️ Repositories:  
- **Frontend**: [Finance_Tracker_frontend](https://github.com/Derric01/Finance_Tracker_frontend)  
- **Backend**: [Finance_Tracker_backend](https://github.com/Derric01/Finance_Tracker_backend)

🌐 Live Links:  
- Backend (Render): [https://finance-tracker-backend-m5sf.onrender.com](https://finance-tracker-backend-m5sf.onrender.com)  
- Frontend (Vercel): [https://finance-tracker-frontend-tan.vercel.app/](https://finance-tracker-frontend-tan.vercel.app/)

