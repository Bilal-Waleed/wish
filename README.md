# Birthday Wisher

A React app that shows a birthday countdown and switches to a celebration wish on the birthday day. Create custom links with name, date, and a boy or girl color theme.

## Features

- Live countdown (days, hours, minutes, seconds)
- Birthday wish on the full calendar day
- Custom links via the generate page
- Boy and girl themes (colors, balloons, confetti)
- Form validation before link generation
- One-click copy for generated links
- Responsive layout for mobile and desktop

## Routes

| Route | Description |
|-------|-------------|
| `/` | Default countdown page |
| `/generate` | Create a birthday link |
| `/birthday/:name/:day/:month/:gender` | Custom countdown or wish page |

**Example:** `/birthday/Ali/14/7/male`

- `gender`: `male` (boy theme) or `female` (girl theme)

## Getting started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Install and run

```bash
git clone <your-repo-url>
cd Birthday-Wisher
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

If you see an OpenSSL error on newer Node versions, the project `.env` file already sets `NODE_OPTIONS=--openssl-legacy-provider`.

### Build for production

```bash
npm run build
```

Output is in the `build` folder.

## Generate a link

1. Go to `/generate`
2. Enter name, day, month, and gender theme
3. Click **Generate Link**
4. Copy the link or open **Visit Link**

All fields are required. Invalid dates (for example, 31 February) are blocked.

## Deploy on Vercel

1. Push the project to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Use these settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Deploy

`vercel.json` is included for SPA routing and build environment variables.

## Project structure

```
src/
  Birthday.jsx        # Countdown logic and birthday check
  Countdown.jsx       # Timer UI / wish switch
  Wish.jsx            # Birthday wish message
  Generate.jsx        # Link generator form
  CustomSelect.jsx    # Custom dropdown
  CelebrationDecor.jsx # Balloons, candles, confetti
  App.css             # Themes and styles
```

## Tech stack

- React 16
- React Router 5
- Create React App

## License

Private project — use and modify as you like.
