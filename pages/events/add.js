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
    performer: '',
    vendor: '',
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
          <label htmlFor='vendor'>Venue</label>
          <input
              type='text'
              name='vendor'
              id='vendor'
              value={values.vendor}
              onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='performer'>Performers</label>
          <input
              type='text'
              name='performer'
              id='performer'
              value={values.performer}
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
