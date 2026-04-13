import LoginForm from '@/app/Components/Forms/Auth/LoginForm';
import css from './loginPage.module.css';
import HeroImage from '@/app/Components/Shared/HeroImage/HeroImage';

export default function Login() {
  return (
    <section className={css.loginSection}>
      <div className={css.loginFormWrapper}>
        <p>Logo</p>
        <h1 className={css.title}>
          Expand your mind, reading{' '}
          <span className={css.textAccent}>a book</span>
        </h1>
        <LoginForm />
      </div>
      <HeroImage />
    </section>
  );
}
