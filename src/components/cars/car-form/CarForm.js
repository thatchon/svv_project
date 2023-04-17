import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../services/auth-service";
import { createCar, editCar, getCarById } from "../../../services/cars-service";
import { carTypes } from "../../../utils/constants";
import "./CarForm.css";

export function CarForm(props) {
  const params = useParams();
  const navigate = useNavigate();

  const isEdit = !!params.id;
  const user = getUser();

  const [error, setError] = useState("");
  const [car, setCar] = useState({
    isActive: false,
    imageUrl: "",
    brand: "",
    model: "",
    constructionYear: "",
    type: "",
    fuelType: "",
    seatsCount: "",
    pricePerDay: 0,
    count: 0,
    ownerId: user.id,
  });

  useEffect(() => {
    if (!params.id) {
      return;
    }

    getCarById(params.id).then((res) => {
      setCar(res.data[0]);
    });
  }, [params.id, isEdit]);

  const onInputChange = (e) => {
    setCar((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      if (currentName === "isActive") {
        currentValue = e.target.checked;
      }

      return {
        ...prevState,
        [currentName]: currentValue,
      };
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const event = isEdit ? editCar : createCar;

    event(car)
      .then((res) => {
        let carId = res.data.id;

        navigate(`/car/${carId}`);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="car-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>ชื่อสินค้า</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={car.brand}
            placeholder="กรอกชื่อสินค้า"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>ประเภทสินค้า</Form.Label>
          <Form.Control
            type="text"
            name="model"
            value={car.model}
            placeholder="กรอกประเภทสินค้า"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="constructionYear">
          <Form.Label>วันหมดอายุ(ถ้ามี)</Form.Label>
          <Form.Control
            type="date"
            name="constructionYear"
            value={car.constructionYear}
            placeholder="กรอกวันหมดอายุ"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>เลือกช่องทางการติดต่อ</Form.Label>
          <Form.Select
            placeholder="Select Status"
            name="type"
            value={car.type}
            onChange={onInputChange}
          >
            {Object.keys(carTypes).map((type) => (
              <option key={type} value={carTypes[type]}>
                {carTypes[type]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>ช่องทางการติดต่อ</Form.Label>
          <Form.Control
            placeholder="กรอกช่องทางการติดต่อที่คุณเลือก"
            name="fuelType"
            value={car.fuelType}
            onChange={onInputChange}
          >
            {/* {Object.keys(fuelTypes).map((type) => (
              <option key={type} value={fuelTypes[type]}>
                {fuelTypes[type]}
              </option>
            ))} */}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="seatsCount">
          <Form.Label>รายละเอียดสินค้า(โดยย่อ)</Form.Label>
          <Form.Control
            type="text"
            name="seatsCount"
            value={car.seatsCount}
            placeholder="กรอกรายละเอียดสินค้า"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pricePerDay">
          <Form.Label>ราคาต่อวัน</Form.Label>
          <Form.Control
            type="number"
            name="pricePerDay"
            value={car.pricePerDay}
            placeholder="กรอกราคาต่อวัน"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="count">
          <Form.Label>จำนวนสินค้า</Form.Label>
          <Form.Control
            type="number"
            name="count"
            value={car.count}
            placeholder="กรอกจำนวนสินค้าที่มี"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>ลิงค์รูปภาพ</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={car.imageUrl}
            placeholder="กรอกลิงค์รูปภาพ"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="isActive">
          <Form.Label>คุณต้องการเช่าสินค้าหรือไม่?</Form.Label>
          <Form.Check
            type="checkbox"
            name="isActive"
            checked={car.isActive}
            label="ต้องการ"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEdit ? "แก้ไข" : "สร้าง"}
        </Button>
      </Form>
    </div>
  );
}
