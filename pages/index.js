import Link from 'next/link'
import Layout from '../components/Layout'
import {API_URL} from '../config/index'
import EventItem from "../components/EventItem";
import styles from '../styles/EventItem.module.css'

export default function Home({res}) {
  return (
    <Layout>
        <div className={styles.gridContainer}>
            {res.map(e => <EventItem key={e.id} vendor={e.vendor} performer={e.performer} date={e.date} time={e.time}/>)}
        </div>
    </Layout>
  )
}

export async function getStaticProps() {
    const data = await fetch(`${API_URL}/api/events`)
    const res = await data.json()

    console.log(res)
    return {
        props: {res},
        revalidate: 1
    }
}