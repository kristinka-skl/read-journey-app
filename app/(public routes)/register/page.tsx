import RegisterForm from '@/app/Components/Forms/Auth/RegisterForm';
import css from './registerPage.module.css';
import HeroImage from '@/app/Components/Shared/HeroImage/HeroImage';

export default function Register() {
  return (
    <section className={css.registerSection}>
      <div className={css.registerFormWrapper}>
        <div className={css.loginIconWrapper}>
       <svg className={css.logoIcon} width={42} height={17}><use href='/sprite.svg#icon-read-logo'></use></svg>
       <p className={css.logoText}>READ JOURNEY</p>
      </div>
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
