import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import EventItem from "../components/EventItem";
import styles from "../styles/EventItem.module.css";
import {parseCookies} from "@/helpers/index";

export default function Home({ events }) {
  return (
    <Layout>
      <div className={styles.gridContainer}>
        {events.map((e) => (
          <EventItem
            key={e.id}
            vendor={e.vendor}
            performer={e.performer}
            date={e.date}
            time={e.time}
            slug={e.slug}
            info={""}
            image={e.image && e.image.formats.small.url}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
    const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
    const events = await res.json()

    return {
        props: { events },
        revalidate: 1,
    }
}

