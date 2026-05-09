# Civic Navigator

<div align="center">
  <img width="800" alt="Civic Navigator Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

> Testing Finally completed

---

Civic Navigator is an AI-powered application built with TypeScript and Node.js, designed to help users seamlessly interact with their local civic resources. This project demonstrates how to run and deploy an AI Studio app quickly and easily.

View the App in AI Studio: [Civic Navigator – AI Studio](https://ai.studio/apps/58ab6e5c-1d99-406b-a4d6-5144d6e5cb1b)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Fast setup for AI-powered civic engagement applications
- Written in TypeScript (98.5%)
- Quick local development and deployment
- Easily configurable with environment variables
- Ready for Gemini API integration

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (preferably the latest LTS version)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOGARATHNAM-S/Civic-Navigator.git
   cd Civic-Navigator
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Copy the example file if provided (`.env.example` or similar), or create a new `.env.local` in the project root.
   - Add your Gemini API key:
     ```env
     GEMINI_API_KEY=your-gemini-api-key
     ```
4. **Run the app in development mode:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

## Environment Variables

- `GEMINI_API_KEY` — Required for integrating with the Gemini API. Add this in `.env.local`.

## Project Structure

A typical project structure might look like:

```
Civic-Navigator/
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── public/
│   └── ...
├── .env.local
├── package.json
└── README.md
```

## Tech Stack

- **Language:** TypeScript (98.5%)
- **Backend/Logic:** Node.js
- **Other:** Gemini AI API, npm scripts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).  
See the [LICENSE](LICENSE) file for more details.

---

<div align="center">
  <strong>Made with ❤️ in TypeScript</strong>
</div>
