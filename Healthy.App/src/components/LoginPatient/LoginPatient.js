import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import PatientIcon from "../Assets/patient.svg";
import "./LoginPatient.css";
import axios from "axios";

class LoginPatient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      error: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    if (!username) {
      this.setState({ error: "Error: Username can't be empty." });
      return;
    }

    if (!password) {
      this.setState({ error: "Error: Password can't be empty." });
      return;
    }
    axios
      .post(
        `https://localhost:5001/api/authenticate/patient`,
        { Username: username, Password: password },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data) {
          this.setState({ isLoggedIn: true, error: false });
          this.props.handleLogin();
        }
      })
      .catch((error) => {
        this.setState({  error: error.response.data.message });
      });
  };

  render() {
    const { isLoggedIn, error } = this.state;

    return (
      <Container className="containerLoginPatient" fluid>
        {error && <Alert color="danger">{error}</Alert>}
        {isLoggedIn && <Redirect to="/homepage" />}
        <Row>
          <Col xs={12} sm={6} className="formColumnLoginPatient">
            <Form onSubmit={this.handleSubmit} data-test='loginForm'>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input
                  data-test='usernameInput'
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                  name="username"
                  id="usernameInput"
                  placeholder="Enter username here"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  data-test='passwordInput'
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  id="passwordInput"
                  placeholder="Enter password here"
                />
              </FormGroup>
              <FormGroup className="loginPatientBtn">
                <Button size="lg" color="primary" block>
                  Login
                </Button>
              </FormGroup>
            </Form>
            <Container fluid className="linksContainer">
              <Row>
                <Link to="/register_patient">
                  Don't have an account? Register here
                </Link>
              </Row>
              <Row>
                <Link to="/register">Forgot password?</Link>
              </Row>
            </Container>
          </Col>

          <Col xs={12} sm={6}>
            <img src={PatientIcon} />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default LoginPatient;
