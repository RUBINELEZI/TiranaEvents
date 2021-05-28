import styles from '../styles/EventItem.module.css'
import {useRouter} from "next/router";

export default function EventItem({vendor, performer, date, time, slug, info}){
    const router = useRouter()
    const handleClick = (slug) => {
        router.push(`events/${slug}`)
    }

    return (
        <div className={styles.cart} onClick={() => handleClick(slug)}>
            <h1>{vendor}</h1>
            <h3>{performer}</h3>
            <span>{date} | {time}</span>
            <p>{info}</p>
        </div>
    )
}