import { httpGet } from "./httpClient";

export function getCompanyCategoryNameDtos(lang = "ru") {
    return httpGet(`/api/CompanyCategory/name-dtos?lang=${lang}`);
}