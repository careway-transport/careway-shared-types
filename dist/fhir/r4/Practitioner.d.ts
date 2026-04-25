import type { Resource, Identifier, HumanName, ContactPoint, CodeableConcept } from './base.js';
/**
 * FHIR R4 Practitioner resource.
 * Représente un médecin prescripteur dans CareWay.
 *
 * Profil CareWay :
 * - identifier[0] : RPPS (système ANS OID 1.2.250.1.71.4.2.1)
 * - qualifier[0] : spécialité médicale (CIS ou SNOMED CT)
 */
export interface Practitioner extends Resource {
    resourceType: 'Practitioner';
    /** Identifiants (RPPS, id interne) */
    identifier?: Identifier[];
    active?: boolean;
    /** Nom du praticien */
    name?: HumanName[];
    /** Coordonnées */
    telecom?: ContactPoint[];
    /** Qualifications (spécialité, diplôme) */
    qualification?: PractitionerQualification[];
}
export interface PractitionerQualification {
    /** Code de spécialité */
    code: CodeableConcept;
    /** Période de validité */
    period?: {
        start?: string;
        end?: string;
    };
}
export declare const PRACTITIONER_RPPS_SYSTEM = "urn:oid:1.2.250.1.71.4.2.1";
export declare const PRACTITIONER_CAREWAY_SYSTEM = "https://carewaytransport.fr/fhir/practitioner-id";
/** Extrait le numéro RPPS depuis les identifiers */
export declare function getPractitionerRpps(p: Practitioner): string | undefined;
/** Retourne le nom affiché du praticien */
export declare function getPractitionerDisplayName(p: Practitioner): string;
//# sourceMappingURL=Practitioner.d.ts.map