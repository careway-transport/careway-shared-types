// ── Codes DocumentReference CareWay ──────────────────────────────────────────
export const DOCUMENT_TYPE_SYSTEM = 'https://carewaytransport.fr/fhir/document-type';
export const DocumentType = {
    PRESCRIPTION_TRANSPORT: 'prescription-transport',
    RAPPORT_MISSION: 'rapport-mission',
};
/** Crée un DocumentReference pour une ordonnance PDF */
export function createPrescriptionDocumentReference(params) {
    return {
        resourceType: 'DocumentReference',
        status: 'current',
        type: {
            coding: [{ system: DOCUMENT_TYPE_SYSTEM, code: DocumentType.PRESCRIPTION_TRANSPORT }],
            text: 'Prescription de transport médical',
        },
        subject: { reference: params.patientRef },
        date: new Date().toISOString(),
        author: [{ reference: params.authorRef }],
        context: {
            related: [{ reference: params.serviceRequestRef }],
        },
        content: [
            {
                attachment: {
                    contentType: 'application/pdf',
                    url: params.pdfUrl,
                    title: 'Ordonnance de transport',
                },
            },
        ],
    };
}
//# sourceMappingURL=DocumentReference.js.map