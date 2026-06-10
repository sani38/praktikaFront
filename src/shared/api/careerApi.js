import { httpGet } from "./httpClient";

export function getStudentsForCareer() {
    return httpGet("/api/Career/students-for-career");
}
export function getCompaniesForCareer() {
    return httpGet("/api/Career/companies-for-career");
}

export function getDiaryForCareer() {
    return httpGet("/api/Career/diary-for-career");
}

export function getDiaryDetails(studentId) {
    return httpGet(`/api/Career/diery-details?studentId=${studentId}`);
}