/**
 * @careway/shared-types — point d'entrée principal
 *
 * Exporte :
 * - types FHIR R4 (Patient, Practitioner, Organization, ServiceRequest, Task, DocumentReference)
 * - types métier CareWay (MissionSummary, PrescriptionSummary, Events, API responses)
 * - helpers FHIR (getPatientNss, getPractitionerDisplayName, isValidTaskTransition…)
 *
 * Usage :
 *   import type { Patient, ServiceRequest } from '@careway/shared-types';
 *   import type { MissionSummary } from '@careway/shared-types/careway';
 */
export * from './fhir/index.js';
export * from './careway/index.js';
//# sourceMappingURL=index.d.ts.map