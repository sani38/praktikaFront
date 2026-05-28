import { httpGet, httpPost } from "./httpClient";

export function getCompanyNames(lang = "ru") {
    return httpGet(`/api/Company/names?lang=${lang}`);
}

export function getCompanyCount() {
    return httpGet("/api/Company/count");
}

export function getFilteredCompanies(request) {
    return httpPost("/api/Company/filtered", request);
}