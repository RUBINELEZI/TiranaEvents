import {useRouter} from 'next/router'
import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../config";
import EventItem from "../../components/EventItem";

export default function EventPage({res}) {
const router = useRouter();
const [event, setEvent] = useState({})
    // useEffect(() => {
    //     axios.get(`${API_URL}/api/events/${router.query.slug}`)
    //         .then(function (response) {
    //             // handle success
    //             setEvent(response.data[0])
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    // }, [router.query.slug])

    return (
        <div>
            <Layout>
                <EventItem vendor={res[0].vendor} performer={res[0].performer} date={res[0].date} time={res[0].time} info={res[0].info}/>
            </Layout>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const { slug } = params
    const data = await fetch(`${API_URL}/api/events/${slug}`)
    const res = await data.json()

    return {
        props: {res},
    }
}