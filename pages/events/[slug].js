import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useState } from "react";
import { API_URL } from "../../config";
import EventItem from "../../components/EventItem";
import SingleEvent from "../../components/SingleEvent";

export default function EventPage({ res }) {
  return (
    <div>
      <Layout>
        <SingleEvent event={res[0]} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const data = await fetch(`${API_URL}/api/events/${slug}`);
  const res = await data.json();

  return {
    props: { res },
  };
}
