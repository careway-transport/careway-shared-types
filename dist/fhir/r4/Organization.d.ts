import type { Resource, Identifier, ContactPoint, Address, CodeableConcept } from './base.js';
/**
 * FHIR R4 Organization resource.
 * Représente un établissement de santé ou une entreprise de transport sanitaire.
 *
 * Profil CareWay :
 * - type[0] : catégorie (hôpital, transporteur, cabinet…)
 * - identifier[0] : FINESS (OID 1.2.250.1.71.4.2.2) pour établissements de santé
 * - identifier[0] : SIRET pour transporteurs
 */
export interface Organization extends Resource {
    resourceType: 'Organization';
    identifier?: Identifier[];
    active?: boolean;
    /** Type d'organisation (hôpital, transporteur, cabinet…) */
    type?: CodeableConcept[];
    /** Nom de l'organisation */
    name?: string;
    /** Coordonnées */
    telecom?: ContactPoint[];
    /** Adresse(s) */
    address?: Address[];
}
export declare const ORGANIZATION_FINESS_SYSTEM = "urn:oid:1.2.250.1.71.4.2.2";
export declare const ORGANIZATION_SIRET_SYSTEM = "urn:oid:1.2.250.1.71.4.2.3";
export declare const ORGANIZATION_CAREWAY_SYSTEM = "https://carewaytransport.fr/fhir/organization-id";
/** Codes type d'organisation CareWay */
export declare const OrganizationType: {
    readonly HOSPITAL: "hospital";
    readonly TRANSPORT_COMPANY: "transport-company";
    readonly MEDICAL_OFFICE: "medical-office";
};
export type OrganizationTypeValue = (typeof OrganizationType)[keyof typeof OrganizationType];
//# sourceMappingURL=Organization.d.ts.map