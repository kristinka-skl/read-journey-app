import Image from "next/image";
import css from "./page.module.css";

import Link from 'next/link';

export default function Home() {
  return (
    <div className={css.infoBlock}>
      <h1 className={css.title}><span className={css.textAccent}>Welcome to</span> Read Journey</h1>
      <p className={css.text}>
        Manage your entire reading world in one place with Read Journey. From
        searching recommended books to tracking active reading sessions with our
        built-in timer and diary, this app is built to enhance your literary
        habits.</p>
        <p className={css.text}>Add books to your library, filter them by status, and watch your
        reading statistics climb as you reach the final page of every book.</p>
      
      <div className={css.navLinks}>
        <Link className={css.primaryBtn} href="./register">Get started</Link>
        <Link className={css.primaryBtn} href="./login">Sign in</Link>
      </div>
      <div >
        <Image className={css.heroImage} width={1200} height={600} alt='cozy room with table and open book' src='/images/ReadJourneyOG.webp'/>
      </div>
    </div>
  );
}
