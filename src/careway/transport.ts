/**
 * Types métier CareWay spécifiques au transport médical.
 * Ces types complètent les resources FHIR R4 avec la logique métier CareWay.
 */

import type { TransportTypeValue } from '../fhir/r4/ServiceRequest.js';
import type { TaskStatus } from '../fhir/r4/Task.js';

// ── Mission (vue transporteur) ────────────────────────────────────────────────

/**
 * Résumé d'une mission de transport — vue utilisée par le frontend transporteur
 * et l'app mobile chauffeur. Dénormalisé pour l'affichage rapide.
 */
export interface MissionSummary {
  /** ID de la Task FHIR */
  taskId: string;
  /** ID du ServiceRequest FHIR (prescription source) */
  serviceRequestId: string;
  /** Statut de la mission */
  status: TaskStatus;
  /** Type de transport */
  transportType: TransportTypeValue;
  /** Nom du patient */
  patientName: string;
  /** Lieu de départ */
  lieuDepart: string;
  /** Lieu d'arrivée */
  lieuArrivee: string;
  /** Date/heure du transport */
  dateTransport: string; // ISO 8601
  /** Motif médical */
  motifMedical: string;
  /** Nom du médecin prescripteur */
  medecinName: string;
  /** URL du PDF d'ordonnance */
  prescriptionPdfUrl?: string;
}

// ── Prescription (vue médecin) ────────────────────────────────────────────────

/**
 * Résumé d'une prescription — vue utilisée par le frontend médecin.
 */
export interface PrescriptionSummary {
  /** ID du ServiceRequest FHIR */
  serviceRequestId: string;
  /** Statut FHIR */
  status: string;
  /** Nom du patient */
  patientName: string;
  /** NSS du patient */
  patientNss: string;
  /** Type de transport */
  transportType: TransportTypeValue;
  /** Motif médical */
  motifMedical: string;
  /** Date de la prescription */
  datePrescription: string;
  /** URL du PDF */
  pdfUrl?: string;
  /** Mission associée (si déjà attribuée) */
  mission?: {
    taskId: string;
    status: TaskStatus;
    transporteurName: string;
  };
}

// ── Events ───────────────────────────────────────────────────────────────────

/**
 * Événement publié dans Upstash Redis quand un ServiceRequest est créé.
 * Consommé par l'Orchestrator.
 */
export interface ServiceRequestCreatedEvent {
  type: 'ServiceRequest.created';
  serviceRequestId: string;
  patientId: string;
  practitionerId: string;
  transportType: TransportTypeValue;
  lieuDepart: string;
  lieuArrivee: string;
  dateTransport?: string;
  timestamp: string;
}

/**
 * Événement publié quand une Task est acceptée par un transporteur.
 * Consommé par pm-backend (pour notifier le patient).
 */
export interface TaskAcceptedEvent {
  type: 'Task.accepted';
  taskId: string;
  serviceRequestId: string;
  patientId: string;
  transporteurId: string;
  transporteurName: string;
  timestamp: string;
}

/**
 * Événement publié quand une mission est terminée.
 */
export interface TaskCompletedEvent {
  type: 'Task.completed';
  taskId: string;
  serviceRequestId: string;
  patientId: string;
  transporteurId: string;
  timestamp: string;
}

export type CarewayEvent = ServiceRequestCreatedEvent | TaskAcceptedEvent | TaskCompletedEvent;
