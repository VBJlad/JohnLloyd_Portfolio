# John Lloyd Danton — Portfolio Website

> Modern, responsive, and interactive developer & project coordinator portfolio built with HTML5, CSS3, and a dynamic Vanilla JavaScript content-driven engine.

---

## 🚀 Live Preview
- **Local:** `http://localhost:3000`
- **Portfolio Owner:** John Lloyd Danton (IT Graduate • Web Development & Agile Project Delivery)
- **Location:** Tagaytay, Calabarzon, Philippines

---

## ✨ Features
- **Data-Driven CMS Pattern (`data/content.js`):** Easily update bio, skills, timeline, and projects in a single JavaScript file without modifying HTML or CSS.
- **Interactive Particle Mesh:** Canvas-based dynamic background with mouse repel physics.
- **Dark / Light Theme Engine:** Smooth theme switching with system preference detection and `localStorage` persistence.
- **Interactive CLI Terminal Emulator:** Functional in-browser terminal supporting commands like `help`, `whoami`, `skills`, `certifications`, `education`, `contact`, and `coffee`.
- **Project Case Studies & Filtering:** Filterable category tabs and responsive modal detail views.
- **Interactive Code Preview Card:** Dynamic tabbed code viewer showcasing `App.java`, `queries.sql`, and `sprint.js`.
- **Agile & Skills Matrix:** Visual breakdown of Programming, Web Development, Agile/Scrum Delivery, and Tools/QA.
- **Direct Contact & Local Timezone Clock:** Real-time clock for Manila (`UTC+8`) and interactive message form with toast alerts.

---

## 📁 Project Structure

```text
├── index.html          # Semantic HTML5 structure & SEO metadata
├── data/
│   └── content.js      # ★ YOUR CMS — all content, projects, bio, skills, and timeline
├── css/
│   └── style.css       # Complete design system, glassmorphism, responsive styles
├── js/
│   └── main.js         # Interactive rendering engine & UI controllers
├── .gitignore          # Git ignore rules for system/editor files
└── README.md           # Project documentation
```

---

## 🛠️ How to Run Locally

You can run this project using any local HTTP server. For example:

### Using Python:
```bash
python3 -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✏️ How to Edit Content

To change any information on the website (add new projects, update skills, change your bio):
1. Open `data/content.js`.
2. Edit the corresponding object (`meta`, `projects`, `skills`, or `timeline`).
3. Save the file and refresh your browser!

---

## 📬 Contact
- **Email:** [lloyd.danton02@gmail.com](mailto:lloyd.danton02@gmail.com)
- **Phone:** +63 919 775 2848
- **LinkedIn:** [linkedin.com/in/johnlloyddanton](https://linkedin.com/in/johnlloyddanton)
