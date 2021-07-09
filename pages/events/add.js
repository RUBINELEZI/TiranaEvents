import Layout from "../../components/Layout";
import { API_URL } from "../../config/index";
import styles from "../../styles/AddPage.module.css";
import Link from "next/link";

export default function add() {
  return (
    <Layout>
      <Link href={"/"}>GO BACK</Link>
      <h1>Add Event</h1>
      <div className={styles.container}>
        <div>
          <label htmlFor="">TEST</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">TEST</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">TEST</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">TEST</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">TEST</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">TEST</label>
          <input type="text" />
        </div>
        <div className={styles.descript}>
          <label htmlFor="">TEST</label>
          <textarea type="text"></textarea>
        </div>
        <div className={styles.btn}>
          <label htmlFor="">TEST</label>
          <button className={"btn"} type="text"> Add Event</button>
        </div>
      </div>
    </Layout>
  );
}
