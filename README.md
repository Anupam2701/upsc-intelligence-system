# 🚀 UPSC Intelligence System

### Your AI-powered Study Command Center for Competitive Exams
---

## 🧠 Overview

**UPSC Intelligence System** is a full-stack productivity and analytics platform designed for serious aspirants preparing for competitive exams like:

* UPSC CSE
* RBI Grade B / SEBI / NABARD / IRDAI
* Placement & Interview Preparation

It combines **tracking, analytics, notes, and AI** into a single unified dashboard.

---

## ✨ Core Features

### 📊 1. Dashboard (Performance Overview)

* Total study time tracking
* Study streak monitoring
* Session count & consistency
* Subject-wise distribution

---

### 📅 2. Daily Command Center

Your **execution layer** 👇

* ⏱ Log study sessions (subject, topic, time, quality)
* 📈 Focus score calculation
* 🧾 Timeline view of daily sessions
* 📝 Todo system:

  * Today’s plan ☀️
  * Tomorrow’s plan 🌙
* 🔁 Auto carry-forward (tomorrow → today)

---

### ⚡ 3. Smart Quick Add

* Add sessions instantly
* Includes:

  * Subject
  * Topic
  * Duration
  * Quality score
  * Exam type dropdown:

    * UPSC CSE
    * RBI / SEBI / NABARD / IRDAI
    * Interview Prep

---

### 📆 4. Calendar View

* Visualize study consistency
* Track daily productivity trends

---

### 📈 5. Analytics Engine

* Weekly trends
* Subject-wise distribution
* Daily performance graph
* Total time insights

---

### 🧾 6. Dynamic Notes System

Fully flexible and exam-aware 👇

* Create notes by:

  * Exam
  * Subject (dynamic)
  * Topic / Subtopic
* Features:

  * Auto subject creation
  * Search notes
  * Edit & delete notes
* Structured for:

  * Concept building
  * Revision
  * Answer writing

---

### 🤖 7. AI Intelligence Layer

#### 🔹 AI Planner

* Generates **next-day study plan**
* Based on:

  * Study sessions
  * Weak/strong subjects
  * Productivity patterns

#### 🔹 AI Chat

* Ask anything:

  * UPSC concepts
  * Strategy doubts
  * Interview prep

#### 🔹 AI Strategy Analysis

* Analyzes your preparation
* Suggests:

  * Weak areas
  * Strong areas
  * Prelims strategy
  * Mains answer writing plan

---

## 🏗 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL (Supabase)

### AI Layer

* Groq API (LLaMA models)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
frontend/
  ├── components/
  ├── pages/
  ├── App.jsx

backend/
  ├── app/
      ├── models/
      ├── routes/
      ├── schemas/
      ├── services/
      ├── main.py
```

---

## 🔌 API Endpoints

### Sessions

* `GET /sessions/`
* `POST /sessions/`
* `DELETE /sessions/{id}`

### Notes

* `GET /notes/?exam=...`
* `GET /notes/subjects?exam=...`
* `POST /notes/`
* `PUT /notes/{id}`
* `DELETE /notes/{id}`

### Todos

* `GET /todos/`
* `POST /todos/`
* `PUT /todos/{id}`
* `DELETE /todos/{id}`

### AI

* `GET /ai/plan`
* `POST /ai/chat`
* `GET /ai/strategy`

---

## ⚙️ Setup (Local Development)

### 1. Clone Repo

```bash
git clone https://github.com/your-username/upsc-intelligence-system.git
cd upsc-intelligence-system
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create `.env`:

```env
GROQ_API_KEY=your_api_key_here
DATABASE_URL=your_supabase_db_url
```

Run:

```bash
uvicorn app.main:app --reload
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

| Variable     | Description |
| ------------ | ----------- |
| GROQ_API_KEY | AI API Key  |
| DATABASE_URL | Supabase DB |

⚠️ Never commit `.env` file

---

## 🚀 Future Improvements

* AI-powered revision reminders
* Smart streak tracking
* Personalized learning paths
* Voice-based AI assistant
* PYQ integration

---

## 💡 Vision

To build a **single intelligent system** where:

* Planning
* Execution
* Analysis
* Learning

…all happen in one place.

---

## 👨‍💻 Author

**Anupam Upadhaya**
🔗 https://github.com/Anupam2701

---

## ⭐ If you like this project

Give it a ⭐ on GitHub — it helps a lot!
