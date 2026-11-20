# Northstar Vue Commerce Demo

A Vue 3 + Vite storefront starter with Vue Router and browser-local demo persistence.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Pages

- `/` — Home
- `/about` — About
- `/products` — Product gallery, search, add-to-bag, and signed-in product edit/delete controls
- `/products/new` — Add product
- `/products/:id/edit` — Modify product
- `/enquiry` — Enquiry form
- `/register` — Register user

The account icon in the header opens the login pop-up. Register an account first, then log in. Logging out clears the active session while keeping the registered demo account available for another login.

## Demo limitations

Products, cart, enquiries, users, and the active session use browser `localStorage`. This is only a front-end demonstration: passwords are stored in plain text locally and must never be handled this way in a real application. A production app should use an ASP.NET Core API, server-side password hashing, secure authentication cookies or tokens, authorization, and a database. Enquiry submission currently saves to this browser only; it does not send an email or call a backend API.
