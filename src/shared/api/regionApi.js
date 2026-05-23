import { httpGet } from "./httpClient";

export function getRegionCount() {
    return httpGet("/api/Region/count");
}

export function getRegionNameDtos(lang = "ru") {
    return httpGet(`/api/Region/name-dtos?lang=${lang}`);
}