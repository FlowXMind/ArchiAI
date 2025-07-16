# ArchiAi

An AI-powered application that generates a comprehensive software architecture plan, technology stack recommendation, cost analysis, project roadmap, and a detailed Product Requirements Document (PRD) based on a simple project idea.

## ✨ Features

- **🤖 AI-Powered Generation:** Leverages the Gemini API to create detailed project plans from a single prompt.
- **🏗️ Architectural Overview:** Generates a full system architecture, including frontend, backend, database, and deployment strategies.
- **💡 Tech Stack Recommendations:** Suggests appropriate technologies for each part of the architecture.
- **💰 Cost Estimation:** Provides a monthly cost breakdown visualized in a clear, interactive chart.
- **🗺️ Project Roadmap:** Lays out a phased project roadmap with key tasks for each stage.
- **📄 PRD & Export:** Creates a complete Product Requirements Document (PRD) that can be viewed in-app and exported as a Markdown file.
- **💅 Modern UI:** Sleek, responsive, and stylish dark-mode interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI/ML:** Google Gemini API (`@google/genai`)
- **Charting:** Recharts
- **Deployment:** Designed for modern static hosts (e.g., Vercel, Netlify, Firebase Hosting)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- An active Google AI Studio API Key.
- A modern web browser.
- A local web server to serve the files. You can use the VS Code "Live Server" extension or run a simple server from your terminal. For example, with Python:
    ```sh
    python -m http.server
    ```
    Or with Node.js (if you have it installed):
    ```sh
    npx serve
    ```

### Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/archiai.git
    cd archiai
    ```

2.  **API Key Configuration:**
    This application is designed to be deployed to a hosting environment (like Vercel, Netlify, or Firebase) where you can securely configure an `API_KEY` environment variable with your Google Gemini API key. The application code will automatically pick it up from the execution environment.

3.  **Run the application:**
    Start your local web server in the project's root directory and open the provided URL (e.g., `http://localhost:8000`) in your browser.

## Usage

1.  **Describe Your Idea:** Open the application and you'll see a large text area. Type in a description of the software or application you want to build.
    > _Example: "A social media platform for pet owners to share photos and schedule playdates."_
2.  **Generate the Plan:** Click the "Generate Plan" button.
3.  **Review the Dashboard:** The AI will process your request and present a dashboard containing:
    - The System Architecture Diagram
    - The Project Roadmap
    - The Monthly Cost Estimation
    - The Scalability and Security Plans
4.  **View the PRD:** Click the "PRD" tab to see the detailed Product Requirements Document.
5.  **Export:** Click the "Export as Markdown" button within the PRD view to save a local copy of the document.
6.  **Start a New Project:** Click the "New Project" button in the header to clear the results and start over.

## 📄 License

Distributed under the MIT License.