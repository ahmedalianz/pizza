import Image from "next/image";
import Link from "next/link";
import styles from "styles/PizzaCard.module.css";

export default function PizzaCard({ pizza }) {
  return (
    <Link href={`/products/${pizza._id}`} passHref>
      <div className={styles.container}>
        <Image src={pizza.image} width="300" height="300" alt="" />
        <h3 className={styles.title}>{pizza.title}</h3>
        <span className={styles.price}>{pizza.prices[0]} L.E</span>
        <p className={styles.desc}>{pizza.desc}</p>
      </div>
    </Link>
  );
}
