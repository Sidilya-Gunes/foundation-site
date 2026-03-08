# OpenHeart Foundation - NGO / Charity Web Template

A modern, full-stack open source web template designed for NGOs, charities, and non-profit organizations. It features a beautiful React frontend and a CMS (Strapi) backend for easy content management.

![Preview](preview.png)
_(Note: Add a screenshot here after deployment)_

## 🚀 Features

- **Modern UI/UX:** Clean, responsive design suitable for reputable organizations.
- **CMS Powered:** Built with [Strapi](https://strapi.io) for managing News, Articles, Reports, and Pages without coding.
- **Dynamic Content:**
  - **News Section:** For press releases and updates.
  - **Blog/Articles:** For opinion pieces and stories.
  - **Reports Archive:** A dedicated section for publishing PDF reports.
  - **Search:** Built-in content search.
- **Responsive:** Works perfectly on mobile, tablet, and desktop.

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Strapi (Headless CMS)
- **Database:** SQLite (Default) / Configurable for Postgres/MySQL

## 📦 Project Structure

```
├── public/          # Static files (index.html, favicon)
├── src/             # React Frontend Code
│   ├── components/  # Navbar, Footer, etc.
│   ├── pages/       # Home, About, Contact pages
│   └── ...
├── server/          # Strapi Backend Code
└── ...
```

## 🏁 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [NPM](https://www.npmjs.com/) (Usually comes with Node.js)

### 2. Install Dependencies

You need to install dependencies for both the `root` (frontend) and `server` folders.

```bash
# 1. Install Frontend Dependencies
npm install

# 2. Install Backend Dependencies
cd server
npm install
cd ..
```

### 3. Start the Project

This project runs the Frontend and Backend separately. You should open **two terminal windows**.

**Terminal 1 (Backend - CMS):**

```bash
cd server
npm run develop
```

_The URL `http://localhost:1337/admin` will open. You will be asked to create an admin user (this is your local admin)._

**Terminal 2 (Frontend - Website):**

```bash
npm start
```

_The website will open at `http://localhost:3000`._

## ⚙️ Configuration

### Environment Variables

For security, all secret keys have been cleared from this template.
When you first run the server, Strapi might ask you to re-generate keys or do it automatically.
If needed, rename `.env.example` to `.env` in the `server/` directory and populate it with your own secure keys.

### Changing Branding

- **Logo & Name:** Edit `src/components/Navbar.tsx` and `Footer.tsx`.
- **Colors:** The colors are defined in `public/index.html` (under `tailwind.config`). You can change the `brand-purple` (Primary) and `brand-green` (Secondary) colors there.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
