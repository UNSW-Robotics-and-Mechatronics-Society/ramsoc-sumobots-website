import { getAllTasks } from "@/app/2026/admin/_actions/tasks";
import AdminShell from "../_components/AdminShell";
import TasksTable from "../_components/TasksTable";

export default async function AdminTasksPage() {
  const tasks = await getAllTasks();

  return (
    <AdminShell>
      <h2 className="mb-4 text-xl">Tasks</h2>
      <TasksTable tasks={tasks} />
    </AdminShell>
  );
}
