import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import EventItem from "../../components/EventItem";
import styles from "../../styles/EventItem.module.css";
import qs from 'qs'
import Link from 'next/link'
import {useRouter} from "next/router";


export default function index({ res }) {
    const router = useRouter()

    return (
        <Layout>
            <Link href={'/events'} >GO BACK</Link>
            <h1>Search results for {router.query.term}</h1>
            <div className={styles.gridContainer}>
                {res.map((e) => (
                    <EventItem
                        key={e.id}
                        vendor={e.vendor}
                        performer={e.performer}
                        date={e.date}
                        time={e.time}
                        slug={e.slug}
                        info={""}
                        image={e.image &&  e.image.url}
                    />
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps({query: {term}}) {
    const query = qs.stringify({
        _where: {
            _or: [
                {performer_contains: term},
                {vendor_contains: term}
            ]
        }
    })
    const data = await fetch(`${API_URL}/events?${query}`);
    const res = await data.json();

    return {
        props: {res},
    };
}
