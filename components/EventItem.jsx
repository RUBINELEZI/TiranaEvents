import styles from "../styles/EventItem.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import moment from 'moment'

export default function EventItem({
  vendor,
  performer,
  date,
  time,
  slug,
  info,
  image,
}) {
  const router = useRouter();
  const handleClick = (slug) => {
    router.push(`events/${slug}`);
  };

  return (
    <div className={styles.cart} onClick={() => handleClick(slug)}>
      <div className='relative item-detail'>
        <Image
            className={styles.img}
            src={image ? image : "/images/event-default.png"}
            layout={'fill'} objectFit={'contain'}
        />
      </div>

      <div className={styles.info}>
        <h1>{vendor}</h1>
        <h3>{performer}</h3>
        <span>
          {moment(date).format('MM/DD/YYYY')} | {time}
        </span>
        <p>{info}</p>
        <Link href={`events/${slug}`}>
          <a className="btn">Learn More</a>
        </Link>
      </div>
    </div>
  );
}
