import type {
  Resource,
  Identifier,
  HumanName,
  ContactPoint,
  Address,
  CodeableConcept,
  Reference,
} from './base';

/**
 * FHIR R4 Patient resource.
 * Représente un patient dans le système CareWay.
 *
 * Profil CareWay :
 * - identifier[0] : NSS (système ANS OID 1.2.250.1.213.1.4.8)
 * - identifier[1] : identifiant interne CareWay
 * - name[0] : nom officiel (use=official)
 * - telecom : email + téléphone
 */
export interface Patient extends Resource {
  resourceType: 'Patient';

  /** Identifiants du patient (NSS, id interne) */
  identifier?: Identifier[];

  /** Actif dans le système */
  active?: boolean;

  /** Nom(s) du patient */
  name?: HumanName[];

  /** Coordonnées (téléphone, email) */
  telecom?: ContactPoint[];

  /** Sexe administratif */
  gender?: 'male' | 'female' | 'other' | 'unknown';

  /** Date de naissance ISO 8601 (YYYY-MM-DD) */
  birthDate?: string;

  /** Adresse(s) */
  address?: Address[];

  /** Médecin traitant */
  generalPractitioner?: Reference[];

  /** Conditions médicales (ALD, maladie chronique…) */
  condition?: CodeableConcept[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export const PATIENT_NSS_SYSTEM = 'urn:oid:1.2.250.1.213.1.4.8';
export const PATIENT_CAREWAY_SYSTEM = 'https://carewaytransport.fr/fhir/patient-id';

/** Extrait le NSS depuis les identifiers d'un Patient FHIR */
export function getPatientNss(patient: Patient): string | undefined {
  return patient.identifier?.find((id) => id.system === PATIENT_NSS_SYSTEM)?.value;
}

/** Retourne le nom affiché du patient */
export function getPatientDisplayName(patient: Patient): string {
  const official = patient.name?.find((n) => n.use === 'official') ?? patient.name?.[0];
  if (!official) return 'Patient inconnu';
  const given = official.given?.join(' ') ?? '';
  return `${given} ${official.family ?? ''}`.trim();
}
