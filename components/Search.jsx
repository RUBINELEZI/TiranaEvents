import styles from "../styles/Search.module.css";
import Link from "next/link";
import {useRouter} from 'next/router'
import {useState, useEffect} from "react";

export default function Search({placeholder}) {
    const router = useRouter()
    let [term, setTerm] = useState()
    function doSearch(e) {
        const term = e.target.value;
        term.length <= 2 ? e.target.value : router.push(`/search?term=${term}`)
    }

    useEffect(() => {
        setTerm(router.query.term)
    }, [router.query.term])

    return (
        <div className={styles.searchBar}>
            <input type="search" placeholder={placeholder} value={term} onKeyUp={event =>  doSearch(event)}/>
        </div>
    );
}
