import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import styles from "../../styles/AddPage.module.css";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function add() {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    //Check if fields are empty
    const hasEmptyField = Object.values(values).some(element => element === '')
    hasEmptyField && toast.error('Please fill all fields')

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included')
        return
      }
      toast.error('Something Went Wrong')
    } else {
      const evt = await res.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  return (
    <Layout>
      <Link href={"/"}>GO BACK</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.container}>
        <div>
          <label htmlFor="name">Event Name</label>
          <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='performers'>Performers</label>
          <input
              type='text'
              name='performers'
              id='performers'
              value={values.performers}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='venue'>Venue</label>
          <input
              type='text'
              name='venue'
              id='venue'
              value={values.venue}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='address'>Address</label>
          <input
              type='text'
              name='address'
              id='address'
              value={values.address}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='date'>Date</label>
          <input
              type='date'
              name='date'
              id='date'
              value={values.date}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='time'>Time</label>
          <input
              type='text'
              name='time'
              id='time'
              value={values.time}
              onChange={handleInputChange}
          />
        </div>
        <div className={styles.descript}>
          <label htmlFor='description'>Event Description</label>
          <textarea
              type='text'
              name='description'
              id='description'
              value={values.description}
              onChange={handleInputChange}
          ></textarea>
        </div>
        <div className={styles.btn}>
          <input type='submit' className={"btn"} value='Add Event' />
        </div>
      </form>
    </Layout>
  );
}
