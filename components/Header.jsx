import styles from "../styles/Header.module.css";
import Link from "next/link";
import Search from "./Search";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Tirana Event</a>
        </Link>
      </div>
        <Search placeholder={'Search for event'} />
      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
            <Link href="events/add">
                <a>Add Event</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
