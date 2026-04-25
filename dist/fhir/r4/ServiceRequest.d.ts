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
    subject: Reference;
    /** Médecin prescripteur */
    requester?: Reference;
    /** Établissement de santé d'arrivée */
    locationReference?: Reference[];
    /** Motif médical de la demande */
    reasonCode?: CodeableConcept[];
    /** Conditions médicales associées (ALD, AT/MP…) */
    reasonReference?: Reference[];
    /** Date souhaitée du transport */
    occurrenceDateTime?: string;
    /** Informations complémentaires (exonération, pension militaire…) */
    note?: Annotation[];
    /** Extension CareWay — données spécifiques prescription */
    extension?: ServiceRequestExtension[];
    /** Date de création */
    authoredOn?: string;
}
export type ServiceRequestStatus = 'draft' | 'active' | 'on-hold' | 'revoked' | 'completed' | 'entered-in-error' | 'unknown';
export type ServiceRequestIntent = 'proposal' | 'plan' | 'directive' | 'order' | 'original-order' | 'reflex-order' | 'filler-order' | 'instance-order' | 'option';
/** Extension CareWay pour données propres à la prescription */
export interface ServiceRequestExtension {
    url: string;
    valueString?: string;
    valueBoolean?: boolean;
    valueCode?: string;
}
export declare const TRANSPORT_TYPE_SYSTEM = "https://carewaytransport.fr/fhir/transport-type";
export declare const TransportType: {
    readonly AMBULANCE: "ambulance";
    readonly VSL: "vsl";
    readonly TAXI: "taxi";
};
export type TransportTypeValue = (typeof TransportType)[keyof typeof TransportType];
export declare const EXTENSION_LIEU_DEPART = "https://carewaytransport.fr/fhir/ext/lieu-depart";
export declare const EXTENSION_LIEU_ARRIVEE = "https://carewaytransport.fr/fhir/ext/lieu-arrivee";
export declare const EXTENSION_EXONERATION = "https://carewaytransport.fr/fhir/ext/exoneration";
export declare const EXTENSION_PENSION_MILITAIRE = "https://carewaytransport.fr/fhir/ext/pension-militaire";
export declare const EXTENSION_PDF_URL = "https://carewaytransport.fr/fhir/ext/pdf-url";
/** Crée un ServiceRequest de transport à partir des données CareWay */
export declare function createTransportServiceRequest(params: {
    patientRef: string;
    practitionerRef: string;
    transportType: TransportTypeValue;
    motifMedical: string;
    lieuDepart: string;
    lieuArrivee: string;
    dateTransport?: string;
}): Omit<ServiceRequest, 'id' | 'meta'>;
//# sourceMappingURL=ServiceRequest.d.ts.map