import { Container, Dropdown } from "react-bootstrap";

import { AiOutlineMenu } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import Image from "next/image";
import { IoLanguage } from "react-icons/io5";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import i18n from "i18next";
import styles from "styles/Navbar.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function NavBar({ languages, currentLanguageCode }) {
  const { quantity } = useSelector((state) => state.cart);
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Container className={styles.wrapper}>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <BsFillTelephoneFill size="1.5rem" color="#d1411e" />
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>{t(`ORDER_NOW`)}</div>
            <div className={styles.text}>010 99019 685</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href="/" passHref>
              <li className={styles.listItem}>{t("Home")}</li>
            </Link>
            <Link
              passHref
              href="/#products"
              style={{ textDecoration: "none", color: "white" }}
            >
              <li className={styles.listItem}>{t("Products")}</li>
            </Link>
            <li className={styles.listItem}>{t("Menu")}</li>
            <Link href="/">
              <a>
                <Image
                  src="/images/logo.png"
                  alt=""
                  width="100"
                  height="100"
                  objectFit="contain"
                />
              </a>
            </Link>
            <li className={styles.listItem}>{t("Events")}</li>
            <li className={styles.listItem}>{t("Blog")}</li>
            <li className={styles.listItem}>{t("Content")}</li>
          </ul>
        </div>
        <div className={styles.item}>
          <Dropdown className="lang-dropdown">
            <Dropdown.Toggle
              style={{
                border: "none",
                backgroundColor: "white",
                color: "black",
              }}
              id="dropdown-basic"
            >
              <IoLanguage />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {languages.map((language) => (
                <Dropdown.Item
                  key={language.code}
                  onClick={() => i18n.changeLanguage(language.code)}
                  className="d-flex justify-content-between align-items-center"
                >
                  {language.name}
                  <Image
                    width="20"
                    height="20"
                    objectFit="contain"
                    src={language.flag}
                    alt={language.name}
                  />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Link href="/cart" passHref>
            <div className={styles.cart}>
              <TiShoppingCart size="3rem" />
              <span
                style={
                  currentLanguageCode === "en"
                    ? { transform: "translate(-60%,-30%)" }
                    : { transform: "translate(60%,-30%)" }
                }
                className={styles.cartCount}
              >
                {quantity}
              </span>
            </div>
          </Link>
        </div>

        <div className={styles.item}>
          <AiOutlineMenu size="3rem" />
        </div>
      </Container>
    </div>
  );
}
