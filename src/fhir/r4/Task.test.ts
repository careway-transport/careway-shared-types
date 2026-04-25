import { describe, it, expect } from 'vitest';
import { isValidTaskTransition } from './Task.js';
import type { TaskStatus } from './Task.js';

describe('isValidTaskTransition', () => {
  it('autorise requested → accepted', () => {
    expect(isValidTaskTransition('requested', 'accepted')).toBe(true);
  });

  it('autorise accepted → in-progress', () => {
    expect(isValidTaskTransition('accepted', 'in-progress')).toBe(true);
  });

  it('autorise in-progress → completed', () => {
    expect(isValidTaskTransition('in-progress', 'completed')).toBe(true);
  });

  it('refuse completed → tout autre statut', () => {
    const allStatuses: TaskStatus[] = [
      'draft',
      'requested',
      'received',
      'accepted',
      'rejected',
      'ready',
      'cancelled',
      'in-progress',
      'on-hold',
      'failed',
      'completed',
      'entered-in-error',
    ];
    for (const to of allStatuses) {
      expect(isValidTaskTransition('completed', to)).toBe(false);
    }
  });

  it('refuse requested → completed (sans passer par accepted)', () => {
    expect(isValidTaskTransition('requested', 'completed')).toBe(false);
  });

  it('autorise requested → rejected', () => {
    expect(isValidTaskTransition('requested', 'rejected')).toBe(true);
  });

  it('autorise accepted → cancelled', () => {
    expect(isValidTaskTransition('accepted', 'cancelled')).toBe(true);
  });
});
