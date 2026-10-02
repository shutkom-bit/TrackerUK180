# Tracker UK180 — website

Static site: index (landing), /privacy, /terms. No build step.

## Before publishing
Open `site.js` and fill in the block at the top:
- `buyUrl`  — checkout link from Lemon Squeezy (or Gumroad); leave empty until you have it
- `price`   — e.g. '£9'
- `seller`  — your legal name
- `email`   — contact email for customers

## Deploy on Vercel
1. Create a new GitHub repository and upload all files from this folder .
2. vercel.com > Add New > Project > Import the repository.
3. Framework preset: "Other". No build command. Deploy.
4. Your site will be at https://<project-name>.vercel.app
