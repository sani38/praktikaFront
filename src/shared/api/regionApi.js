import { httpGet } from "./httpClient";

export function getRegionCount() {
    return httpGet("/api/Region/count");
}