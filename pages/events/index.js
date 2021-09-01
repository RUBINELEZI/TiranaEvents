import Layout from "../../components/Layout";
import { API_URL, PER_PAGE } from "../../config/index";
import EventItem from "../../components/EventItem";
import styles from "../../styles/EventItem.module.css";
import Pagination from '@/components/Pagination'


export default function index({ events, page, total }) {
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
            image={e.image &&  e.image.url}
          />
        ))}
      </div>
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/events/count`)
  const total = await totalRes.json()

  // Fetch events
  const eventRes = await fetch(
      `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  )
  const events = await eventRes.json()

  return {
    props: { events, page: +page, total },
  }
}
