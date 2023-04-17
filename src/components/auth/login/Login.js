import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/auth-service";
import "./Login.css";

export function Login(props) {
  const setIsLogged = props.setIsLogged;

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    password: "",
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

    loginUser(user)
      .then(() => {
        setIsLogged(true);
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login-form-wrapper">
      <Form onSubmit={onFormSubmit}>
        {error && <span className="text-danger">{error}</span>}
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
        <Form.Group>
          <p>
            คุณยังไม่มีบัญชีใช่ไหม ?
            <Link className="nav-link" to="/register">
              สมัครสมาชิก
            </Link>
          </p>
        </Form.Group>
        <Button variant="primary" type="submit">
          เข้าสู่ระบบ
        </Button>
      </Form>
    </div>
  );
}
