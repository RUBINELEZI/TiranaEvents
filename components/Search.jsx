import styles from "../styles/Search.module.css";
import Link from "next/link";
import {useRouter} from 'next/router'
import {useState, useEffect} from "react";
import EventItem from "./EventItem";

export default function Search({placeholder}) {
    const router = useRouter()
    let [term, setTerm] = useState()
    function doSearch(e) {
        e.preventDefault();
        router.push(`/search?term=${term}`)
        setTerm('')
    }

    useEffect(() => {
        setTerm(router.query.term)
    }, [router.query.term])

    return (
        <div className={styles.searchBar}>
            <form onSubmit={event =>  doSearch(event)}>
                <input type="search" placeholder={placeholder} value={term} onChange={e => setTerm(e.target.value)} />
            </form>
        </div>
    );
}
