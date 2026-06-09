import { httpGet, httpPost } from "./httpClient";

export function getDiaryEntries() {
    return httpGet("/api/DiaryEntry/current");
}

export function createOrUpdateDiaryEntry(request) {
    return httpPost("/api/DiaryEntry/create", request);
}