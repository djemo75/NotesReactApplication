import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  FormGroup,
  FormLabel,
  Row,
  Alert,
} from 'react-bootstrap';
import { Formik, Field } from 'formik';
import { AuthContext } from 'components/context/authContext';
import { taskModel } from 'types/taskModel.';
import { addTask } from 'components/api/tasks';

type Props = {
  data?: taskModel;
  onAdd: (updatedData: taskModel) => void;
};

function AddTaskModal({ onAdd }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Formik<taskModel>
          initialValues={{
            id: 0,
            userId: user?.id,
            title: '',
            description: '',
            estimate: 0,
            status: 'waiting',
            createdAt: new Date(),
          }}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              await addTask(values);
              onAdd(values);
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
                <Modal.Title>Add Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup>
                  <FormLabel htmlFor="title">Task Title</FormLabel>
                  <Field
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter task title"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Field
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Enter description"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="estimate">Estimate(in hours)</FormLabel>
                  <Field
                    type="number"
                    name="estimate"
                    className="form-control"
                    placeholder="Enter task estimate"
                    min={0}
                    required
                  />
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="primary"
                  block
                  disabled={loading}
                >
                  {loading ? 'Please wait' : 'Add'}
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

export default AddTaskModal;
