import { describe, it, expect } from 'vitest';
import {
  createTransportServiceRequest,
  EXTENSION_LIEU_DEPART,
  EXTENSION_LIEU_ARRIVEE,
} from './ServiceRequest.js';

describe('createTransportServiceRequest', () => {
  const base = {
    patientRef: 'Patient/123',
    practitionerRef: 'Practitioner/456',
    transportType: 'ambulance' as const,
    motifMedical: 'ALD exonérante',
    lieuDepart: 'Domicile patient',
    lieuArrivee: 'CHU Montpellier',
  };

  it('crée un ServiceRequest avec les champs obligatoires', () => {
    const sr = createTransportServiceRequest(base);
    expect(sr.resourceType).toBe('ServiceRequest');
    expect(sr.status).toBe('active');
    expect(sr.intent).toBe('order');
  });

  it('référence le patient et le praticien', () => {
    const sr = createTransportServiceRequest(base);
    expect(sr.subject.reference).toBe('Patient/123');
    expect(sr.requester?.reference).toBe('Practitioner/456');
  });

  it('encode le type de transport dans code.coding', () => {
    const sr = createTransportServiceRequest(base);
    expect(sr.code?.coding?.[0]?.code).toBe('ambulance');
  });

  it('encode le motif médical dans reasonCode', () => {
    const sr = createTransportServiceRequest(base);
    expect(sr.reasonCode?.[0]?.text).toBe('ALD exonérante');
  });

  it('encode les lieux dans les extensions', () => {
    const sr = createTransportServiceRequest(base);
    const depart = sr.extension?.find((e) => e.url === EXTENSION_LIEU_DEPART);
    const arrivee = sr.extension?.find((e) => e.url === EXTENSION_LIEU_ARRIVEE);
    expect(depart?.valueString).toBe('Domicile patient');
    expect(arrivee?.valueString).toBe('CHU Montpellier');
  });

  it('inclut la date de transport si fournie', () => {
    const sr = createTransportServiceRequest({ ...base, dateTransport: '2026-05-01T10:00:00Z' });
    expect(sr.occurrenceDateTime).toBe('2026-05-01T10:00:00Z');
  });
});
