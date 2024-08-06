
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed && task.group === getCurrentGroup());
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskTitle: string): void {
  const task = tasks.find(task => task.title === taskTitle);
  if (task) {
    task.completed = true;
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask = new Task(tasks.length + 1, title, description, persona, group);
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    Object.assign(task, updatedTask);
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}

function getCurrentGroup(): number {
  const completedGroups = new Set(tasks.filter(task => task.completed).map(task => task.group));
  for (let i = 1; i <= 4; i++) {
    if (!completedGroups.has(i)) {
      return i;
    }
  }
  return 4;
}
