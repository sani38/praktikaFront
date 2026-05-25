import { httpGet } from "./httpClient";

export function getAllStudents() {
    return httpGet("/api/Student/all");
}