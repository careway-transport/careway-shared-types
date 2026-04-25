import type { Resource, Reference, CodeableConcept, Identifier, Annotation } from './base.js';

/**
 * FHIR R4 ServiceRequest resource.
 * Représente une demande de transport médical prescrite par un médecin.
 * Généré par pm-backend quand un médecin crée une prescription.
 *
 * Flow CareWay :
 *   Médecin crée prescription → pm-backend → POST /ServiceRequest → Gateway
 *   Gateway publie event ServiceRequest.created → Orchestrator attribue mission
 */
export interface ServiceRequest extends Resource {
  resourceType: 'ServiceRequest';

  identifier?: Identifier[];

  /** Statut de la demande */
  status: ServiceRequestStatus;

  /** Intention de la demande */
  intent: ServiceRequestIntent;

  /** Type de transport prescrit */
  code?: CodeableConcept;

  /** Patient concerné */
  subject: Reference; // ref Patient

  /** Médecin prescripteur */
  requester?: Reference; // ref Practitioner

  /** Établissement de santé d'arrivée */
  locationReference?: Reference[]; // ref Organization (destination)

  /** Motif médical de la demande */
  reasonCode?: CodeableConcept[];

  /** Conditions médicales associées (ALD, AT/MP…) */
  reasonReference?: Reference[];

  /** Date souhaitée du transport */
  occurrenceDateTime?: string; // ISO 8601

  /** Informations complémentaires (exonération, pension militaire…) */
  note?: Annotation[];

  /** Extension CareWay — données spécifiques prescription */
  extension?: ServiceRequestExtension[];

  /** Date de création */
  authoredOn?: string;
}

export type ServiceRequestStatus =
  | 'draft'
  | 'active'
  | 'on-hold'
  | 'revoked'
  | 'completed'
  | 'entered-in-error'
  | 'unknown';

export type ServiceRequestIntent =
  | 'proposal'
  | 'plan'
  | 'directive'
  | 'order'
  | 'original-order'
  | 'reflex-order'
  | 'filler-order'
  | 'instance-order'
  | 'option';

/** Extension CareWay pour données propres à la prescription */
export interface ServiceRequestExtension {
  url: string;
  valueString?: string;
  valueBoolean?: boolean;
  valueCode?: string;
}

// ── Codes transport CareWay ──────────────────────────────────────────────────

export const TRANSPORT_TYPE_SYSTEM = 'https://carewaytransport.fr/fhir/transport-type';

export const TransportType = {
  AMBULANCE: 'ambulance',
  VSL: 'vsl',
  TAXI: 'taxi',
} as const;

export type TransportTypeValue = (typeof TransportType)[keyof typeof TransportType];

// ── Extensions CareWay ────────────────────────────────────────────────────────

export const EXTENSION_LIEU_DEPART = 'https://carewaytransport.fr/fhir/ext/lieu-depart';
export const EXTENSION_LIEU_ARRIVEE = 'https://carewaytransport.fr/fhir/ext/lieu-arrivee';
export const EXTENSION_EXONERATION = 'https://carewaytransport.fr/fhir/ext/exoneration';
export const EXTENSION_PENSION_MILITAIRE = 'https://carewaytransport.fr/fhir/ext/pension-militaire';
export const EXTENSION_PDF_URL = 'https://carewaytransport.fr/fhir/ext/pdf-url';

/** Crée un ServiceRequest de transport à partir des données CareWay */
export function createTransportServiceRequest(params: {
  patientRef: string;
  practitionerRef: string;
  transportType: TransportTypeValue;
  motifMedical: string;
  lieuDepart: string;
  lieuArrivee: string;
  dateTransport?: string;
}): Omit<ServiceRequest, 'id' | 'meta'> {
  return {
    resourceType: 'ServiceRequest',
    status: 'active',
    intent: 'order',
    code: {
      coding: [{ system: TRANSPORT_TYPE_SYSTEM, code: params.transportType }],
      text: params.transportType.toUpperCase(),
    },
    subject: { reference: params.patientRef },
    requester: { reference: params.practitionerRef },
    reasonCode: [{ text: params.motifMedical }],
    ...(params.dateTransport !== undefined ? { occurrenceDateTime: params.dateTransport } : {}),
    authoredOn: new Date().toISOString(),
    extension: [
      { url: EXTENSION_LIEU_DEPART, valueString: params.lieuDepart },
      { url: EXTENSION_LIEU_ARRIVEE, valueString: params.lieuArrivee },
    ],
  };
}
