import React, { useState, useContext } from 'react';
import {
  Container,
  Col,
  Row,
  FormGroup,
  Button,
  FormLabel,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { AuthContext } from 'components/context/authContext';
import styles from './Register.module.css';

function Register() {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, registerError } = useContext(AuthContext);

  return (
    <Container>
      <Row className={styles.registerWrapper}>
        <Col lg={4}>
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
              name: '',
              age: 0,
              picture: 'https://pngimage.net/wp-content/uploads/2018/06/no-avatar-png-8.png',
            }}
            onSubmit={(values) => {
              const action = async () => {
                setLoading(true);
                if (values.password !== values.confirmPassword) {
                  setPasswordError('You repeat password wrong! Try again');
                } else {
                  register({
                    id: 0,
                    username: values.username,
                    name: values.name,
                    password: values.password,
                    age: values.age,
                    picture: values.picture,
                    isAdmin: false,
                    isActive: false,
                  });
                  setPasswordError(null);
                }
                setLoading(false);
              };
              action();
            }}
          >
            {({ handleSubmit }) => (
              <form name="register" onSubmit={handleSubmit}>
                <h3>Register account</h3>
                <FormGroup>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter full name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="username">Age</FormLabel>
                  <Field
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Enter age"
                    required
                    min={0}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Confirm Password</FormLabel>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Enter again password"
                    required
                  />
                </FormGroup>
                <Button type="submit" variant="primary" block>
                  {loading ? 'Please wait' : 'Register'}
                </Button>
                <p className="text-right">
                  <Link to="/login">Have account?</Link>
                </p>
                {passwordError && (
                  <Row className="justify-content-center">
                    <Alert variant="danger">{passwordError}</Alert>
                  </Row>
                )}
                {registerError && (
                  <Row className="justify-content-center">
                    <Alert variant="danger">{registerError}</Alert>
                  </Row>
                )}
              </form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
