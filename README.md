# Read Journey

## About the Project

Read Journey is a responsive web application designed for book lovers. It allows users to create a personal book collection, discover new literature, and meticulously track their reading progress. Users can log reading sessions, calculate their reading speed and view their progress through visual statistics.

## 🚀 Live Demo

[Visit website](https://read-journey-app-gilt.vercel.app/)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React
- **Language:** TypeScript
- **State Management:** Zustand (Client state), React Query (Server state & data fetching)
- **Forms & Validation:** React Hook Form, Yup
- **API Client:** Axios
- **Styling:** CSS Modules (Mobile-first responsive design, CSS variables)
- **Icons & Graphics:** SVG Sprite, Retina-optimized images

## Application Structure & Pages

The application is divided into public routes for guests and private routes for authenticated users.

### Public Pages

- `/register`: User registration form with client-side validation. On success, automatically logs the user in and redirects to the recommended page.
- `/login`: User authentication form. Displays relevant error notifications and redirects to the private app upon successful login.

### Private Pages (Requires Authentication)

- **Global Layout:** Includes a Header with a logo, User Navigation (implemented as a burger menu on mobile/tablet), User profile bar, and a Logout button.
- `/recommended` (Recommended Books):
  - Browse curated book recommendations with server-side pagination.
  - Filter books using a dedicated search form.
  - View detailed book info in a modal and add titles directly to the personal library.
- `/library` (My Library):
  - Manage personal book collections.
  - Add custom books via a validated form.
  - Filter library items by reading status (`Unread`, `In progress`, `Done`).
  - Start a reading session for a specific book.
- `/reading` (Active Reading):
  - Track active reading sessions with "Start" and "Stop" actions.
  - **Diary:** A detailed log of reading sessions, showing date, pages read, session duration, and reading speed (pages per hour). Includes functionality to delete specific sessions.
  - **Statistics:** Visual representation (chart) of the user's reading progress relative to the book's total pages.

## ⚙️ Installation & Running

Follow these steps to set up the project locally:

**1. Clone the repository:**
```bash
git clone [https://github.com/kristinka-skl/read-journey-app.git](https://github.com/kristinka-skl/read-journey-app.git)
```

**2. Navigate to the project directory:**
```bash
cd read-journey
```

**3. Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```
**4. Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 👤 Author

**Khrystyana Skliarchuk** Junior Frontend Developer
* **Email:** [kristinka.skl@gmail.com](mailto:kristinka.skl@gmail.com)  
* **GitHub:** [Go to Profile](https://github.com/kristinka-skl)
