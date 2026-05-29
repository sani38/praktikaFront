import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { DEFAULT_LANGUAGE, LANGUAGES, TRANSLATIONS } from "./translations.js";

const STORAGE_KEY = "appLanguage";

const SKIP_TRANSLATE_TAGS = new Set([
    "SCRIPT",
    "STYLE",
    "CODE",
    "PRE",
    "TEXTAREA",
]);

const TRANSLATABLE_ATTRIBUTES = ["placeholder", "title", "aria-label", "alt"];

const ORIGINAL_TEXT = new WeakMap();
const ORIGINAL_ATTRIBUTES = new WeakMap();

const I18nContext = createContext(null);

function normalizeText(value) {
    return String(value ?? "")
        .replace(/\u00A0/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function preserveOuterSpaces(source, translated) {
    const start = String(source ?? "").match(/^\s*/)?.[0] ?? "";
    const end = String(source ?? "").match(/\s*$/)?.[0] ?? "";
    return `${start}${translated}${end}`;
}

function buildPhraseIndex() {
    const index = new Map();

    Object.values(TRANSLATIONS).forEach((item) => {
        Object.values(item).forEach((value) => {
            const normalized = normalizeText(value);

            if (normalized) {
                index.set(normalized, item);
            }
        });
    });

    return index;
}

const PHRASE_INDEX = buildPhraseIndex();

const PHRASE_ENTRIES = Array.from(PHRASE_INDEX.entries()).sort(
    (a, b) => b[0].length - a[0].length
);

function translatePlainText(value, language) {
    const originalValue = String(value ?? "");
    const normalized = normalizeText(originalValue);

    if (!normalized) {
        return originalValue;
    }

    const direct = PHRASE_INDEX.get(normalized);

    if (direct?.[language]) {
        return preserveOuterSpaces(originalValue, direct[language]);
    }

    let translated = normalized;
    let changed = false;

    PHRASE_ENTRIES.forEach(([phrase, item]) => {
        const target = item?.[language];

        if (!target || phrase === target || phrase.length < 2) {
            return;
        }

        if (translated.includes(phrase)) {
            translated = translated.split(phrase).join(target);
            changed = true;
        }
    });

    return changed ? preserveOuterSpaces(originalValue, translated) : originalValue;
}

function elementHasNoTranslate(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        return false;
    }

    if (element.hasAttribute("data-no-translate")) {
        return true;
    }

    if (element.getAttribute("translate") === "no") {
        return true;
    }

    if (element.classList?.contains("notranslate")) {
        return true;
    }

    return false;
}

function shouldSkipNode(node) {
    if (!node || typeof Node === "undefined") {
        return true;
    }

    let current =
        node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

    while (current) {
        if (SKIP_TRANSLATE_TAGS.has(current.tagName)) {
            return true;
        }

        if (elementHasNoTranslate(current)) {
            return true;
        }

        current = current.parentElement;
    }

    return false;
}

function translateTextNode(node, language) {
    if (shouldSkipNode(node)) {
        return;
    }

    if (!ORIGINAL_TEXT.has(node)) {
        ORIGINAL_TEXT.set(node, node.nodeValue);
    }

    const original = ORIGINAL_TEXT.get(node);
    const nextValue = translatePlainText(original, language);

    if (node.nodeValue !== nextValue) {
        node.nodeValue = nextValue;
    }
}

function getOriginalAttribute(element, attributeName, value) {
    let attributes = ORIGINAL_ATTRIBUTES.get(element);

    if (!attributes) {
        attributes = new Map();
        ORIGINAL_ATTRIBUTES.set(element, attributes);
    }

    if (!attributes.has(attributeName)) {
        attributes.set(attributeName, value);
    }

    return attributes.get(attributeName);
}

function translateElementAttributes(element, language) {
    if (shouldSkipNode(element)) {
        return;
    }

    TRANSLATABLE_ATTRIBUTES.forEach((attributeName) => {
        const value = element.getAttribute(attributeName);

        if (!value) {
            return;
        }

        const original = getOriginalAttribute(element, attributeName, value);
        const translated = translatePlainText(original, language);

        if (translated !== value) {
            element.setAttribute(attributeName, translated);
        }
    });
}

function translateDomTree(root, language) {
    if (!root || !language || typeof Node === "undefined") {
        return;
    }

    if (shouldSkipNode(root)) {
        return;
    }

    if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root, language);
        return;
    }

    if (
        root.nodeType !== Node.ELEMENT_NODE &&
        root.nodeType !== Node.DOCUMENT_NODE
    ) {
        return;
    }

    const element = root.nodeType === Node.ELEMENT_NODE ? root : null;

    if (element) {
        translateElementAttributes(element, language);
    }

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {
                if (shouldSkipNode(node)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            },
        }
    );

    const nodes = [];
    let currentNode = walker.nextNode();

    while (currentNode) {
        nodes.push(currentNode);
        currentNode = walker.nextNode();
    }

    nodes.forEach((node) => {
        if (shouldSkipNode(node)) {
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            translateTextNode(node, language);
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            translateElementAttributes(node, language);
        }
    });
}

function getInitialLanguage() {
    if (typeof window === "undefined") {
        return DEFAULT_LANGUAGE;
    }

    const savedLanguage = localStorage.getItem(STORAGE_KEY);

    if (savedLanguage && LANGUAGES[savedLanguage]) {
        return savedLanguage;
    }

    return DEFAULT_LANGUAGE;
}

export function I18nProvider({ children }) {
    const [language, setLanguageState] = useState(getInitialLanguage);

    const setLanguage = useCallback((nextLanguage) => {
        if (!LANGUAGES[nextLanguage]) {
            return;
        }

        localStorage.setItem(STORAGE_KEY, nextLanguage);
        setLanguageState(nextLanguage);
    }, []);

    const t = useCallback(
        (text) => {
            return translatePlainText(text, language);
        },
        [language]
    );

    useEffect(() => {
        const languageInfo = LANGUAGES[language] ?? LANGUAGES[DEFAULT_LANGUAGE];

        document.documentElement.lang = languageInfo.htmlLang;
        document.documentElement.setAttribute("data-language", language);

        const translatePage = () => {
            translateDomTree(document.body, language);
        };

        translatePage();

        const observer = new MutationObserver((mutations) => {
            window.requestAnimationFrame(() => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "characterData") {
                        if (!shouldSkipNode(mutation.target)) {
                            translateDomTree(mutation.target, language);
                        }
                    }

                    if (mutation.type === "attributes") {
                        if (!shouldSkipNode(mutation.target)) {
                            translateDomTree(mutation.target, language);
                        }
                    }

                    mutation.addedNodes.forEach((node) => {
                        if (!shouldSkipNode(node)) {
                            translateDomTree(node, language);
                        }
                    });
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
            attributeFilter: TRANSLATABLE_ATTRIBUTES,
        });

        return () => observer.disconnect();
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            languages: LANGUAGES,
            setLanguage,
            t,
        }),
        [language, setLanguage, t]
    );

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error("useI18n must be used inside I18nProvider");
    }

    return context;
}

export function translateText(text, language = getInitialLanguage()) {
    return translatePlainText(text, language);
}