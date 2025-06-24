# 📝 To-Do App (Next.js + Zustand + Tailwind CSS)

This is a simple, clean, and responsive To-Do application built using **Next.js**, **Zustand** for state management, and **Tailwind CSS** for styling. The UI is designed to be pixel-perfect based on Figma designs, with smooth interactions and clearly defined task sections.

---

## 🚀 Features

* 📋 Add, edit, and delete tasks
* ✅ Status support: Pending, In Progress, Completed
* 📂 Group tasks using Accordion by status
* 🎯 Task card with avatar, description, date, and actions
* 💾 Zustand-based local state management
* 🌐 Responsive layout with pixel-perfect CSS using Tailwind
* 🔥 Smooth hover states and transition effects

---

## 🧱 Tech Stack

* **Next.js 14 (App Router)**
* **TypeScript**
* **Zustand** for global state
* **Tailwind CSS**
* **ShadCN/UI components**
* **Lucide Icons**
* **Sonner** for toast notifications

---

## 📁 Folder Structure

```bash
/components         # UI components like TaskCard, Accordion, Input
/pages              # App routes
/store              # Zustand store
/styles             # Global styles and Tailwind config
/public             # Static assets
```

---

## 🛠️ Setup Instructions

```bash
git clone https://github.com/your-username/todo-app
cd todo-app
npm install
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📌 Notes

* No external backend required – all data is stored in Zustand state.
* Use the "Add Task" button to create a new task.
* Edit or delete tasks via the action buttons on each task card.
* Status dropdown on the edit screen dynamically updates task status.

---

## 📸 UI Screens

* Home Page: Header, Search, Accordion by status
* Add Task Page: Title, Description input
* Edit Task Page: Pre-filled values + Status dropdown

---

## 📃 License

MIT

---

Enjoy building and customizing your To-Do app! ✨
