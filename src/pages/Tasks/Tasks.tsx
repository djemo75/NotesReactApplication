import React, { useState, useContext, useEffect } from 'react';
import Layout from 'components/layout/Layout';
import { Table } from 'react-bootstrap';
import { taskModel } from 'types/taskModel.';
import { getTasksByUserId } from 'components/api/tasks';
import { AuthContext } from 'components/context/authContext';

function Tasks() {
  const [tasks, setTasks] = useState<taskModel[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const loadTasks = async () => {
    setLoading(true);
    if (user) {
      const res = await getTasksByUserId(user?.id);
      setTasks(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Layout>
      <h2 style={{ margin: '1.5rem 0' }}>Tasks:</h2>
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
          {tasks &&
            tasks.length > 0 &&
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.estimate} hours</td>
                <td>{task.status}</td>
                <td>{task.createdAt}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Layout>
  );
}

export default Tasks;
