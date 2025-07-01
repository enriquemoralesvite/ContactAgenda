# Contacts Agenda

A web application to manage your contacts, built with [Astro](https://astro.build/), TailwindCSS, and JavaScript.

[Live Demo](https://contacts-delta-gold.vercel.app/)

## Features

- Add, edit, and delete contacts
- Local storage in the browser (localStorage)
- Visual notifications (toast)
- Modern, responsive interface with TailwindCSS

## Project Structure

```
src/
├── components/
│   └── ContactForm.astro
├── layouts/
│   └── Layout.astro
├── pages/
│   └── index.astro
├── scripts/
│   └── index.js
├── styles/
│   └── global.css
└── storage.js
```

## Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/enriquemoralesvite/ContactAgenda.git
   cd ContactAgenda
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:4321](http://localhost:4321) in your browser.

## Deployment

This project is deployed on [Vercel](https://vercel.com/).  
You can deploy your own by connecting the repository to Vercel and using Astro’s default build commands.

## Technologies Used

- [Astro](https://astro.build/)
- [TailwindCSS](https://tailwindcss.com/)
- JavaScript (for contact logic)
- localStorage

## Author

- [Enrique Morales Vite](https://github.com/enriquemoralesvite)

---

Contributions and suggestions are welcome!
