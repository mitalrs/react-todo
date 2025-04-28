# 🧩 React To-Do App Challenge

## 📝 Overview

This project is my solution to the **React To-Do App Challenge**. The challenge involved fixing a broken React application and enhancing its functionality. Below, I’ve outlined the steps I took to complete the tasks, along with any additional improvements I made.

---

## ✅ Tasks to Complete

You will be required to do the following:

- [x] **Fix the app to display a list of all tasks**
- [x] **Fix the layout** so checkboxes are properly listed in a column
- [x] **Fix the app to allow adding a new task**
- [x] **Fix the functionality to mark a task as completed**
- [x] **Fix the functionality to delete a task**
- [x] **Fix the count of completed tasks**
- [x] Add a **search feature** to filter tasks
- [x] **Add a filter button** to view:
  - Only completed tasks
  - Only incomplete tasks
  - All tasks

---

## ⭐ Bonus Points

These are optional but appreciated:

- [x] Implement **pagination** or **lazy-loading** if the list has more than 10 items
- [x] Write **test cases** (Jest + React Testing Library preferred)
- [ ] Improve UI/UX or layout
- [ ] Add **accessibility enhancements**
- [ ] Create additional views (like task detail or edit mode)

---

## 🚀 Get Started

To get started with the challenge, clone this repository, install dependencies, and run the app locally:

```bash
git clone https://github.com/mitalrs/react-todo.git
cd react-todo-challenge
npm install
npm run start
```
---
## 📬 Submission Notes

##### Repository Link: [https://github.com/mitalrs/react-todo]

##### Assumptions:

- Assumed that tasks should persist only during the session (not stored in local storage or a database).

##### Challenges Faced:
1. The original app setup required a different Node.js version, so I created a fresh React app and manually moved the code.
2. While implementing search and filter, I didn't want to introduce extra global states to store unfiltered data during every CRUD operation. I solved it using useRef to keep a synced copy of the original todos.
3. During filtering, I faced an issue where updating a task (like marking completed) while a filter was active would reset the original list.
To fix this, I used a useRef to store the "true" original todos, and manually updated it inside a useEffect.
By indexing the todos by their label during updates (finding the correct todo and updating it instead of overwriting), I made sure all real-time changes stay synced even when filters are applied.

---

