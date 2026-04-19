import Image from 'next/image'
import css from './QuoteBlock.module.css'

export default function QuoteBlock(){
    return <div className={css.quoteBlock}>
        <Image width={40} height={40} alt="books" src="/images/books.png" />
        <q>Books are <span>windows</span> to the world, and reading is a journey into the unknown.</q>
    </div>
}