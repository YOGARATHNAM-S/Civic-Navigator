# 🚀 Bengaluru Civic Navigator

AI-powered civic assistance platform for Bengaluru citizens using **Gemini AI**, **Elasticsearch**, **MongoDB**, and **React.js**.

---

# 📌 Overview

Bengaluru Civic Navigator is an intelligent civic support platform that helps citizens access government-related information through an AI-powered chatbot and smart search engine.

The platform provides guidance for:

- BBMP services
- BESCOM electricity services
- BWSSB water services
- Property tax queries
- Traffic fines
- Senior citizen schemes
- RERA complaints
- Public grievance support

---

# 🏗️ System Architecture

```text
User
   ↓
React Frontend
   ↓
Node.js / Express Backend
   ↓
Elasticsearch Search Layer
   ↓
Gemini API (Google AI Studio)
   ↓
MongoDB Database
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

## 🤖 AI Civic Chatbot
- Natural language interaction
- Kannada + English support
- Smart civic guidance

## 🔍 Smart Search
- Elasticsearch-powered document retrieval
- Fast civic information lookup

## 📝 Complaint Management
- Submit complaints
- AI-based complaint categorization
- Track complaint history

## 📊 Admin Dashboard
- Manage civic documents
- Monitor complaints
- Upload knowledge base files

## 🔒 Security
- JWT Authentication
- API rate limiting
- Helmet security middleware
- Environment variable protection

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

Get your API key from Google AI Studio:

```text
https://aistudio.google.com/app/apikey
```

## Install SDK

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

## Verify Installation

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

Database name:

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

1. User asks civic question
2. Backend searches Elasticsearch
3. Relevant documents retrieved
4. Context sent to Gemini API
5. AI generates intelligent response
6. Chat history stored in MongoDB

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

## Run Using Docker Compose

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
- 📱 Mobile Application
- 🌍 Multilingual Translation
- 💬 WhatsApp Integration
- 🚦 Real-Time Civic Alerts

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
> How to pay BBMP property tax?

### AI Response
- Step-by-step instructions
- Required documents
- Official process explanation

---

## 🚰 Complaint Assistance

### User Query
> Water leakage issue in my area

### AI Action
- Categorizes complaint
- Suggests responsible department
- Stores complaint record

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
