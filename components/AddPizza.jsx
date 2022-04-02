import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import axios from "axios";
import resizeFile from "firebaseStorage/resizeFile";
import storage from "firebaseStorage/firebase";
import styles from "styles/AddPizza.module.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AddPizza() {
  const { t } = useTranslation();
  const [showPizzaModal, setShowPizzaModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [prices, setPrices] = useState([]);
  const [extraText, setExtraText] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [extraOptions, setExtraOptions] = useState([]);
  const [extraItem, setExtraItem] = useState(null);
  const extraItemPreparer = (e) => {
    setExtraItem({ ...extraItem, [e.target.name]: e.target.value });
    e.target.name === "text" && setExtraText(e.target.value);
    e.target.name === "price" && setExtraPrice(e.target.value);
  };
  const removeItemPreparer = (item) => {
    let newItems = extraOptions.filter((option) => option !== item);
    setExtraOptions(newItems);
  };
  const addExtraOption = () => {
    setExtraOptions((prev) => [...prev, extraItem]);
    setExtraText("");
    setExtraPrice("");
  };
  const changePrices = (e, index) => {
    let newPrices = prices;
    newPrices[index] = e.target.value;
    setPrices(newPrices);
    console.log(prices);
  };
  const uploadImage = async () => {
    if (!file) return;
    const image = await resizeFile(file);
    const imageName = `${file.name}${Date.now()}`;
    const storageRef = ref(storage, `pizzaStore/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setImage(downloadUrl)
        );
      }
    );
  };
  const cteateProduct = async (e) => {
    e.preventDefault();
    try {
      if (!extraOptions.length && extraItem) throw new Error();
      await axios.post(`${process.env.API_URL}/products`, {
        title,
        desc,
        image,
        prices,
        extraOptions,
      });
      setShowPizzaModal(false);
      toast.success("pizza created successfully");
    } catch (err) {
      console.log(err);
      if (image === "") toast.error("you have to upload the image first");
      if (!extraOptions.length && extraItem)
        toast.error("you have to add the extra options");
    }
  };
  return (
    <Container className="py-2">
      <button
        className={styles.addButton}
        onClick={() => setShowPizzaModal(true)}
      >
        {t("AddPizza")}
      </button>

      <Modal
        show={showPizzaModal}
        onHide={() => setShowPizzaModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("AddPizza")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={cteateProduct}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                {t("Name")}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder={t("Pizza_Name")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                {t("Description")}
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  value={desc}
                  required
                  onChange={(e) => setDesc(e.target.value)}
                  as="textarea"
                  type="text"
                  placeholder={t("Pizza_Description")}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                {t("Prices")}
              </Form.Label>
              <Col sm="10">
                <Row>
                  <Col sm="12" md="4" className="my-sm-2 my-md-0">
                    <Form.Control
                      required
                      onChange={(e) => changePrices(e, 0)}
                      type="number"
                      placeholder="Small"
                    />
                  </Col>
                  <Col sm="12" md="4" className="my-sm-2 my-md-0">
                    <Form.Control
                      required
                      onChange={(e) => changePrices(e, 1)}
                      type="number"
                      placeholder="Meduim"
                    />
                  </Col>
                  <Col sm="12" md="4" className="my-sm-2 my-md-0">
                    <Form.Control
                      required
                      onChange={(e) => changePrices(e, 2)}
                      type="number"
                      placeholder="Large"
                    />
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="2">
                {t("Extras")}
              </Form.Label>
              <Col sm="10">
                <Row>
                  <Col sm="12" md="4" className="my-sm-2 my-md-0">
                    <Form.Control
                      onChange={extraItemPreparer}
                      type="text"
                      name="text"
                      value={extraText}
                      placeholder={t("Extra_Name")}
                    />
                  </Col>
                  <Col sm="12" md="4" className="my-sm-2 my-md-0">
                    <Form.Control
                      onChange={extraItemPreparer}
                      type="number"
                      name="price"
                      value={extraPrice}
                      placeholder={t("Extra_Price")}
                    />
                  </Col>
                  <Col
                    sm="12"
                    md="4"
                    className="my-sm-2 my-md-0 d-flex justify-content-center"
                  >
                    <Button onClick={addExtraOption}>{t("Add_Extra")}</Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            {extraOptions.length > 0 && (
              <Form.Group
                as={Row}
                controlId="formPlaintextPassword"
                className="mb-3"
              >
                <Form.Label column sm="2">
                  {t("Added_Extras")}
                </Form.Label>
                <Col sm="10">
                  {extraOptions.map((extra, i) => (
                    <span className={styles.extraItem} key={i}>
                      {extra.text} - {extra.price} {t("L.E")}
                      <span
                        onClick={() => removeItemPreparer(extra)}
                        className={styles.removeItem}
                      >
                        X
                      </span>
                    </span>
                  ))}
                </Col>
              </Form.Group>
            )}

            <Form.Group as={Row} controlId="formFileLg" className="mb-3">
              <Form.Label column sm="2">
                {t("Choose_Image")}
              </Form.Label>
              <Col sm="10">
                <Row>
                  <Col sm="12" md="9">
                    <Form.Control
                      type="file"
                      required
                      onChange={(e) => setFile(e.target.files[0])}
                      size="md"
                      className="w-50"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <Button onClick={uploadImage}>{t("Upload")}</Button>
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <div className="d-flex justify-content-center">
              {file && image === "" ? (
                <ProgressBar
                  className="w-50"
                  animated
                  label={`${progress}%`}
                  now={progress}
                />
              ) : (
                file &&
                image !== "" && (
                  <span className="text-success">
                    {t("Uploaded_Successfully")}
                  </span>
                )
              )}
            </div>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="success" className="w-50 my-2">
                {t("Create_Product")}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
