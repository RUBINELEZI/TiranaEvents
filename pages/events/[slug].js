import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import Image from "next/image";
import moment from "moment";

export default function EventPage({ res }) {
  return (
    <div>
      <Layout>
        <div>
          <Image
              src={res[0].image ? res[0].image.formats.medium.url : "/images/event-default.png"}
              width={1000}
              height={800}
          />
          <h1>{res[0].performer}</h1>
          <p>{moment(res[0].date).format('MM/DD/YYYY') + " | " + res[0].time}</p>
          <p>{res[0].info}</p>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const data = await fetch(`${API_URL}/events/?slug=${slug}`);
  const res = await data.json();

  return {
    props: { res },
  };
}
