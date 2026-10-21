import { decideCreateTask } from '../domain/task.ts';
import type { Task, TaskCreated } from '../domain/task.ts';

export type TaskStore = {
  createWithEvents: (input: {
    task: Task;
    events: readonly TaskCreated[];
  }) => Promise<'Created' | 'AlreadyExists'>;
};

export async function createTask({
  input,
  store,
}: {
  input: Parameters<typeof decideCreateTask>[0];
  store: TaskStore;
}) {
  const decision = decideCreateTask(input);
  if (!decision.ok) return decision;
  const saved = await store.createWithEvents({ task: decision.task, events: [decision.event] });
  if (saved === 'AlreadyExists') return { ok: false, reason: 'AlreadyExists' } as const;
  return { ok: true, task: decision.task } as const;
}
