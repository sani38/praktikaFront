import { httpGet, httpPost } from "./httpClient";

export function createApplication(vacancyId) {
    return httpPost("/api/Application/create", {
        vacancyId,
    });
}

export function getApplicationsByStatus(statusCode, lang = "ru", page = 1, pageSize = 5) {
    const params = new URLSearchParams();

    if (statusCode) {
        params.append("statusCode", statusCode);
    }

    params.append("lang", lang);
    params.append("page", page);
    params.append("pageSize", pageSize);

    return httpGet(`/api/Application/by-status?${params.toString()}`);
}

export function withdrawApplication(applicationId) {
    return httpPost(`/api/Application/${applicationId}/withdraw`);
}