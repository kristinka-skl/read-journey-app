import Link from 'next/link';
import css from './InfoBlock.module.css';

export default function InfoBlock() {
  return (
    <section className={css.infoBlock}>
      <h2>Start your workout</h2>
      <ul className={css.infoList}>
        <li className={css.infoItemWrapper}>
          <div className={css.roundNumber}>
            <p>1</p>
          </div>
          <p className={css.text}>
            <span className={css.accent}>Create a personal library:</span>  add the books you intend to
            read to it.
          </p>
        </li>
        <li className={css.infoItemWrapper}>
          <div className={css.roundNumber}>
            <p>2</p>
          </div>
          <p className={css.text}>
            <span className={css.accent}>Create your first workout:</span>  define a goal, choose a
            period, start training.
          </p>
        </li>
      </ul>
      
        <Link href="/library" className={css.link}><p>My library</p>
        <svg className={css.redirect} width={20} height={20}><use href='/sprite.svg#icon-redirect'></use></svg>
        </Link>
        
      
    </section>
  );
}
