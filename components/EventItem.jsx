import styles from '../styles/EventItem.module.css'
export default function EventItem({vendor, performer, date, time, slug}){
    return (
        <div className={styles.cart}>
            <h1>{vendor}</h1>
            <h3>{performer}</h3>
            <span>{date} | {time}</span>
        </div>
    )
}