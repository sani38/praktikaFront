const SUPPORTED_LANGUAGES = ["ru", "kk", "en"];
const DEFAULT_LANGUAGE = "ru";

export function getCurrentLanguage() {
    const language = localStorage.getItem("language");

    return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

export function withCurrentLanguage(searchParams) {
    const params = searchParams instanceof URLSearchParams
        ? searchParams
        : new URLSearchParams(searchParams);

    params.set("lang", getCurrentLanguage());

    return params;
}

export function addLanguageToBody(body) {
    return {
        ...(body || {}),
        lang: getCurrentLanguage(),
    };
}