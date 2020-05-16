import React, { useState } from 'react';
import { taskModel } from 'types/taskModel.';
import { Formik, Field } from 'formik';
import {
  Spinner,
  Button,
  FormGroup,
  FormLabel,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styles from './Task.module.css';

type Props = {
  task: taskModel;
  actionLoading: boolean;
  saveChanges: (data: taskModel) => void;
  deleteCurrentTask: (taskId: number) => void;
};

function TaskDetails({
  task,
  actionLoading,
  deleteCurrentTask,
  saveChanges,
}: Props) {
  const [defaultTask] = useState<taskModel | null>(task);
  const history = useHistory();
  return (
    <Formik initialValues={task} onSubmit={(values) => saveChanges(values)}>
      {({ handleSubmit, setFieldValue, values }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.heading}>
            <div>
              <h2>Task information</h2>
            </div>
            <div className={styles.buttonsWrapper}>
              {actionLoading && <Spinner animation="border" />}
              <Button variant="dark" onClick={() => history.goBack()}>
                Back
              </Button>{' '}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">After save will be redirect!</Tooltip>
                }
              >
                <Button
                  className={values === defaultTask ? styles.btnDisabled : ''}
                  variant={values === defaultTask ? 'dark' : 'success'}
                  type="submit"
                  disabled={values === defaultTask}
                >
                  Save Changes
                </Button>
              </OverlayTrigger>{' '}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-top">You can't restore task!</Tooltip>
                }
              >
                <Button
                  variant="danger"
                  onClick={() => deleteCurrentTask(values.id)}
                >
                  Delete
                </Button>
              </OverlayTrigger>
            </div>
          </div>
          <div style={{ maxWidth: '500px' }}>
            <FormGroup>
              <FormLabel htmlFor="title">Task Title</FormLabel>
              <Field
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter task title"
                min={0}
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
                min={0}
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
            <FormGroup>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Field
                as="select"
                name="status"
                className="form-control"
                placeholder="Select status for task"
                defaultValue={`${values.status}`}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFieldValue('status', e.target.value)
                }
                required
              >
                <option value="waiting">Waiting</option>
                <option value="ready">Ready</option>
              </Field>
            </FormGroup>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default TaskDetails;
