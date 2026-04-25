/**
 * Types des réponses API Gateway FHIR CareWay.
 * Utilisés par tous les frontends pour typer les appels HTTP.
 */
import type { Patient } from '../fhir/r4/Patient.js';
import type { Practitioner } from '../fhir/r4/Practitioner.js';
import type { ServiceRequest } from '../fhir/r4/ServiceRequest.js';
import type { Task } from '../fhir/r4/Task.js';
import type { DocumentReference } from '../fhir/r4/DocumentReference.js';
/** FHIR Bundle — liste paginée de resources */
export interface Bundle<T> {
    resourceType: 'Bundle';
    type: 'searchset' | 'collection' | 'transaction' | 'transaction-response';
    total?: number;
    entry?: BundleEntry<T>[];
    link?: BundleLink[];
}
export interface BundleEntry<T> {
    fullUrl?: string;
    resource?: T;
}
export interface BundleLink {
    relation: 'self' | 'next' | 'previous' | 'first' | 'last';
    url: string;
}
/** Réponse d'erreur FHIR standard */
export interface OperationOutcome {
    resourceType: 'OperationOutcome';
    issue: OperationOutcomeIssue[];
}
export interface OperationOutcomeIssue {
    severity: 'fatal' | 'error' | 'warning' | 'information';
    code: string;
    diagnostics?: string;
    expression?: string[];
}
export type PatientBundle = Bundle<Patient>;
export type PractitionerBundle = Bundle<Practitioner>;
export type ServiceRequestBundle = Bundle<ServiceRequest>;
export type TaskBundle = Bundle<Task>;
export type DocumentReferenceBundle = Bundle<DocumentReference>;
/** Réponse d'authentification (login) */
export interface AuthLoginResponse {
    success: boolean;
    userId?: number;
    userType?: 'medecin' | 'patient' | 'transporteur';
    userName?: string;
    specialite?: string;
    mail?: string;
    message?: string;
}
/** Réponse de reset password */
export interface AuthResetPasswordResponse {
    success: boolean;
    resetToken?: string;
    message?: string;
}
/** Réponse de création prescription avec PDF */
export interface CreatePrescriptionResponse {
    idprescription: number;
    pdfUrl?: string;
}
//# sourceMappingURL=api.d.ts.map