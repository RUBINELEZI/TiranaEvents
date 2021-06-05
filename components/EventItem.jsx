import styles from '../styles/EventItem.module.css'
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function EventItem({vendor, performer, date, time, slug, info, image}){
    const router = useRouter()
    const handleClick = (slug) => {
        router.push(`events/${slug}`)
    }

    console.log(image)
    return (
        <div className={styles.cart} onClick={() => handleClick(slug)}>
            <Image className={styles.img} src={image ? image : '/images/event-default.png'} width={300} height={200}/>
            <div className={styles.info}>
                <h1>{vendor}</h1>
                <h3>{performer}</h3>
                <span>{date} | {time}</span>
                <p>{info}</p>
                <Link href={`events/${slug}`}>
                    <a className='btn'>Learn More</a>
                </Link>
            </div>
        </div>
    )
}