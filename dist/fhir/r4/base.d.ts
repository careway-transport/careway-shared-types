/**
 * FHIR R4 — types de base réutilisés dans tous les resources.
 * Référence : https://www.hl7.org/fhir/R4/datatypes.html
 */
export type FhirResourceType = 'Patient' | 'Practitioner' | 'Organization' | 'ServiceRequest' | 'Task' | 'DocumentReference';
/** Référence vers un autre resource FHIR */
export interface Reference {
    reference?: string;
    type?: FhirResourceType;
    display?: string;
}
/** Codage dans un système de terminologie */
export interface Coding {
    system?: string;
    code?: string;
    display?: string;
    version?: string;
}
/** Concept codé avec libellé */
export interface CodeableConcept {
    coding?: Coding[];
    text?: string;
}
/** Identifiant unique dans un système */
export interface Identifier {
    system?: string;
    value?: string;
    use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
}
/** Nom d'une personne */
export interface HumanName {
    use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
    text?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
}
/** Moyen de contact (téléphone, email…) */
export interface ContactPoint {
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
}
/** Adresse postale */
export interface Address {
    use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
    type?: 'postal' | 'physical' | 'both';
    text?: string;
    line?: string[];
    city?: string;
    postalCode?: string;
    country?: string;
}
/** Période temporelle */
export interface Period {
    start?: string;
    end?: string;
}
/** Pièce jointe (PDF, image…) */
export interface Attachment {
    contentType?: string;
    url?: string;
    data?: string;
    title?: string;
    creation?: string;
}
/** Annotation (commentaire) */
export interface Annotation {
    text: string;
    time?: string;
    authorString?: string;
}
/** Quantité */
export interface Quantity {
    value?: number;
    unit?: string;
    system?: string;
    code?: string;
}
/** En-tête commune à tous les resources FHIR R4 */
export interface Resource {
    resourceType: FhirResourceType;
    id?: string;
    meta?: {
        versionId?: string;
        lastUpdated?: string;
        profile?: string[];
    };
}
//# sourceMappingURL=base.d.ts.map