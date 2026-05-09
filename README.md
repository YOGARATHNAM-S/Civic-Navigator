# Bengaluru Civic Navigator 🚀

AI-powered civic assistance platform for Bengaluru citizens using **Google Gemini AI**, **Elasticsearch**, **MongoDB**, **React.js**, and **Node.js**.

---

# 📌 Overview

Bengaluru Civic Navigator is a smart civic support platform that helps citizens access government-related services and information through an AI-powered chatbot and intelligent search system.

The platform provides guidance for:

- BBMP services
- BESCOM electricity services
- BWSSB water services
- Property tax queries
- Traffic fine assistance
- Senior citizen schemes
- RERA complaints
- Public grievance systems

---

# 🏗️ System Architecture

```text
                ┌────────────────────┐
                │     React UI       │
                │  Civic Dashboard   │
                └─────────┬──────────┘
                          │
                    HTTP / REST API
                          │
                          ▼
                ┌────────────────────┐
                │  Node.js Backend   │
                │ Express API Layer  │
                └─────────┬──────────┘
                          │
      ┌───────────────────┼───────────────────┐
      │                   │                   │
      ▼                   ▼                   ▼
┌─────────────┐   ┌────────────────┐   ┌──────────────┐
│ MongoDB     │   │ Elasticsearch  │   │ Gemini API   │
│ User Data   │   │ Civic Search   │   │ AI Responses │
└─────────────┘   └────────────────┘   └──────────────┘
```

---

# ⚙️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- JWT Authentication
- Mongoose

## Database
- MongoDB (Local)

## Search Engine
- Elasticsearch (Local)

## AI
- Google Gemini API
- Gemini 1.5 Flash

---

# ✨ Features

## 🤖 AI Civic Assistant
- Conversational AI chatbot
- Kannada + English support
- Smart civic guidance

## 🔍 Smart Search
- Elasticsearch-powered retrieval
- Fast civic information search
- Document indexing support

## 📝 Complaint Management
- Complaint submission
- AI complaint categorization
- Complaint tracking

## 📊 Admin Dashboard
- Manage documents
- Monitor complaints
- Upload civic datasets

## 🔒 Security
- JWT Authentication
- API Rate Limiting
- Helmet Security Middleware
- Environment Variable Protection

---

# 📂 Project Structure

```bash
bengaluru-civic-navigator/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── config/
│   ├── utils/
│   └── server.js
│
├── elasticsearch/
├── uploads/
├── docs/
├── docker-compose.yml
└── README.md
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder.

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/civicnavigator

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

ELASTIC_ENDPOINT=http://localhost:9200

ELASTIC_API_KEY=your_elastic_api_key
```

---

# 🧠 Gemini API Setup

## Get API Key

Visit:

```text
https://aistudio.google.com/app/apikey
```

## Install Gemini SDK

```bash
npm install @google/generative-ai
```

## Example Integration

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const result = await model.generateContent(
  "Explain BBMP property tax process"
);

console.log(result.response.text());
```

---

# 🔍 Elasticsearch Setup

## Download Elasticsearch

```text
https://www.elastic.co/downloads/elasticsearch
```

## Start Elasticsearch

### Windows

```bash
bin\elasticsearch.bat
```

### Linux / macOS

```bash
./bin/elasticsearch
```

## Verify Elasticsearch

Open:

```text
http://localhost:9200
```

---

# 🍃 MongoDB Setup

## Start MongoDB

```bash
mongod
```

## Database Name

```text
civicnavigator
```

---

# 🚀 Backend Installation

```bash
cd backend
npm install
```

## Run Backend

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

---

# 💻 Frontend Installation

```bash
cd frontend
npm install
```

## Run Frontend

```bash
npm start
```

Frontend URL:

```text
http://localhost:3000
```

---

# 🔄 RAG Workflow

1. User asks a civic-related question
2. Backend searches Elasticsearch
3. Relevant civic documents are retrieved
4. Context is sent to Gemini API
5. Gemini generates AI response
6. Chat history is stored in MongoDB

---

# 📡 API Endpoints

## Authentication

```bash
/api/auth/register
/api/auth/login
```

## Chat

```bash
/api/chat
```

## Complaints

```bash
/api/complaints
```

## Search

```bash
/api/search
```

## Documents

```bash
/api/documents
```

## Admin

```bash
/api/admin
```

---

# 🐳 Docker Support

## Run with Docker Compose

```bash
docker-compose up --build
```

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- API Validation
- Rate Limiting
- Secure Headers
- Environment Variable Protection

---

# 🌐 Future Enhancements

- 🎤 Voice Assistant
- 📄 OCR for Government Documents
- 🌍 Multi-language Translation
- 📱 Mobile Application
- 💬 WhatsApp Integration
- 🚦 Real-Time Civic Alerts
- 📊 Analytics Dashboard

---

# 📸 Screenshots

Store screenshots inside:

```text
/docs/screenshots/
```

---

# 📘 Example Use Cases

## 🏠 Property Tax Guidance

### User Query

```text
How to pay BBMP property tax?
```

### AI Response
- Step-by-step instructions
- Required documents
- Official guidance

---

## 🚰 Complaint Assistance

### User Query

```text
Water leakage issue in my area
```

### AI Action
- Categorizes complaint
- Suggests department
- Stores complaint details

---

# 🧪 Sample Dataset

Store civic datasets inside:

```text
/docs/datasets/
```

Supported formats:
- PDF
- JSON
- CSV
- TXT

---

# 👨‍💻 Author

Developed for smart civic assistance and AI-powered governance solutions.

---

# 📄 License

MIT License

---

# ⭐ Project Goal

Build an AI-driven civic ecosystem that simplifies public services and improves citizen engagement using modern AI and search technologies.
