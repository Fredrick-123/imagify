# 📸 Imagify – AI Image Generator SaaS

**Imagify** is a full-stack SaaS application that transforms **text prompts into stunning AI-generated images** using the **ClipDrop API**.  
It comes with a **credit-based system** and **payment gateway integration**.  


## ✨ Features  

- 🔮 **AI Image Generation** – Enter any prompt and get a unique, high-quality image.  
- 🎟 **Credit System** – Every user gets **3 free credits** (1 credit = 1 image).  
- 💳 **Payment Gateway** – Purchase more credits seamlessly to keep creating.  
- 📥 **Download & Share** – Instantly download your creations and share them anywhere.  
- 🔐 **Authentication & User Accounts** – Track usage, credits, and payments securely.  


## ⚙️ How It Works  

1. 📝 **Describe Your Vision** – Type a phrase, sentence, or paragraph.  
2. ⚡ **Watch the Magic** – AI transforms your text into an image in seconds.  
3. 📤 **Download & Share** – Save it or share directly with the world.  

## 🚀 Tech Stack  


[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)  
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)  
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)](https://jwt.io/)  
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?logo=razorpay)](https://razorpay.com/)  
[![Vercel](https://img.shields.io/badge/Frontend%20Deployed%20On-Vercel-black?logo=vercel)](https://vercel.com/)  
[![Render](https://img.shields.io/badge/Backend%20Deployed%20On-Vercel-black?logo=render)](https://vercel.com/)

- **Frontend:** React (Vite) + TailwindCSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB
- **Payments:** Razorpay  
- **AI Engine:** ClipDrop API  

## 📂 Project Structure  

---
```bash
imagify/
├── client/ # Frontend (React + Vite)
│ ├── public/ # Static assets
│ ├── src/ # Main source code
│ │ ├── assets/ # Images, icons, etc.
│ │ ├── components/ # Reusable UI components
│ │ ├── context/ # Context API (state management)
│ │ ├── pages/ # App pages
│ │ ├── App.jsx
│ │ ├── index.css
│ │ └── main.jsx
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── postcss.config.js
│ ├── tailwind.config.js
│ └── vite.config.js
│
├── server/ # Backend (Node.js + Express)
│ ├── config/ # Configuration files
│ ├── controllers/ # Route controllers (business logic)
│ ├── middlewares/ # Custom middlewares
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── package.json
│ ├── package-lock.json
│ └── server.js
│
└── README.md # Project documentation
```


## 📦 Installation  

### Clone the repository:

```bash
git clone https://github.com/your-username/imagify.git
```

### Setup Frontend 
```sh
cd frontend
npm install
npm run dev
```

### Setup Backend
```sh
cd backend
npm install
npm run dev
```

## 📜 License
This project is licensed under the **MIT License**.