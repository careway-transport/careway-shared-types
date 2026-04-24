## Ticket de référence
Closes #<!-- numéro issue -->

## Type de changement
- [ ] `feat` — nouvelle fonctionnalité
- [ ] `fix` — correction de bug
- [ ] `refactor` — refactoring sans changement fonctionnel
- [ ] `chore` — maintenance, dépendances
- [ ] `test` — ajout/correction de tests uniquement
- [ ] `docs` — documentation uniquement
- [ ] `perf` — amélioration performance
- [ ] `ci` — pipeline CI/CD

## Niveau de risque
- [ ] `risk:low` — merge automatique après CI verte
- [ ] `risk:medium` — relecture avant merge
- [ ] `risk:high` — **attendre OK explicite de Romane dans un commentaire**

## Résumé des changements
-
-

## Preuves automatiques
- CI : <!-- lien run GitHub Actions -->
- Coverage : <!-- % atteint -->
- Playwright traces : <!-- lien artefact ou N/A -->
- Preview deploy : <!-- URL ou N/A -->
- Smoke tests : <!-- ✅ ❌ N/A -->

## Impact sur la prod
<!-- Aucun / ou description -->

## Migration BDD
- [ ] Aucune migration
- [ ] Migration additive (backward-compatible ✅)
- [ ] Migration destructive (**risk:high obligatoire**)

## Dette technique créée
<!-- Aucune / ou issues ouvertes -->

## Checklist Claude (auto-vérifiée avant ouverture PR)
- [ ] lint → 0 warning
- [ ] typecheck → 0 erreur
- [ ] tests → verts, coverage ≥ seuil
- [ ] build → succès
- [ ] audit sécurité → 0 critique
- [ ] gitleaks → 0 secret
- [ ] .env.example à jour
- [ ] CHANGELOG.md mis à jour
