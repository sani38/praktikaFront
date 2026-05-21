import { httpGet } from "./httpClient";

export function getEmployerCount() {
    return httpGet("/api/Employer/count");
}