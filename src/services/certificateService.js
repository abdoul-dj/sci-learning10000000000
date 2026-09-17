import { apiRequest } from "./api.js";

export const createRequest = (data) =>
  apiRequest("/certificates/request", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getMyRequests = () => apiRequest("/certificates/my-requests");

export const getMyCertificates = () =>
  apiRequest("/certificates/my-certificates");

export const getCertificate = (id) =>
  apiRequest(`/certificates/certificates/${id}`);

export const getAllRequests = () => apiRequest("/certificates/requests");

export const approveRequest = (id, adminNotes) =>
  apiRequest(`/certificates/requests/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({ admin_notes: adminNotes }),
  });

export const rejectRequest = (id, adminNotes) =>
  apiRequest(`/certificates/requests/${id}/reject`, {
    method: "PATCH",
    body: JSON.stringify({ admin_notes: adminNotes }),
  });

export const getAllCertificates = () => apiRequest("/certificates/all");

export const checkEligibility = (id) =>
  apiRequest(`/certificates/requests/${id}/eligibility`);
