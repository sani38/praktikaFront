import { httpGet, httpGetBlob, httpPost } from "./httpClient";

export function getContractsByUserId(
    lang = "ru",
    page = 1,
    pageSize = 5
) {
    return httpGet(
        `/api/Contract/by-user?lang=${lang}&page=${page}&pageSize=${pageSize}`
    );
}

export function getContractDetails(
    contractId,
    lang = "ru"
) {
    return httpGet(
        `/api/Contract/details?contractId=${contractId}&lang=${lang}`
    );
}

export function getActiveContractCount() {
    return httpGet("/api/Contract/count-active");
}

export function getWaitingSignContractCount() {
    return httpGet("/api/Contract/count-waiting-sign");
}

export function getCompletedContractCount() {
    return httpGet("/api/Contract/count-completed");
}

export function downloadContract(contractId, lang = "ru") {
    return httpGetBlob(
        `/api/Contract/download?contractId=${contractId}&lang=${lang}`
    );
}

export function getContractSignData(
    contractId,
    lang = "ru"
) {
    return httpGet(
        `/api/Contract/sign-data?contractId=${contractId}&lang=${lang}`
    );
}

export function signContract(
    contractId,
    signature,
    lang = "ru"
) {
    return httpPost(
        `/api/Contract/sign`,
        {
            contractId,
            signature,
            lang,
        }
    );
}