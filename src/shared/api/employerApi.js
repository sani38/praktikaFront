import { httpGet, httpPost } from "./httpClient";

export function getEmployerCount() {
    return httpGet("/api/Employer/count");
}
export function getDataForCreateVacancy() {
    return httpGet("/api/Employer/data-for-create-vacancy");
}
export function createVacancy(body) {
    return httpPost("/api/Employer/add-vacancy", body);
}
export function getMyVacancies() {
    return httpGet("/api/Employer/my-vacancies");
}
export function deleteVacancy(vacancyId) {
    return httpGet(`/api/Vacancy/delete?vacancyId=${vacancyId}`);
}