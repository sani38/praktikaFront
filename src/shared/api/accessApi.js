import { httpPost } from "./httpClient";

export function login(email, password) {
    return httpPost("/api/Access/login", {
        email,
        password,
    });
}