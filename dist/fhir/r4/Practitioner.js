// ── Helpers ──────────────────────────────────────────────────────────────────
export const PRACTITIONER_RPPS_SYSTEM = 'urn:oid:1.2.250.1.71.4.2.1';
export const PRACTITIONER_CAREWAY_SYSTEM = 'https://carewaytransport.fr/fhir/practitioner-id';
/** Extrait le numéro RPPS depuis les identifiers */
export function getPractitionerRpps(p) {
    return p.identifier?.find((id) => id.system === PRACTITIONER_RPPS_SYSTEM)?.value;
}
/** Retourne le nom affiché du praticien */
export function getPractitionerDisplayName(p) {
    const name = p.name?.[0];
    if (!name)
        return 'Praticien inconnu';
    const prefix = name.prefix?.join(' ') ?? '';
    const given = name.given?.join(' ') ?? '';
    return `${prefix} ${given} ${name.family ?? ''}`.trim();
}
//# sourceMappingURL=Practitioner.js.map