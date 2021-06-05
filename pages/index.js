import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import EventItem from "../components/EventItem";
import styles from "../styles/EventItem.module.css";

export default function Home({ res }) {
  return (
    <Layout>
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
            image={e.image}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await fetch(`${API_URL}/api/events`);
  const res = await data.json();

  return {
    props: { res: res.slice(0, 4) },
    revalidate: 1,
  };
}
