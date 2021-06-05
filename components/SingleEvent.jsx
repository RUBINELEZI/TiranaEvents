import Image from "next/image";

export default function SingleEvent({ event }) {
  return (
    <div>
      <Image
        src={event.image ? event.image : "/images/event-default.png"}
        width={1000}
        height={600}
      />
      <h1>{event.performer}</h1>
      <p>{event.date + " / " + event.time}</p>
      <p>{event.info}</p>
    </div>
  );
}
