# StitchNexus | Real-Time AI-Powered Data Pipelines & Mapping

StitchNexus is an enterprise-grade web application built to design, test, and orchestrate real-time, high-performance data transformation pipelines. Powered by Gemini AI models, StitchNexus automatically translates natural language constraints into production-ready TypeScript data transformation hooks.

---

## 🚀 Key Architectural Enhancements & Code Review

Following a thorough professional audit and code-quality sweep, the following performance, accessibility, and production-readiness enhancements were implemented across the codebase:

### 1. Robust Server-Side Gemini Integration
* **Production Proxy Pattern**: Configured a custom secure Express server wrapper (`server.ts`) to handle high-performance API requests safely, shielding private developer credentials such as the `GEMINI_API_KEY` from client exposure.
* **Modern TypeScript SDK**: Standardized implementation on the latest official `@google/genai` library with temperature controls (`0.2`) to assure deterministic, executable code output.

### 2. Lighthouse Audit & SEO Optimizations
* **Semantic Meta Framework**: Overhauled `index.html` with robust Open Graph, Twitter Card, viewport, dynamic SVG Favicon, and crawler-friendly meta-data mapping for high indexability.
* **Accessibility (a11y) Compliant Controls**:
  - Bound all modal inputs (Authentication details, Card checkout fields) to explicit programmatic visual labels with accurate `htmlFor` and `id` references.
  - Corrected illegal or outdated SVG markup fields, replacing vanilla XML formatting attributes (e.g., `stroke-width`, `stroke-linecap`) with React's camelCased equivalents (`strokeWidth`, `strokeLinecap`) to remove console warnings and markup errors.
* **Resource Optimization & Preconnects**: Added preconnect headers for Google Font servers to eliminate render-blocking network handshakes during initial fold painting.

### 3. Performance & Lazy Loading Engine
* **Dynamic Code Splitting**: Overhauled core view routing in `App.tsx` using `React.lazy()` and `Suspense` containers. Heavy below-the-fold modules (Pricing, Testimonials, Interactive Sandbox, Security badging, and Authentication modals) now fetch asynchronously on demand.
* **Zero Layout Shift (CLS)**: Designed a lightweight, stable, custom inline-suspense placeholder frame to enforce layout constraint stability while async chunks compile.
* **Passive Image Assets**: Optimized image tags with passive loading parameters (`loading="lazy"`), explicit width/height dimension limits, and `referrerPolicy="no-referrer"` flags to protect client privacy.

---

## 📦 Distribution Files & GitHub Deployment

The static output files required to deploy this high-fidelity platform on GitHub are built automatically inside the local `dist/` directory.

### Structural Manifest for Production
Oncecompiled via `npm run build`, the following structural file layout is compiled:
* **`dist/index.html`**: Entry page mapped to minified assets.
* **`dist/assets/index-[hash].js`**: Compact, tree-shaken, and minified client-side logic bundle.
* **`dist/assets/index-[hash].css`**: Pruned and highly optimized Tailwind CSS stylesheet with zero unused classes.
* **`dist/assets/*.svg` / SVG Data URIs**: Clean icons mapped inside component renders using `lucide-react`.

---

## 🛠️ Automated Deployment via GitHub Actions

This repository includes a pre-configured automated deployment workflow located in `.github/workflows/deploy.yml`. When you push to your main branch, it will automatically build, optimize, and deploy the application to **GitHub Pages**.

### Steps to Deploy Manually to GitHub:

1. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: optimize for production and add deployment workflow"
   ```

2. **Add Remote GitHub Origin & Push**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git branch -M main
   git push -u origin main
   ```

3. **Configure GitHub Pages Settings**:
   * Navigate to your repository page on **GitHub.com**.
   * Go to **Settings** ➔ **Pages**.
   * Under **Build and deployment** ➔ **Source**, select **GitHub Actions** (the workflow will automatically take care of the rest!).
   * Your high-performance app is now live at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`

---

## ⚡ Local Setup & Development

To launch the integrated server environment locally with the Gemini Code Sandbox:

1. **Install Base Packages**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a local `.env` file referencing your private Gemini authorization token:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *The client dev bundle and server middleware will launch concurrently on [http://localhost:3000](http://localhost:3000).*
