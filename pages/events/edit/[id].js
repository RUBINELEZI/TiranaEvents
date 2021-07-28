import Layout from "../../../components/Layout";
import Modal from "../../../components/Modal";
import { API_URL } from "../../../config/index";
import styles from "../../../styles/AddPage.module.css";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import Image from "next/image";
import ImageUpload from "../../../components/imageUpload";

export default function edit({evt}) {
    const [values, setValues] = useState({
        name: evt.name,
        performer: evt.performer,
        vendor: evt.vendor,
        date: evt.date,
        time: evt.time,
        info: evt.info,
    })

    const [imgPreview, setImgPreview] = useState(
        evt.image ? evt.image.formats.thumbnail.url : null
    )

    const [showModal, setShowModal] = useState(false)

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

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
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

    const imageUploaded = async () => {
        const res = await fetch(`${API_URL}/events/${evt.id}`)
        const data = await res.json();

        setImgPreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }

    return (
        <Layout>
            <Link href={"/"}>GO BACK</Link>
            <h1>Edit Event</h1>
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
                        value={moment(values.date).format('YYYY-MM-DD')}
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
                    <label htmlFor='info'>Event Description</label>
                    <textarea
                        type='text'
                        name='info'
                        id='info'
                        value={values.info}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <div className={styles.btn}>
                    <input type='submit' className={"btn"} value='Edit Event' />
                </div>
            </form>

            <div>
                <h2>Event Image</h2>
                {imgPreview ? <Image src={imgPreview} height={100} width={170} /> : <p>No image uploaded!</p> }
            </div>
            <button className={'btn btn-secondary'} onClick={() => setShowModal(true)}>Upload new Image</button>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                Image Upload
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
            </Modal>
        </Layout>
    );
}


export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/events/${id}`);
    const evt = await res.json();

    return {
        props: {
            evt
        }
    }
}
