# To-Do List App

A fully responsive To-Do List application built as part of an SDE-1 (MERN Stack) assignment. It allows users to create, manage, organize, and track their tasks through a clean and intuitive interface.

Tasks are organized by week, with separate summaries for open and completed tasks.

## Live Demo

- **Frontend:** [todo-assignment-suraj.vercel.app](https://todo-assignment-suraj.vercel.app/)
- **Backend API:** [todo-assignment-bii1.onrender.com](https://todo-assignment-bii1.onrender.com)
- **GitHub Repository:** [github.com/surajkumarsatya/todo-assignment](https://github.com/surajkumarsatya/todo-assignment)

## Features

### Task Management
- Create tasks with a title, description, date, time, and priority.
- Edit existing tasks.
- Delete tasks.
- View detailed task information.
- Mark tasks as Completed or In Progress.

### Weekly Task Organization
- Tasks are grouped by week, from Monday to Sunday.
- Expand weekly sections to view individual tasks.
- Weekly summary cards display open and completed task counts.
- Summary counts update automatically when task statuses change.

### Search
- Search tasks using keywords from their titles and descriptions.
- View, edit, and delete tasks directly from search results.

### User Interface
- Responsive design for mobile, tablet, and desktop.
- Calendar-based date navigation.
- Dedicated task creation and editing interface.
- Clean and intuitive user experience.

## Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript (ES6+)
- Tailwind CSS v4
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

**Deployment**
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

## Project Structure

```
todo-assignment/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── tasks/
│   │   │   └── ui/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/surajkumarsatya/todo-assignment.git
cd todo-assignment
```

### 2. Set Up the Backend

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The API will run at:

```
http://localhost:5000
```

### 3. Set Up the Frontend

Open another terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Configure the API URL in:

`client/src/services/taskService.js`

For local development, use:

```javascript
const API_URL = "http://localhost:5000/api/tasks";
```

Start the frontend:

```bash
npm run dev
```

Open the application at:

```
http://localhost:5173
```

## API Endpoints

Base URL:

```
/api/tasks
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task by ID |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Search Tasks

Search tasks by title or description using the `search` query parameter:

```
GET /api/tasks?search=keyword
```

## Deployment

The application is deployed using separate hosting platforms for the frontend and backend.

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The frontend communicates with the deployed Express API, while MongoDB Atlas stores task data.

## Assignment Submission

**GitHub Repository**
[https://github.com/surajkumarsatya/todo-assignment](https://github.com/surajkumarsatya/todo-assignment)

**Live Application**
[https://todo-assignment-suraj.vercel.app/](https://todo-assignment-suraj.vercel.app/)

**Backend API**
[https://todo-assignment-bii1.onrender.com](https://todo-assignment-bii1.onrender.com)

---

Built with React, Node.js, Express, and MongoDB.