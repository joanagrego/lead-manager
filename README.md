# Lead Manager

A lightweight console to manage **Leads** and convert them into **Opportunities**, built with **React**, **TypeScript**, **TailwindCSS**, and **Vite**.

---

## Features (MVP)

### Leads List
- Load leads from a local JSON file.
- Fields: `id`, `name`, `company`, `email`, `source`, `score`, `status`.
- Features:
  - Search by name or company.
  - Filter by status.
  - Sort by score (descending).

### Lead Detail Panel
- Click a lead to open a slide-over panel.
- Inline edit of status and email (with validation).
- Save and cancel actions with basic error handling.

### Convert to Opportunity
- Convert a lead into an opportunity using a modal form.
- Opportunity fields: `id`, `name`, `stage`, `amount` (optional), `accountName`.
- Opportunities are displayed in a simple table.

### UX / States
- Loading, empty, and error states handled.
- Optimized for ~100 leads.

---

## Tech Stack
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **Vite**
- Local JSON file for data (no backend required)

---

## Installation

### Install dependencies

npm install

### Start development server

npm run dev

