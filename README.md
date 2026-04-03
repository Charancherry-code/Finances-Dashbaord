# Finance Dashboard

A clean React + Vite finance dashboard for tracking income, expenses, balances, and spending patterns. The app uses mock data, local state, and a simple role-based UI to show how a dashboard can be built without a backend.

## Overview

This dashboard lets users:

- View total balance, income, and expenses
- Explore financial trends with charts
- Search and review transactions in a table
- Switch between viewer and admin modes
- Add and delete transactions as an admin
- See simple insights from the data
- Use dark mode
- Persist data with localStorage

## Features

- Summary cards for Total Balance, Income, and Expenses
- Time-based line chart for transaction trends
- Category-based pie chart for expense breakdown
- Transaction table with search across category, type, date, and amount
- Admin-only add transaction form
- Admin-only delete action
- Viewer/Admin role switcher
- Dark mode toggle
- Empty state handling for charts and tables
- localStorage persistence for transactions and role
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Recharts
- Context API

## Project Structure

```text
finance-dashboard/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## How It Works

### Dashboard Overview

The dashboard calculates total income, expenses, and balance from the transaction list and shows them in summary cards.

### Transactions

Transactions are displayed in a searchable table with date, category, type, and amount.

### Role Based UI

The role switcher simulates two frontend roles:

- Viewer: can only view data
- Admin: can add and delete transactions

### State Management

The app uses Context API to manage:

- Transactions
- Search input
- Selected role
- Dark mode

### Persistence

Transactions and role are stored in localStorage so the app keeps data after refresh.

## Data Source

The dashboard uses mock transaction data for demonstration. This keeps the project frontend-only and easy to review.

## Notes

- The UI is responsive and works across screen sizes.
- Empty states are included so the dashboard stays clean when there is no data.
- This project is intentionally frontend-focused and does not require a backend.

## Summary

This project demonstrates:

- Clean dashboard UI design
- Responsive React component structure
- Reusable components
- Mock-data based financial analytics
- Role-based frontend behavior
- Client-side persistence
- Dark mode support
