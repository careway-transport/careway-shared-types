import { describe, it, expect } from 'vitest';
import {
  getPatientNss,
  getPatientDisplayName,
  PATIENT_NSS_SYSTEM,
} from './Patient.js';
import type { Patient } from './Patient.js';

describe('Patient helpers', () => {
  const patient: Patient = {
    resourceType: 'Patient',
    id: '1',
    identifier: [
      { system: PATIENT_NSS_SYSTEM, value: '1234567890123' },
      { system: 'https://carewaytransport.fr/fhir/patient-id', value: '42' },
    ],
    name: [
      { use: 'official', family: 'Dupont', given: ['Marie', 'Claire'] },
    ],
  };

  describe('getPatientNss', () => {
    it('retourne le NSS depuis les identifiers', () => {
      expect(getPatientNss(patient)).toBe('1234567890123');
    });

    it('retourne undefined si pas de NSS', () => {
      const p: Patient = { resourceType: 'Patient', identifier: [] };
      expect(getPatientNss(p)).toBeUndefined();
    });

    it('retourne undefined si pas d identifiers', () => {
      const p: Patient = { resourceType: 'Patient' };
      expect(getPatientNss(p)).toBeUndefined();
    });
  });

  describe('getPatientDisplayName', () => {
    it('retourne prénom + nom du nom officiel', () => {
      expect(getPatientDisplayName(patient)).toBe('Marie Claire Dupont');
    });

    it('utilise le premier nom si pas de nom officiel', () => {
      const p: Patient = {
        resourceType: 'Patient',
        name: [{ family: 'Martin', given: ['Jean'] }],
      };
      expect(getPatientDisplayName(p)).toBe('Jean Martin');
    });

    it('retourne Patient inconnu si pas de nom', () => {
      const p: Patient = { resourceType: 'Patient' };
      expect(getPatientDisplayName(p)).toBe('Patient inconnu');
    });
  });
});
