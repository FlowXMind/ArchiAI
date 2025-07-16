# AI Software Architect

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aitech.thbz.in-blue?style=for-the-badge)](https://aitech.thbz.in)

An intelligent assistant that helps you design software architectures. Describe your project, select an architectural style, and get AI-powered recommendations for technology stacks, diagrams, and key considerations.

---

## 🚀 Features

- **AI-Powered Architecture Generation**: Get detailed architecture plans tailored to your project description and preferred style (Microservices, Monolithic, Serverless, Event-Driven, SOA).
- **Tech Stack Recommendations**: Receive suggestions for frontend, backend, database, DevOps, and messaging technologies.
- **Pros & Cons Analysis**: Understand the trade-offs of each architecture.
- **Scalability & Security Guidance**: Get best practices and considerations for robust, secure systems.
- **Interactive Mermaid Diagrams**: Visualize your architecture with auto-generated diagrams.
- **Modern UI**: Clean, responsive interface built with React, TypeScript, and Tailwind CSS.

---

## 🖥️ Demo

- **Live Demo:** [https://aitech.thbz.in](https://aitech.thbz.in)
- ![screenshot](screenshot.png) <!-- Add a screenshot if available -->

---

## ⚡ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ai-software-architect.git
   cd ai-software-architect
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your Gemini API key**
   - Obtain a Google Gemini API key from [Google AI Studio](https://ai.google.dev/gemini-api/docs).
   - Create a `.env.local` file in the root directory.
   - Add your API key:

     ```env
     GEMINI_API_KEY=your_google_gemini_api_key
     ```

4. **Run the app locally**

   ```bash
   npm run dev
   ```

   - The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).
5. **Build for production**

   ```bash
   npm run build
   ```

   - The production-ready files will be in the `dist/` directory.
6. **Preview the production build**

   ```bash
   npm run preview
   ```

   - This serves the built app locally for final testing.

---

## 📦 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Build Tool**: Vite
- **Diagramming**: Mermaid.js

---

## 🏗️ Project Structure

```
├── components/           # UI components (input, output, diagrams, icons, loaders)
├── services/             # AI integration (Gemini API)
├── types.ts              # TypeScript types and enums
├── constants.ts          # Architecture type constants
├── App.tsx               # Main application logic
├── index.tsx             # App entry point
├── index.html            # HTML template, Mermaid.js, Tailwind setup
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
|-- .env.local             # Environment variables (API keys)
```

---

## 📝 Usage

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/ai-software-architect.git
cd ai-software-architect
```

### 2. **Install dependencies**

```bash
npm install
```

### 3. **Set up your Gemini API key**

- Create a `.env.local` file in the root directory.
- Add your Gemini API key:

  ```env
  GEMINI_API_KEY=your_google_gemini_api_key
  ```

### 4. **Run the app locally**

```bash
npm run dev
```

- The app will be available at `http://localhost:5173` (default Vite port).

---

## 🛠️ Environment Variables

- `GEMINI_API_KEY` (required): Your Google Gemini API key for AI-powered architecture generation.

---

## 🏛️ Supported Architecture Types

- Microservices
- Monolithic
- Serverless
- Event-Driven
- Service-Oriented Architecture (SOA)

---

## 🧩 How It Works

1. **Describe your project** and select a preferred architecture style.
2. **Click "Generate Architecture"** to get a detailed plan, including:
   - Overview
   - Tech stack recommendations
   - Pros & cons
   - Scalability & security notes
   - Mermaid.js diagram
3. **Explore the results** in a tabbed interface (Overview, Diagram, Tech Stack, Pros & Cons, Considerations).

---

## 🖼️ Mermaid Diagram Example

The app generates Mermaid diagram code that can be rendered by any Mermaid.js-compatible viewer.

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mermaid.js](https://mermaid-js.github.io/mermaid/#/)

---

<div align="center">
Made with ❤️ for architects and builders.
</div>
