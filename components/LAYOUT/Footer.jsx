import Image from "next/image";
import styles from "styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.bgContainer}>
        <Image
          src="/images/footer.jpg"
          layout="fill"
          alt=""
          objectFit="cover"
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
            tempora psitatibus autem laudantium
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTURANT</h1>
          <p className={styles.adress}>
            Lorem ipsum dolor sit amet
            <br />
            consectetur adipisicing elit
            <br />
            tempora psitatibus autem laudantium
          </p>
          <p className={styles.adress}>
            Lorem ipsum dolor sit amet
            <br />
            consectetur adipisicing elit
            <br />
            tempora psitatibus autem laudantium
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.adress}>
            MONDAY - FRIDAY
            <br />
            09:00 - 22:00
          </p>
          <p className={styles.adress}>
            SATURDAY - SUNDAY
            <br />
            12:00 - 24:00
          </p>
        </div>
        <div className={styles.card}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/pizzafooter.webp"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
