import RegisterForm from '@/app/Components/Forms/Auth/RegisterForm';
import css from './registerPage.module.css';

export default function Register() {
  return (
    <section className={css.registerSection}>
        <p>Logo</p>
      <h1 className={css.title}>
        Expand your mind, reading <span className={css.textAccent}>a book</span>
      </h1>
      <RegisterForm/>
    </section>
  );
}


