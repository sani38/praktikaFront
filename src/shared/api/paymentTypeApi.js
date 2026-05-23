import { httpGet } from "./httpClient";

export function getPaymentTypeNameDtos(lang = "ru") {
    return httpGet(`/api/PaymentType/name-dtos?lang=${lang}`);
}