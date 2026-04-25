// ── Helpers ──────────────────────────────────────────────────────────────────
export const PATIENT_NSS_SYSTEM = 'urn:oid:1.2.250.1.213.1.4.8';
export const PATIENT_CAREWAY_SYSTEM = 'https://carewaytransport.fr/fhir/patient-id';
/** Extrait le NSS depuis les identifiers d'un Patient FHIR */
export function getPatientNss(patient) {
    return patient.identifier?.find((id) => id.system === PATIENT_NSS_SYSTEM)?.value;
}
/** Retourne le nom affiché du patient */
export function getPatientDisplayName(patient) {
    const official = patient.name?.find((n) => n.use === 'official') ?? patient.name?.[0];
    if (!official)
        return 'Patient inconnu';
    const given = official.given?.join(' ') ?? '';
    return `${given} ${official.family ?? ''}`.trim();
}
//# sourceMappingURL=Patient.js.map