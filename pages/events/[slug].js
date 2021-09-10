import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import {parseCookies} from "@/helpers/index";

export default function EventPage({ res , token}) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const deleteEvent = async () => {
    if (confirm("Are you sure you want to delete the event?")) {
      const req = await fetch(`${API_URL}/events/${res[0].id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      window.close();
      const data = await req.json();

      if (!req.ok) {
        toast.error(data.error);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div>
      <Layout>
        {user && res[0].user && user.username === res[0].user.username ? (
          <>
            <Link href={`edit/${res[0].id}`}>
              <a href="#">Edit Event</a>
            </Link>
            <div>
              <a href="#" style={{ color: "red" }} onClick={deleteEvent}>
                Delete Event
              </a>
            </div>
          </>
        ) : (
          <></>
        )}

        <div>
          <ToastContainer />
          <div className='relative slug-detail'>
            <Image
                src={
                  res[0].image.formats !== null
                      ? res[0].formats.medium.url
                      : "/images/event-default.png"
                }
                layout={'fill'} objectFit={'contain'}
            />
          </div>
          <h1>{res[0].performer}</h1>
          <p>
            {moment(res[0].date).format("MM/DD/YYYY") + " | " + res[0].time}
          </p>
          <p>{res[0].info}</p>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ params, req }) {
  const { slug } = params;
  const data = await fetch(`${API_URL}/events/?slug=${slug}`);
  const res = await data.json();
  let {token} = parseCookies(req)
  token = token || ''

  return {
    props: {
      res,
      token
    }
  }
}
