---
name: 🚨 Security Alert (auto)
about: Alerte automatique générée par l'audit de sécurité quotidien
title: "[SECURITY] Vulnérabilité détectée — {{ date | date('YYYY-MM-DD') }}"
labels: ['priority:critical', 'type:security', 'auto-generated']
assignees: []
---

## ⚠️ Alerte de sécurité — Audit quotidien

Cet audit est exécuté automatiquement chaque jour à **06:00 UTC** par le workflow
`.github/workflows/daily-security-audit.yml`.

### Contexte

- **Date** : {{ date | date('YYYY-MM-DD') }}
- **Repo** : `{{ env.GITHUB_REPOSITORY }}`
- **Branche** : `{{ env.GITHUB_REF_NAME }}`
- **Commit SHA** : `{{ env.GITHUB_SHA }}`
- **Workflow run** : [voir le job]({{ env.WORKFLOW_RUN_URL }})

### Détail des vulnérabilités détectées

<!-- Claude analyse les artefacts du workflow et remplit ici. -->

#### 📦 Dépendances (pnpm audit)

<!-- Coller la sortie pertinente ou un résumé. -->

#### 🔍 Secrets (gitleaks)

<!-- Si détection, lister sans reproduire le secret. Toujours masquer. -->

#### 🛡️ SAST (Semgrep)

<!-- Règles OWASP Top Ten, Node.js, TypeScript. -->

#### 🌐 Supply chain (Snyk)

<!-- Si configuré. Sinon "N/A". -->

#### ⚖️ Licences

<!-- Licences non-autorisées détectées : GPL, AGPL, commerciales restrictives. -->

### 🎯 Action recommandée

<!-- Claude propose un plan de remédiation. -->

1.
2.
3.

### 🚦 Priorité

- [ ] `severity:critical` — exploit connu, correction dans les 24 h
- [ ] `severity:high` — correction dans la semaine
- [ ] `severity:medium` — correction dans le sprint en cours
- [ ] `severity:low` — correction opportuniste

### 🤖 Traitement par Claude

À la prochaine session, Claude doit :

1. Lire cette issue.
2. Créer une branche `fix/security-<short-sha>`.
3. Appliquer les mises à jour / patchs.
4. Lancer les tests complets.
5. Ouvrir une PR labelée `priority:critical`.
6. Référencer cette issue dans la PR (`Closes #<issue>`).
7. **Ne PAS fermer cette issue avant merge de la PR**.

### ⛔ Si Claude ne peut pas corriger

Tagger **@romanecano** avec :

- Diagnostic technique complet
- Risque pour la prod
- Options de mitigation court terme
- Estimation effort de résolution définitive
