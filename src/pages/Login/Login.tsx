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
import { Link, useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { AuthContext } from 'components/context/authContext';
import styles from './Login.module.css';

function Login() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { login, loginError } = useContext(AuthContext);

  return (
    <Container>
      <Row className={styles.loginWrapper}>
        <Col lg={4}>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values) => {
              const action = async () => {
                setLoading(true);
                await login(values);
              };
              action();
              history.push('/');
              setLoading(false);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h3>Login</h3>
                <FormGroup>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    type="username"
                    name="username"
                    className="form-control"
                    placeholder="Enter username"
                    required
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
                <Button
                  type="submit"
                  variant="primary"
                  block
                  disabled={loading}
                >
                  {loading ? 'Please wait' : 'Login'}
                </Button>
                <p className="text-right">
                  <Link to="/register">Haven't account?</Link>
                </p>
                {loginError && (
                  <Row className="justify-content-center">
                    <Alert variant="danger">{loginError}</Alert>
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

export default Login;
