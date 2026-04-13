import Image from "next/image";
import css from './HeroImage.module.css'

export default function HeroImage(){
    return <div className={css.heroImageCard}>
        <Image
              className={css.heroImage}
              src='/images/Hero-image-2x.webp'
              alt='Phone with read journey app'
              width={255}
              height={331}
              priority
              quality={90}
            //   sizes='(min-width: 1440px) 464px, (min-width: 768px) 42vw, 92vw'
            />
    </div>
}