import { randomUUID } from 'node:crypto';
import { createTask } from './application/create-task.ts';
import { makeMemoryTaskStore } from './adapters/memory-task-store.ts';

const memory = makeMemoryTaskStore();
const result = await createTask({
  input: {
    id: randomUUID(),
    eventId: randomUUID(),
    title: process.argv[2] ?? 'Build my next app',
    createdAt: new Date().toISOString(),
  },
  store: memory.store,
});
process.stdout.write(JSON.stringify({ result, outbox: memory.pendingEvents() }, null, 2) + '\n');
if (!result.ok) process.exitCode = 1;
