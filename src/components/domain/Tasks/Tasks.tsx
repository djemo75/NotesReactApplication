import React from 'react';
import { taskModel } from 'types/taskModel.';
import TasksTable from './TasksTable';

type Props = {
  tasks: taskModel[];
};

function TasksTables({ tasks }: Props) {
  const waitingTasks = tasks.filter((x) => x.status === 'waiting');
  const readyTasks = tasks.filter((x) => x.status === 'ready');
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ margin: '0.25rem', width: '50%' }}>
        <h5>This tasks wait you :)</h5>
        <TasksTable tasks={waitingTasks} />
      </div>
      <div style={{ margin: '0.25rem', width: '50%' }}>
        <h5>Good work!</h5>
        <TasksTable tasks={readyTasks} />
      </div>
    </div>
  );
}

export default TasksTables;
