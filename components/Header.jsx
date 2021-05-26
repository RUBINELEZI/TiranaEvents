import styles from  '../styles/Header.module.css'
import Link from 'next/link'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>Tirana Event</a>
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href='/index'>
                            <a>Events</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}