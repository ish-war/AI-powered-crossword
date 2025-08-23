# Crossword AI Game 🎮🧩

A fun and interactive **10×10 crossword puzzle game** built with **React, TypeScript, and Firebase**, featuring:

- Dynamic crossword grid rendering
- Real-time multiplayer gameplay (human vs AI)
- Chat feature for players
- Scoreboard and leaderboard
- Fully responsive and visually appealing UI

---

## 🛠 Features

- **Dynamic 10×10 crossword grid** – puzzles automatically adapt to the grid size
- **AI opponent** – plays alongside human players with adjustable speed
- **Real-time updates** – using Firebase Firestore
- **Interactive chat** – communicate with other players during the game
- **Leaderboard** – shows player rankings at game over
- **Responsive design** – works on desktop and mobile

---

## 📂 Project Structure

```bash
├── src
│ ├── components # UI Components (GameBoard, ClueList, Scoreboard, ChatBox)
│ ├── lib # Game logic and Firebase functions
│ ├── pages # Game screens (Game, GameOver, Lobby)
│ ├── puzzle.ts # Crossword puzzles & helpers
│ ├── types.ts # TypeScript types
│ └── styles.css # Component styles
├── public # Static assets
├── package.json # Dependencies & scripts
└── README.md # This file
```


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ish-war/AI-powered-crossword.git
cd AI-powered-crossword
```

### 2. Install dependencies

```bash
npm create vite@latest crossword-ai -- --template react-ts
cd crossword-ai
npm install
npm i firebase uuid
```

### 3. Firebase Setup Instructions

#### 1. Create a [Firebase Project](https://firebase.google.com/)

- Go to Firebase Console.

- Click "Add project".

- Give your project a name (e.g., Crossword-AI) and click Continue.

- You can choose to enable Google Analytics or skip it.

- Click Create Project. Wait for it to finish.

#### 2. Register a Web App

- In your project dashboard, click Web (</>) to register a web app.

- Enter an app nickname (e.g., crossword-web) and click Register app.

- Firebase will show your configuration keys like:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

- Create a .env.local file in the root with your Firebase config keys.

### 4. Run locally

```bash
npm run dev 
```

Open http://localhost:5173  to view the game.


---

## Deployment

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Set Build command to:
``` bash 
npm run dev 
```

3. Set Publish directory to:
```bash 
dist
```

4. Add environment variables (Firebase) in Netlify dashboard matching .env.local.


---

## Tech Stack

- Frontend: React, TypeScript, Vite

- Backend / Realtime: Firebase Firestore

- Styling: CSS, responsive design

- Hosting: Netlify


---

## Notes

- Crossword puzzles are fully customizable in src/puzzle.ts.

- The AI player speed can be adjusted in src/lib/game.ts.

- The game tracks scores per player and displays a basic leaderboard at game over.


---

## Screenshots

<img width="1092" height="431" alt="Screenshot 2025-08-23 002330" src="https://github.com/user-attachments/assets/fc53ea18-2ef9-4631-b9e0-1392468ddd80" />

<img width="1023" height="750" alt="Screenshot 2025-08-23 001607" src="https://github.com/user-attachments/assets/9516ad2f-64db-4698-9eb9-6843109953f4" />

<img width="1035" height="442" alt="Screenshot 2025-08-23 001716" src="https://github.com/user-attachments/assets/7c2f1723-7339-44ef-b51f-8cae750b160e" />

<img width="935" height="533" alt="Screenshot 2025-08-23 003036" src="https://github.com/user-attachments/assets/e84f5ca1-59b1-445b-a1ab-17fca4245e90" />

---

## 📜 License

This project is licensed under the MIT License – feel free to use, modify, and distribute.

