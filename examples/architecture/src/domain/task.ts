export type Task = Readonly<{
  id: string;
  title: string;
  createdAt: string;
}>;

export type TaskCreated = Readonly<{
  type: 'TaskCreated';
  eventId: string;
  taskId: string;
  occurredAt: string;
  version: 1;
}>;

export type CreateTaskResult =
  | { readonly ok: true; readonly task: Task; readonly event: TaskCreated }
  | { readonly ok: false; readonly reason: 'EmptyTitle' };

export function decideCreateTask(input: {
  id: string;
  title: string;
  createdAt: string;
  eventId: string;
}): CreateTaskResult {
  const title = input.title.trim();
  if (!title) return { ok: false, reason: 'EmptyTitle' };
  return {
    ok: true,
    task: { id: input.id, title, createdAt: input.createdAt },
    event: {
      type: 'TaskCreated',
      eventId: input.eventId,
      taskId: input.id,
      occurredAt: input.createdAt,
      version: 1,
    },
  };
}
