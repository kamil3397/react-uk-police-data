# React UK Police Data App

A React + TypeScript app using the [UK Police Data API](https://data.police.uk/docs/).

## 🛠 Tech Stack

- React 18
- TypeScript
- Context API for global state
- SCSS Modules
- Vite

## 🚀 Run Locally

```bash
git clone https://github.com/kamil3397/react-uk-police-data.git
cd react-uk-police-data
npm install
npm run dev
```

## 🧭 Pages

- `/` – Home
- `/forces` – List of police forces
- `/forces/:id` – Force details
- `/crimes` – Crimes by force & month

## 🌐 API Endpoints Used

- GET /forces
- GET /forces/:id
- GET /crimes-no-location?force=&date=
