import "styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css/bundle";
import "/styles/Swiper.css";
import "react-toastify/dist/ReactToastify.css";

import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import Layout from "components/LAYOUT/Layout";
import { Provider } from "react-redux";
import SSRProvider from "react-bootstrap/SSRProvider";
import { ToastContainer } from "react-toastify";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "redux/store";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: [
        "htmlTag",
        "cookie",
        "localStorage",
        "sessionStorage",
        "path",
        "subdomain",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </Provider>
    </SSRProvider>
  );
}

export default MyApp;
