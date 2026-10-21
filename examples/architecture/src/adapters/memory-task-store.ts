import type { TaskStore } from '../application/create-task.ts';
import type { Task, TaskCreated } from '../domain/task.ts';

export function makeMemoryTaskStore() {
  const tasks = new Map<string, Task>();
  const outbox: TaskCreated[] = [];
  const store: TaskStore = {
    async createWithEvents({ task, events }) {
      if (tasks.has(task.id)) return 'AlreadyExists';
      tasks.set(task.id, task);
      outbox.push(...events);
      return 'Created';
    },
  };
  return {
    store,
    find: (id: string) => tasks.get(id),
    pendingEvents: (): readonly TaskCreated[] => [...outbox],
  };
}
