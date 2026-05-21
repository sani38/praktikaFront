import { httpGet } from "./httpClient";

export function getVacancyCount() {
    return httpGet("/api/Vacancy/count");
}

export function getNewVacancyCount() {
    return httpGet("/api/Vacancy/count-new");
}