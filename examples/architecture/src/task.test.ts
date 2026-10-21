import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTask } from './application/create-task.ts';
import { makeMemoryTaskStore } from './adapters/memory-task-store.ts';

const input = {
  id: 'task-1',
  eventId: 'event-1',
  title: '  Build an app  ',
  createdAt: '2026-10-21T12:00:00.000Z',
};

test('creates a normalized task and records its pending event', async () => {
  const memory = makeMemoryTaskStore();
  const result = await createTask({ input, store: memory.store });
  const task = { id: 'task-1', title: 'Build an app', createdAt: '2026-10-21T12:00:00.000Z' };
  assert.deepEqual(result, { ok: true, task });
  assert.deepEqual(memory.find('task-1'), task);
  assert.deepEqual(memory.pendingEvents(), [{
    type: 'TaskCreated',
    eventId: 'event-1',
    taskId: 'task-1',
    occurredAt: '2026-10-21T12:00:00.000Z',
    version: 1,
  }]);
});

test('rejects an empty title without persisting state or an event', async () => {
  const memory = makeMemoryTaskStore();
  const result = await createTask({ input: { ...input, title: '  ' }, store: memory.store });
  assert.deepEqual(result, { ok: false, reason: 'EmptyTitle' });
  assert.equal(memory.find('task-1'), undefined);
  assert.deepEqual(memory.pendingEvents(), []);
});

test('a duplicate task leaves the original state and outbox unchanged', async () => {
  const memory = makeMemoryTaskStore();
  await createTask({ input, store: memory.store });
  const result = await createTask({
    input: { ...input, title: 'Changed title', eventId: 'event-2' },
    store: memory.store,
  });
  assert.deepEqual(result, { ok: false, reason: 'AlreadyExists' });
  assert.deepEqual(memory.find('task-1'), {
    id: 'task-1', title: 'Build an app', createdAt: '2026-10-21T12:00:00.000Z',
  });
  assert.deepEqual(memory.pendingEvents().map(event => event.eventId), ['event-1']);
});
