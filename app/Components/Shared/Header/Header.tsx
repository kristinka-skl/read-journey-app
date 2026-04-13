'use client';

import Link from 'next/link';
import css from './Header.module.css';
import { useState } from 'react';
import { logout } from '@/app/lib/clientApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/register');
    } catch {
      toast.error('Logout failed, please try again');
    } finally {
      setIsLoggingOut(false);
    }
  };
  //   const user = useAuthStore((state) => state.user);
  const user = true;
  return (
    <section className={css.headerSection}>
      <Link href='/'><p>Logo</p></Link>
      <nav className={css.desktopNav}>
        <ul className={css.navLinks}>
          <li>
            <Link href="/recommended">Home</Link>
          </li>
          <li>
            <Link href="/library">My library</Link>
          </li>
        </ul>
      </nav>
      <div className={css.userIconBurgerWrapper}>
        <div className={css.userIcon}>
          <span>F</span>
        </div>

        <button
          className={css.burgerWrapper}
          type="button"
          aria-label="Open menu"
          aria-expanded={isDrawerOpen}
          onClick={() => setIsDrawerOpen(true)}
        >
          <p>=</p>
        </button>

        {/* <svg> */}
        {/* <use href=''> */}

        {/* </use> */}
        {/* </svg> */}
      </div>

      {/* drawer */}
      {isDrawerOpen ? (
        <div
          className={css.drawerBackdrop}
          onClick={closeDrawer}
          role="presentation"
        >
          <aside
            // id={drawerId}
            className={css.drawer}
            onClick={(event) => event.stopPropagation()}
            aria-label="Mobile menu"
          >
            <button
              className={css.drawerClose}
              type="button"
              onClick={closeDrawer}
              aria-label="Close menu"
            >
              X
              {/* <svg
                className={css.drawerCloseIcon}
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-close" />
              </svg> */}
            </button>
            <nav className={css.drawerNav} aria-label="Mobile navigation">
              <Link href="/recommended" onClick={closeDrawer}>
                Home
              </Link>
              <Link href="/library" onClick={closeDrawer}>
                My library
              </Link>
            </nav>
            <div className={css.drawerAction}>
              {user ? (
                <button
                  className={css.secondaryButton}
                  type="button"
                  disabled={isLoggingOut}
                  onClick={async () => {
                    await handleLogout();
                    closeDrawer();
                  }}
                >
                  {isLoggingOut ? 'Logging out...' : 'Log out'}
                  
                </button>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}
      {/* end drawer*/}
    </section>
  );
}
