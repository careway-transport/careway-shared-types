import { describe, it, expect } from 'vitest';
import {
  createPrescriptionDocumentReference,
  DocumentType,
  DOCUMENT_TYPE_SYSTEM,
} from './DocumentReference.js';

describe('createPrescriptionDocumentReference', () => {
  const params = {
    patientRef: 'Patient/1',
    authorRef: 'Practitioner/2',
    serviceRequestRef: 'ServiceRequest/3',
    pdfUrl: 'https://r2.carewaytransport.fr/prescriptions/42.pdf',
  };

  it('crée un DocumentReference current', () => {
    const dr = createPrescriptionDocumentReference(params);
    expect(dr.resourceType).toBe('DocumentReference');
    expect(dr.status).toBe('current');
  });

  it('référence le patient et l auteur', () => {
    const dr = createPrescriptionDocumentReference(params);
    expect(dr.subject?.reference).toBe('Patient/1');
    expect(dr.author?.[0]?.reference).toBe('Practitioner/2');
  });

  it('type = prescription-transport', () => {
    const dr = createPrescriptionDocumentReference(params);
    expect(dr.type?.coding?.[0]?.code).toBe(DocumentType.PRESCRIPTION_TRANSPORT);
    expect(dr.type?.coding?.[0]?.system).toBe(DOCUMENT_TYPE_SYSTEM);
  });

  it('inclut le PDF comme attachment application/pdf', () => {
    const dr = createPrescriptionDocumentReference(params);
    const attachment = dr.content[0]?.attachment;
    expect(attachment?.contentType).toBe('application/pdf');
    expect(attachment?.url).toBe(params.pdfUrl);
  });

  it('lie le contexte au ServiceRequest', () => {
    const dr = createPrescriptionDocumentReference(params);
    expect(dr.context?.related?.[0]?.reference).toBe('ServiceRequest/3');
  });
});
