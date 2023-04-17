import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const toAllCars = () => {
    navigate("/cars/all");
  };

  return (
    <div className="wrapper">
      <div className="text-center hero-text">
        <h1 className="">Fast & Easy Way To Rent a thing you need.</h1>
        <h4>Explore the world with our cars </h4>
        <Button variant="primary" onClick={toAllCars}>
          ดูสินค้าทั้งหมด
        </Button>
      </div>
    </div>
  );
}
