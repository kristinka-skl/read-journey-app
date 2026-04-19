import css from './loading.module.css';

export default function Loading() {
  return (
    <div className={css.container}>
      <div className={css.loader}></div>
      <p className={css.text}>Loading page...</p>
    </div>
  );
}
