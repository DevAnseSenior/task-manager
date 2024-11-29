
# Task Manager

## 📋 Project Description

Task Manager is a lightweight and efficient task management application designed to help users organize, track, and manage their daily tasks with ease. The project is built using **Node.js** with a custom architecture, focusing on simplicity and performance.

## 🚀 Features

- ✅ Create, read, update, and delete tasks (CRUD operations).
- 🗂️ Organize tasks by categories or status.
- 📅 Track deadlines and progress.
- 🔍 Simple and user-friendly API for task management.

## 🛠️ Project Structure

```
/src
  ├── /middlewares
  │     └── json.js               # Middleware for handling JSON requests
  ├── /utils
  │     ├── build-route-path.js   # Utility for building route paths dynamically
  │     └── validate-task.js      # Function to validate task fields
  ├── database.js                 # Mock database for task storage
  ├── routes.js                   # API route definitions
  └── server.js                   # Server configuration and startup
/streams
  ├── import-tasks.js             # Reads a task file and registers the items in the database using streams
  └── tasks.csv                   # File CSV w/ 250 tasks
```



## 🔧 Installation and Setup

Follow the steps below to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevAnseSenior/task-manager.git
   cd task-manager
   ```

2. **Install dependencies** (if applicable):
   ```bash
   npm install
   ```

3. **Run the server**:
   ```bash
   node src/server.js
   ```

4. **Access the API**:  
   The API will be available at `http://localhost:3334` (or the configured port).

5. **Run the import via .CSV** with the project running, in another terminal window run the following command:
   ```bash
   node streams/import-tasks.js
   ```


## 📄 API Endpoints

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/tasks`                | Retrieve all tasks       |
| POST   | `/tasks`                | Create a new task        |
| PUT    | `/tasks/:id`            | Update a task by ID      |
| DELETE | `/tasks/:id`            | Delete a task by ID      |
| PATCH  | `/tasks/:id/complete`   | Update task status by ID |

### Request Example (POST `/tasks`)
```json
{
  "title": "Complete project",
  "description": "Finish the task manager project",
  "status": "in-progress"
}
```

### Response Example
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager project",
  "status": "in-progress",
  "createdAt": "2024-11-29T12:00:00Z"
}
```

## 📚 Technologies Used

- **Node.js** – Backend runtime environment.
- **JavaScript** – Main programming language.
- **Custom Middleware** – JSON handling.
- **File-based Mock Database** – For lightweight storage.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📞 Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub**: [DevAnseSenior](https://github.com/DevAnseSenior)
- **Linked**: [Anderson Coelho](https://www.linkedin.com/in/devanse)
