// ── Codes Task CareWay ────────────────────────────────────────────────────────
export const TASK_CODE_SYSTEM = 'https://carewaytransport.fr/fhir/task-code';
export const TaskCode = {
    TRANSPORT_MISSION: 'transport-mission',
};
/** Transitions de statut autorisées pour un transporteur */
export const ALLOWED_TASK_TRANSITIONS = {
    draft: ['requested'],
    requested: ['accepted', 'rejected', 'cancelled'],
    received: ['accepted', 'rejected'],
    accepted: ['in-progress', 'cancelled'],
    rejected: [],
    ready: ['in-progress'],
    cancelled: [],
    'in-progress': ['completed', 'failed', 'on-hold'],
    'on-hold': ['in-progress', 'cancelled'],
    failed: [],
    completed: [],
    'entered-in-error': [],
};
/** Vérifie qu'une transition de statut est légale */
export function isValidTaskTransition(from, to) {
    return ALLOWED_TASK_TRANSITIONS[from].includes(to);
}
//# sourceMappingURL=Task.js.map