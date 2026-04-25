import { describe, it, expect } from 'vitest';
import {
  getPractitionerRpps,
  getPractitionerDisplayName,
  PRACTITIONER_RPPS_SYSTEM,
} from './Practitioner.js';
import type { Practitioner } from './Practitioner.js';

describe('Practitioner helpers', () => {
  const practitioner: Practitioner = {
    resourceType: 'Practitioner',
    id: '456',
    identifier: [
      { system: PRACTITIONER_RPPS_SYSTEM, value: '10007855325' },
    ],
    name: [
      { prefix: ['Dr'], family: 'Martin', given: ['Sophie'] },
    ],
  };

  describe('getPractitionerRpps', () => {
    it('retourne le numéro RPPS', () => {
      expect(getPractitionerRpps(practitioner)).toBe('10007855325');
    });

    it('retourne undefined si pas de RPPS', () => {
      const p: Practitioner = { resourceType: 'Practitioner' };
      expect(getPractitionerRpps(p)).toBeUndefined();
    });
  });

  describe('getPractitionerDisplayName', () => {
    it('retourne Dr prénom nom', () => {
      expect(getPractitionerDisplayName(practitioner)).toBe('Dr Sophie Martin');
    });

    it('retourne Praticien inconnu si pas de nom', () => {
      const p: Practitioner = { resourceType: 'Practitioner' };
      expect(getPractitionerDisplayName(p)).toBe('Praticien inconnu');
    });
  });
});
