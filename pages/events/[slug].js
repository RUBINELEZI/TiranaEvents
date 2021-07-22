import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import Image from "next/image";
import moment from "moment";
import { useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ res }) {
  const router = useRouter();
  const deleteEvent = async () => {
    if (confirm('Are you sure you want to delete the event?')){
      const req = await fetch(`${API_URL}/events/${res[0].id}`, {
        method: 'DELETE'
      })

      const data = await req.json();

      if (!req.ok){
        toast.error(data.error)
      }else {
        router.push('/');
      }
    }
  }

  return (
    <div>
      <Layout>
        <div>
          <a href="#" style={{color: "red"}} onClick={deleteEvent}>
            Delete Event
          </a>
        </div>
        <div>
          <ToastContainer />
          <Image
              src={res[0].image ? res[0].image.formats.medium.url : "/images/event-default.png"}
              width={800}
              height={600}
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
