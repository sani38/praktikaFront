import { httpGet } from "./httpClient";

export function getVacancyCategoryNames(lang = "ru") {
    return httpGet(`/api/VacancyCategory/names?lang=${lang}`);
}