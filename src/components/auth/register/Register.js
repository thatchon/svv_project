import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "../../../services/auth-service";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export function Register(props) {
  const setIsLogged = props.setIsLogged;

  const navigate = useNavigate();
  const [user, setUser] = useState({
    imageUrl: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isVip: false,
    money: 0,
    isActive: true,
    isAdmin: false,
  });

  const [error, setError] = useState("");

  const onInputChange = (e) => {
    setUser((prevState) => {
      let currentName = e.target.name;
      let currentValue = e.target.value;

      return {
        ...prevState,
        [currentName]: currentValue,
      };
    });

    setError("");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    registerUser(user)
      .then(() => {
        setIsLogged(true);
        navigate("/cars/all");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="register-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>ชื่อผู้ใช้</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            placeholder="กรอกชื่อผู้ใช้"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>อีเมล</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            placeholder="กรอกอีเมล"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="picture">
          <Form.Label>รูปภาพ</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={user.imageUrl}
            placeholder="กรอกลิงค์รูปภาพ"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>เบอร์โทรศัพท์</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={user.phone}
            placeholder="กรอกเบอร์โทรศัพท์"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="money">
          <Form.Label>จำนวนเงิน</Form.Label>
          <Form.Control
            type="number"
            name="money"
            value={user.money}
            placeholder="กรอกจำนวนเงินต้องการ"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>พาสเวิร์ด</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            placeholder="กรอกพาสเวิร์ด"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>คอนเฟิร์มพาสเวิร์ด</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            placeholder="กรอกพาสเวิร์ดรอบที่ 2"
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <p>
            มีบัญชีผู้ใช้อยู่แล้วใช่ไหม ?
            <Link className="nav-link" to="/login">
              เข้าสู่ระบบ
            </Link>
          </p>
        </Form.Group>
        <Button variant="primary" type="submit">
          สมัครสมาชิก
        </Button>
      </Form>
    </div>
  );
}
