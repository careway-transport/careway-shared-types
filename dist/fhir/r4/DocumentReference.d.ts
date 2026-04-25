import type { Resource, Reference, Identifier, CodeableConcept, Attachment } from './base.js';
/**
 * FHIR R4 DocumentReference resource.
 * Représente un document médical (ordonnance PDF, compte-rendu…).
 * Utilisé pour stocker le PDF de prescription généré par pm-backend.
 *
 * Flow CareWay :
 *   pm-backend génère PDF → POST /DocumentReference → Gateway
 *   URL du PDF stockée dans content[0].attachment.url (Cloudflare R2)
 */
export interface DocumentReference extends Resource {
    resourceType: 'DocumentReference';
    identifier?: Identifier[];
    /** Statut du document */
    status: DocumentReferenceStatus;
    /** Statut du document source (si différent) */
    docStatus?: 'preliminary' | 'final' | 'amended' | 'entered-in-error';
    /** Type de document */
    type?: CodeableConcept;
    /** Catégorie (ordonnance, bilan…) */
    category?: CodeableConcept[];
    /** Patient concerné */
    subject?: Reference;
    /** Date de création du document */
    date?: string;
    /** Auteur (médecin prescripteur) */
    author?: Reference[];
    /** Prescription associée */
    context?: DocumentReferenceContext;
    /** Contenu du document */
    content: DocumentReferenceContent[];
}
export interface DocumentReferenceContent {
    attachment: Attachment;
    format?: CodeableConcept;
}
export interface DocumentReferenceContext {
    /** ServiceRequest associé */
    related?: Reference[];
    /** Période couverte par le document */
    period?: {
        start?: string;
        end?: string;
    };
}
export type DocumentReferenceStatus = 'current' | 'superseded' | 'entered-in-error';
export declare const DOCUMENT_TYPE_SYSTEM = "https://carewaytransport.fr/fhir/document-type";
export declare const DocumentType: {
    readonly PRESCRIPTION_TRANSPORT: "prescription-transport";
    readonly RAPPORT_MISSION: "rapport-mission";
};
export type DocumentTypeValue = (typeof DocumentType)[keyof typeof DocumentType];
/** Crée un DocumentReference pour une ordonnance PDF */
export declare function createPrescriptionDocumentReference(params: {
    patientRef: string;
    authorRef: string;
    serviceRequestRef: string;
    pdfUrl: string;
}): Omit<DocumentReference, 'id' | 'meta'>;
//# sourceMappingURL=DocumentReference.d.ts.map