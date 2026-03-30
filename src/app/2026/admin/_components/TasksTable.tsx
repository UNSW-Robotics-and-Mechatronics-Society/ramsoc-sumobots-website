"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/app/2026/_components/ui/Badge";
import { Button } from "@/app/2026/_components/ui/Button";
import Input from "@/app/2026/_components/ui/Input";
import {
  createTask,
  updateTask,
  deleteTask,
} from "@/app/2026/admin/_actions/tasks";

interface AdminTask {
  id: string;
  title: string;
  description: string;
  url: string;
  active: boolean;
  created_at: string;
}

export default function TasksTable({ tasks }: { tasks: AdminTask[] }) {
  const [isPending, startTransition] = useTransition();
  const [confirmAction, setConfirmAction] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const router = useRouter();

  function handleCreate() {
    if (!newTitle.trim()) return;
    startTransition(async () => {
      await createTask(newTitle.trim(), newDescription.trim(), newUrl.trim());
      setNewTitle("");
      setNewDescription("");
      setNewUrl("");
      setShowCreate(false);
      router.refresh();
    });
  }

  function handleToggleActive(task: AdminTask) {
    startTransition(async () => {
      await updateTask(task.id, { active: !task.active });
      router.refresh();
    });
  }

  function handleDelete(taskId: string) {
    if (confirmAction === `delete-${taskId}`) {
      startTransition(async () => {
        await deleteTask(taskId);
        setConfirmAction(null);
        router.refresh();
      });
    } else {
      setConfirmAction(`delete-${taskId}`);
    }
  }

  function startEdit(task: AdminTask) {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditUrl(task.url);
  }

  function handleSaveEdit() {
    if (!editingId || !editTitle.trim()) return;
    startTransition(async () => {
      await updateTask(editingId, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        url: editUrl.trim(),
      });
      setEditingId(null);
      router.refresh();
    });
  }

  const activeTasks = tasks.filter((t) => t.active);

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:gap-6">
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-main text-sm text-gray-400">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </p>
        <Button
          variant="secondary"
          size="default"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? "Cancel" : "Add Task"}
        </Button>
      </div>

      {showCreate && (
        <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
          <Input
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Complete the Lipo Battery Safety Quiz"
          />
          <Input
            label="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="e.g. Most team members must score 100%"
          />
          <Input
            label="URL (optional)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="e.g. https://docs.google.com/forms/..."
          />
          <Button
            variant="secondary"
            size="default"
            onClick={handleCreate}
            disabled={isPending || !newTitle.trim()}
          >
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Title
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Description
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Status
              </th>
              <th className="font-main px-4 py-3 text-xs font-medium text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-white/5 transition-colors hover:bg-white/5"
              >
                {editingId === task.id ? (
                  <td colSpan={4} className="px-4 py-3">
                    <div className="flex flex-col gap-3">
                      <Input
                        label="Title"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <Input
                        label="Description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                      <Input
                        label="URL"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="default"
                          className="text-xs"
                          onClick={handleSaveEdit}
                          disabled={isPending}
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="default"
                          className="text-xs"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="font-main px-4 py-3 text-sm text-white">
                      {task.title}
                      {task.url && (
                        <a
                          href={task.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-xs text-indigo-400 hover:text-indigo-300"
                        >
                          (link)
                        </a>
                      )}
                    </td>
                    <td className="font-main max-w-xs truncate px-4 py-3 text-sm text-gray-400">
                      {task.description || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={task.active ? "success" : "default"}>
                        {task.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="default"
                          className="text-xs"
                          onClick={() => startEdit(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="default"
                          className="text-xs"
                          onClick={() => handleToggleActive(task)}
                          disabled={isPending}
                        >
                          {task.active ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="default"
                          className="text-xs text-red-400"
                          onClick={() => handleDelete(task.id)}
                          disabled={isPending}
                        >
                          {confirmAction === `delete-${task.id}`
                            ? "Confirm?"
                            : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="font-main px-4 py-8 text-center text-sm text-gray-500"
                >
                  No tasks yet. Click &quot;Add Task&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Dashboard preview */}
    <div className="w-full shrink-0 xl:w-80">
      <div className="sticky top-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h4 className="font-main mb-1 text-xs font-medium text-gray-400">
          Dashboard Preview
        </h4>
        <p className="font-main mb-3 text-[10px] text-gray-500">
          How active tasks appear to participants
        </p>
        <div className="rounded-lg border border-white/10 bg-black/30 p-3">
          <h3 className="mb-2 text-sm font-semibold text-white">Action Items</h3>
          <div className="flex flex-col gap-1.5">
            {/* Built-in items */}
            <div className="font-main flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-gray-500 line-through">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-green-500/50 bg-green-500/20 text-[10px] text-green-400">
                &#x2713;
              </span>
              Create or join a team
            </div>
            <div className="font-main flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-white">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/20" />
              Get at least 3 team members
            </div>
            <div className="font-main flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-white">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/20" />
              Pay the entry fee
            </div>
            {/* Admin tasks */}
            {activeTasks.map((task) => (
              <div
                key={task.id}
                className="font-main flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-white"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/20" />
                <span className="truncate">{task.title}</span>
              </div>
            ))}
          </div>
        </div>
        {activeTasks.length === 0 && (
          <p className="font-main mt-2 text-[10px] text-gray-500">
            No active tasks. Create one to see it here.
          </p>
        )}
      </div>
    </div>
    </div>
  );
}
