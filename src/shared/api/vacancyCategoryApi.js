import { httpGet } from "./httpClient";

export function getVacancyCategoryNameDtos(lang = "ru") {
    return httpGet(`/api/VacancyCategory/name-dtos?lang=${lang}`);
}