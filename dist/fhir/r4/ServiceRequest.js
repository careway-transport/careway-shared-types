// ── Codes transport CareWay ──────────────────────────────────────────────────
export const TRANSPORT_TYPE_SYSTEM = 'https://carewaytransport.fr/fhir/transport-type';
export const TransportType = {
    AMBULANCE: 'ambulance',
    VSL: 'vsl',
    TAXI: 'taxi',
};
// ── Extensions CareWay ────────────────────────────────────────────────────────
export const EXTENSION_LIEU_DEPART = 'https://carewaytransport.fr/fhir/ext/lieu-depart';
export const EXTENSION_LIEU_ARRIVEE = 'https://carewaytransport.fr/fhir/ext/lieu-arrivee';
export const EXTENSION_EXONERATION = 'https://carewaytransport.fr/fhir/ext/exoneration';
export const EXTENSION_PENSION_MILITAIRE = 'https://carewaytransport.fr/fhir/ext/pension-militaire';
export const EXTENSION_PDF_URL = 'https://carewaytransport.fr/fhir/ext/pdf-url';
/** Crée un ServiceRequest de transport à partir des données CareWay */
export function createTransportServiceRequest(params) {
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
//# sourceMappingURL=ServiceRequest.js.map