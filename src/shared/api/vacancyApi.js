import { httpGet, httpPost } from "./httpClient";

export function getVacancyCount() {
    return httpGet("/api/Vacancy/count");
}

export function getNewVacancyCount() {
    return httpGet("/api/Vacancy/count-new");
}

export function getFilteredVacancies(request) {
    return httpPost("/api/Vacancy/filtered", request);
}

export function getVacancyDetails(id) {
    return httpGet(`/api/Vacancy/details?id=${encodeURIComponent(id)}`);
}

export function getCurrentVacancy() {
    return httpGet("/api/Vacancy/current");
}