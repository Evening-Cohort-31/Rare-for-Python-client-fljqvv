# Rare: The Publishing Platform for the Discerning Writer

Rare is a full-stack publishing platform where writers create and share posts, readers discover content by tag and category, and administrators keep the platform running smoothly. This repository is the **React client** that consumes the [Rare API](https://github.com/Evening-Cohort-31/Rare-for-Python-api-fljqvv).

Built by Evening Cohort 31 at [Nashville Software School](https://nashvillesoftwareschool.com) as the first full group project in the backend curriculum.

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Bulma](https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=bulma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

---

## Related Repository

| Repo | Description |
| ---- | ----------- |
| [Rare API](https://github.com/Evening-Cohort-31/Rare-for-Python-api-fljqvv) | Python `http.server` back end with SQLite |

---

## Features

- **Authentication:** register, log in, and log out
- **Posts:** create, edit, and delete posts with categories, tags, and images
- **Comments:** add, edit, and delete comments on posts
- **Reactions:** react to posts using emoji reactions
- **Author Profiles:** view any author's profile and follow their content
- **Profile Management:** update your own profile details and photo
- **Admin Controls:** promote or demote users, manage categories and tags, deactivate authors, and delete any post

---

## Setup & Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- The [Rare API](https://github.com/Evening-Cohort-31/Rare-for-Python-api-fljqvv) running locally on port `8088`

### Steps

1. Set up and start the [Rare API](https://github.com/Evening-Cohort-31/Rare-for-Python-api-fljqvv) first. See that repo's README for instructions.

2. Clone this repository:

   ```bash
   git clone git@github.com:Evening-Cohort-31/Rare-for-Python-client-fljqvv.git
   cd Rare-for-Python-client-fljqvv
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

> The client expects the API to be available at `http://localhost:8088`. Make sure the Python server is running before starting the client.

---

## Contributors

| Name | GitHub |
| ---- | ------ |
| Dale Hobbs | [@DaleHobbs-Dev](https://github.com/DaleHobbs-Dev) |
| James Freeman | [@jamesfreeman114](https://github.com/jamesfreeman114) |
| Nicole D'Anton | [@nicolecdanton](https://github.com/nicolecdanton) |
| Marcus Upton | [@MDUpton1323](https://github.com/MDUpton1323) |
| Steve Brownlee | [@stevebrownlee](https://github.com/stevebrownlee) |
| Valerie Freeman | [@Valerie-Freeman](https://github.com/Valerie-Freeman) |
