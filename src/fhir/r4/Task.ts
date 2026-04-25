import type { Resource, Reference, Identifier, CodeableConcept, Annotation } from './base.js';

/**
 * FHIR R4 Task resource.
 * Représente une mission de transport assignée à un transporteur.
 * Généré par l'Orchestrator quand il assigne un ServiceRequest.
 *
 * Flow CareWay :
 *   Orchestrator reçoit ServiceRequest.created
 *   → Algorithme d'attribution (contrats > favoris > FIFO)
 *   → Crée Task (status=requested) → POST /Task → Gateway
 *   → Transporteur accepte → PATCH /Task/id (status=accepted)
 *   → Transport réalisé → PATCH /Task/id (status=completed)
 */
export interface Task extends Resource {
  resourceType: 'Task';

  identifier?: Identifier[];

  /** Statut de la mission */
  status: TaskStatus;

  /** Intention de la tâche */
  intent: TaskIntent;

  /** Priorité */
  priority?: 'routine' | 'urgent' | 'asap' | 'stat';

  /** Type de tâche */
  code?: CodeableConcept;

  /** ServiceRequest associé (la prescription source) */
  focus?: Reference; // ref ServiceRequest

  /** Patient transporté */
  for?: Reference; // ref Patient

  /** Médecin demandeur */
  requester?: Reference; // ref Practitioner

  /** Transporteur assigné */
  owner?: Reference; // ref Organization ou Practitioner (chauffeur)

  /** Dates */
  authoredOn?: string; // création
  lastModified?: string; // dernière mise à jour

  /** Restrictions sur qui peut exécuter */
  restriction?: {
    period?: {
      start?: string;
      end?: string;
    };
  };

  /** Données d'entrée (lieu départ, arrivée…) */
  input?: TaskInput[];

  /** Résultats (rapport de mission…) */
  output?: TaskOutput[];

  /** Notes internes */
  note?: Annotation[];
}

export interface TaskInput {
  type: CodeableConcept;
  valueString?: string;
  valueReference?: Reference;
}

export interface TaskOutput {
  type: CodeableConcept;
  valueString?: string;
  valueReference?: Reference;
}

export type TaskStatus =
  | 'draft'
  | 'requested'
  | 'received'
  | 'accepted'
  | 'rejected'
  | 'ready'
  | 'cancelled'
  | 'in-progress'
  | 'on-hold'
  | 'failed'
  | 'completed'
  | 'entered-in-error';

export type TaskIntent =
  | 'unknown'
  | 'proposal'
  | 'plan'
  | 'order'
  | 'original-order'
  | 'reflex-order'
  | 'filler-order'
  | 'instance-order'
  | 'option';

// ── Codes Task CareWay ────────────────────────────────────────────────────────

export const TASK_CODE_SYSTEM = 'https://carewaytransport.fr/fhir/task-code';

export const TaskCode = {
  TRANSPORT_MISSION: 'transport-mission',
} as const;

/** Transitions de statut autorisées pour un transporteur */
export const ALLOWED_TASK_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
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
export function isValidTaskTransition(from: TaskStatus, to: TaskStatus): boolean {
  return ALLOWED_TASK_TRANSITIONS[from].includes(to);
}
