import css from "./page.module.css";

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Read Journey</h1>
      <p>
        Manage your entire reading world in one place with Read Journey. From
        searching recommended books to tracking active reading sessions with our
        built-in timer and diary, this app is built to enhance your literary
        habits. Add books to your library, filter them by status, and watch your
        reading statistics climb as you reach the final page of every book.
      </p>
      <div className={css.navLinks}>
        <Link href="./register">Get started</Link>
        <Link href="./login">Sign-in</Link>
      </div>
    </div>
  );
}
