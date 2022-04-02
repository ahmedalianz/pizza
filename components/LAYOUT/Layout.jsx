import Footer from "./Footer";
import NavBar from "./NavBar";
import cookie from "js-cookie";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { t } = useTranslation();

  const languages = [
    {
      code: "ar",
      name: "العربيه",
      dir: "rtl",
      country_code: "sa",
      flag: "/images/saudi-arabia.svg",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
      flag: "/images/united-kingdom.svg",
    },
  ];
  const currentLanguageCode = cookie.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lang) => lang.code === currentLanguageCode
  );
  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("title");
  }, [currentLanguage, t]);
  return (
    <>
      <NavBar languages={languages} currentLanguageCode={currentLanguageCode} />
      {children}
      <Footer />
    </>
  );
}
