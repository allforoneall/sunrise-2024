// src/pages/index.tsx
import Head from "next/head";
import { Container, Typography, Button } from "@mui/material";
import { useState } from "react";
import Task from "@/model/Task";
import { getActiveTasks, getCompletedTasks, createTask, completeTask } from "@/modules/TaskManager";

export default function Home() {
  const [activeTasks, setActiveTasks] = useState(getActiveTasks());
  const [completedTasks, setCompletedTasks] = useState(getCompletedTasks());

  const handleCompleteTask = (taskTitle: string) => {
    completeTask(taskTitle);
    setActiveTasks(getActiveTasks());
    setCompletedTasks(getCompletedTasks());
  };

  const handleCreateTask = () => {
    createTask("New Task", "Description of new task", "Intern", 1);
    setActiveTasks(getActiveTasks());
  };

  return (
    <>
      <Head>
        <title>Taskboard System</title>
        <meta name="description" content="Taskboard System for managing tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <Typography variant="h4">Active Tasks</Typography>
        {activeTasks.map(task => (
          <div key={task.id}>
            <Typography variant="h6">{task.title}</Typography>
            <Button variant="contained" onClick={() => handleCompleteTask(task.title)}>Complete Task</Button>
          </div>
        ))}

        <Typography variant="h4">Completed Tasks</Typography>
        {completedTasks.map(task => (
          <Typography key={task.id} variant="h6">{task.title}</Typography>
        ))}

        <Button variant="contained" onClick={handleCreateTask}>Create New Task</Button>
      </Container>
    </>
  );
}
