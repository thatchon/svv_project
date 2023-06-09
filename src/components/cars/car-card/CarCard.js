import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../services/auth-service";
import { getCarById } from "../../../services/cars-service";
import { rentConstants } from "../../../utils/constants";
import "./CarCard.css";

export function CarCard(props) {
  const params = useParams();
  const user = getUser();

  const returnCar = props.returnCar;
  const deleteCar = props.deleteCar;
  let [car, setCar] = useState();
  let [isRented, setIsRented] = useState(false);

  useEffect(() => {
    if (props.isDetails) {
      getCarById(params.id).then((res) => {
        setCar(res.data);
      });
    } else {
      setCar(props.car);
      setIsRented(!!props.car.rentalId);
    }
  }, [params.id, props.car, props.isDetails]);

  const isCarOwner = car && user && user.id === car.ownerId;

  const navigate = useNavigate();

  const toEdit = () => {
    navigate(`/car/edit/${car.id}`);
  };

  const toRent = () => {
    navigate(`/rent/${car.id}`);
  };

  const returnCurrentCar = async () => {
    if (
      window.confirm(
        rentConstants.CONFIRM_TO_RETURN_CAR + car.brand + " - " + car.model
      )
    ) {
      await returnCar(car.rentalId);
    }
  };

  return (
    car && (
      <div className="task-card-wrapper">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={car.imageUrl} />
          <Card.Body>
            <Card.Title>
              {car.brand} - {car.model}
            </Card.Title>
            <Card.Text>
              <span className="key">วันหมดอายุ: </span>
              <span className="value">{car.constructionYear}</span>
            </Card.Text>
            <Card.Text>
              <span className="key">ช่องทางการติดต่อ: </span>
              <span className="value">{car.type} - {car.fuelType}</span>
            </Card.Text>
            <Card.Text>
              <span className="key">รายละเอียดสินค้า: </span>
              <span className="value">{car.seatsCount}</span>
            </Card.Text>
            {!isRented && (
              <Card.Text>
                <span className="key">จำนวนสินค้าที่มี: </span>
                <span className="value">{car.count}</span>
              </Card.Text>
            )}
            {isRented && (
              <Card.Text>
                <span className="key">วันที่เริ่มเช่า: </span>
                <span className="value">{car.rentalStartDate}</span>
              </Card.Text>
            )}
            {isRented && (
              <Card.Text>
                <span className="key">วันที่หยุดเช่า: </span>
                <span
                  className="value"
                  style={{ color: car.rentalOverDue ? "red" : "" }}
                >
                  {car.rentalEndDate}
                </span>
              </Card.Text>
            )}
            {isRented && (
              <Card.Text>
                <span className="key">ราคาสุทธิ: </span>
                <span className="value">{car.rentalPrice}</span>
              </Card.Text>
            )}
            <Card.Text>
              <span className="key">ราคาต่อวัน: </span>
              <span className="value">{car.pricePerDay}</span>
            </Card.Text>
            <div className="btn-holder">
              {isCarOwner && (
                <Button variant="primary" onClick={toEdit}>
                  แก้ไขสินค้า
                </Button>
              )}
              {isCarOwner && (
                <Button variant="danger" onClick={() => deleteCar(car.id)}>
                  ลบสินค้า
                </Button>
              )}
              {!isCarOwner && !isRented && !!user && (
                <Button variant="warning" onClick={toRent}>
                  เช่าสินค้า
                </Button>
              )}
              {isRented && (
                <Button
                  variant={car.rentalOverDue ? "danger" : "warning"}
                  onClick={returnCurrentCar}
                >
                  คืนสินค้า
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  );
}
