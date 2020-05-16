import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  FormGroup,
  FormLabel,
  Row,
  Alert,
} from 'react-bootstrap';
import { userModel } from 'types/userModel';
import { Formik, Field } from 'formik';
import { editUser } from 'components/api/users';
import { AuthContext } from 'components/context/authContext';

type Props = {
  data: userModel;
  onUpdate: (updatedData: userModel) => void;
};

function ProfileEditForm({ data, onUpdate }: Props) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Formik<userModel>
          initialValues={{
            id: data.id,
            username: data.username,
            password: data.password,
            name: data.name,
            age: data.age,
            picture: data.picture,
            isActive: data.isActive,
            isAdmin: data.isAdmin,
          }}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              await editUser(values);
              onUpdate(values);
              handleClose();
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!!user?.isAdmin && (
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
                )}
                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    type="text"
                    name="password"
                    className="form-control"
                    placeholder="Enter new password"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Name</FormLabel>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Age</FormLabel>
                  <Field
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="Enter age"
                    min={0}
                    max={100}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="picture">Picture URL</FormLabel>
                  <Field
                    type="text"
                    name="picture"
                    className="form-control"
                    placeholder="Enter active picture url"
                    required
                  />
                </FormGroup>
                {!!user?.isAdmin && (
                  <FormGroup>
                    <FormLabel htmlFor="isAdmin">Rank</FormLabel>
                    <Field
                      as="select"
                      name="isAdmin"
                      className="form-control"
                      placeholder="Select rank for account"
                      defaultValue={`${values.isAdmin}`}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        if (e.target.value === 'false') {
                          setFieldValue('isAdmin', false);
                        } else if (e.target.value === 'true') {
                          setFieldValue('isAdmin', true);
                        }
                      }}
                      required
                    >
                      <option value="false">User</option>
                      <option value="true">Admin</option>
                    </Field>
                  </FormGroup>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="primary"
                  block
                  disabled={loading}
                >
                  {loading ? 'Please wait' : 'Edit'}
                </Button>
              </Modal.Footer>
              {error && (
                <Row className="justify-content-center">
                  <Alert variant="danger">{error}</Alert>
                </Row>
              )}
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ProfileEditForm;
