# ArchiAi

An AI-powered application that generates a comprehensive software architecture plan, technology stack recommendation, cost analysis, project roadmap, and a detailed Product Requirements Document (PRD) based on a simple project idea.

---

## ✨ Features

- **🤖 AI-Powered Generation:** Leverages the Gemini API to create detailed project plans from a single prompt.
- **🏗️ Architectural Overview:** Generates a full system architecture, including frontend, backend, database, and deployment strategies.
- **💡 Tech Stack Recommendations:** Suggests appropriate technologies for each part of the architecture.
- **💰 Cost Estimation:** Provides a monthly cost breakdown visualized in a clear, interactive chart.
- **🗺️ Project Roadmap:** Lays out a phased project roadmap with key tasks for each stage.
- **📄 PRD & Export:** Creates a complete Product Requirements Document (PRD) that can be viewed in-app and exported as a Markdown file.
- **💅 Modern UI:** Sleek, responsive, and stylish dark-mode interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI/ML:** Google Gemini API (`@google/genai`)
- **Charting:** Recharts
- **Deployment:** Designed for modern static hosts (e.g., Vercel, Netlify, Cloudflare Pages, Firebase Hosting)

---

## 🚀 Getting Started

### Prerequisites

- An active Google AI Studio API Key.
- Node.js and npm installed.
- A modern web browser.

### Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/archiai.git
    cd archiai
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **API Key Configuration:**
    - Create a `.env.local` file in the project root:

      ```env
      GEMINI_API_KEY=your_google_gemini_api_key
      ```

    - _Never commit your API key to version control._
4. **Run the application locally:**

    ```sh
    npm run dev
    ```

    Open the provided URL (e.g., `http://localhost:5173`) in your browser.

---

## ☁️ Deployment

You can deploy ArchiAi to **Cloudflare Pages**, **Netlify**, or **Vercel**. All support environment variables and custom domains.

### 1. Cloudflare Pages

- Connect your GitHub repo in Cloudflare Pages.
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:**
  - Key: `GEMINI_API_KEY`
  - Value: your Gemini API key
- After deploy, add your custom domain (`archiai.thbz.in`) in the Pages dashboard and follow the DNS instructions (add a CNAME for `archiai` pointing to your Cloudflare Pages URL).

### 2. Netlify

- Connect your GitHub repo in Netlify.
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Environment variable:**
  - Key: `GEMINI_API_KEY`
  - Value: your Gemini API key
- After deploy, go to Site settings → Domain management → Add custom domain (`archiai.thbz.in`). Add a CNAME for `archiai` pointing to your Netlify subdomain.

### 3. Vercel

- Import your GitHub repo in Vercel.
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:**
  - Key: `GEMINI_API_KEY`
  - Value: your Gemini API key
- After deploy, go to Project → Settings → Domains → Add `archiai.thbz.in`. Add a CNAME for `archiai` pointing to your Vercel subdomain.

#### **DNS Setup for All Providers**

- **Type:** CNAME
- **Name:** `archiai`
- **Value:** (your platform’s provided subdomain, e.g., `your-site.netlify.app`, `your-site.pages.dev`, or `your-site.vercel.app`)

---

## Usage

1. **Describe Your Idea:** Open the application and you'll see a large text area. Type in a description of the software or application you want to build.
    > _Example: "A social media platform for pet owners to share photos and schedule playdates."_
2. **Generate the Plan:** Click the "Generate Plan" button.
3. **Review the Dashboard:** The AI will process your request and present a dashboard containing:
    - The System Architecture Diagram
    - The Project Roadmap
    - The Monthly Cost Estimation
    - The Scalability and Security Plans
4. **View the PRD:** Click the "PRD" tab to see the detailed Product Requirements Document.
5. **Export:** Click the "Export as Markdown" button within the PRD view to save a local copy of the document.
6. **Start a New Project:** Click the "New Project" button in the header to clear the results and start over.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

## 📬 Contact

- **Author:** Tony Sebastian (THBZ)
- **GitHub:** [tonysebastine](https://github.com/tonysebastine)
- **LinkedIn:** [tonysebastine](https://www.linkedin.com/in/tonysebastine/)

---

## 📸 Screenshots

_Add screenshots or demo GIFs here to showcase the app UI and features._

---

## 🌐 Live Demo

Check out the live demo: [archiai.thbz.in](https://archiai.thbz.in)

---

**References:**  

- [How to create a subdomain](https://help.turbify.com/s/article/how-do-i-create-a-subdomain)
- [How to point a subdomain to a web app](https://www.westhost.com/knowledgebase/pages/viewinfo.action?pageId=1114233)

If you need step-by-step help for your specific host or DNS provider, let me know which one you’re using!
