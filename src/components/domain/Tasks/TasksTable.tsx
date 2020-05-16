import React from 'react';
import { taskModel } from 'types/taskModel.';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type Props = {
  tasks: taskModel[];
};

function TasksTable({ tasks }: Props) {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Task Title</th>
          <th>Estimate</th>
          <th>Status</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td>{task.estimate} hours</td>
            <td>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TasksTable;
