import RegisterForm from '@/app/Components/Forms/Auth/RegisterForm';
import css from './registerPage.module.css';
import HeroImage from '@/app/Components/Shared/HeroImage/HeroImage';

export default function Register() {
  return (
    <section className={css.registerSection}>
      <div className={css.registerFormWrapper}>
        <p>Logo</p>
        <h1 className={css.title}>
          Expand your mind, reading{' '}
          <span className={css.textAccent}>a book</span>
        </h1>
        <RegisterForm />
      </div>
      <HeroImage />
    </section>
  );
}
