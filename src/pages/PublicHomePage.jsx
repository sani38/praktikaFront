import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVacancyCategoryNameDtos } from "../shared/api/vacancyCategoryApi";
import {
    getVacancyCount,
    getNewVacancyCount,
} from "../shared/api/vacancyApi";
import { getEmployerCount } from "../shared/api/employerApi";
import { getRegionCount } from "../shared/api/regionApi";
import {
    getCompanyNames,
    getCompanyCount,
} from "../shared/api/companyApi";
import LanguageSwitcher from "../shared/i18n/LanguageSwitcher.jsx";
import { useI18n } from "../shared/i18n/I18nProvider.jsx";

const HOME_TEXT = {
    ru: {
        login: "Вход",
        heroTitle: ["Найди свою базу", "практики по", "всему Казахстану"],
        heroDescription: "Удобный и быстрый способ найти место для прохождения практики в компаниях, государственных учреждениях и научных организациях.",
        searchPlaceholder: "Какую практику вы ищете?",
        searchButton: "Поиск",
        categoriesLoading: "Загрузка категорий...",
        categoriesError: "Не удалось загрузить категории",
        findBase: "Найти базу практик",
        aboutTitle: "О портале",
        aboutText: "Портал баз практики — это современная платформа, созданная для студентов и работодателей по всему Казахстану. Здесь студенты легко находят актуальные предложения для прохождения производственной, преддипломной и других видов практик, а организации — потенциальных стажёров, мотивированных развиваться в своей сфере.",
        features: [
            "Поиск базы практики по городу, специальности и типу организации",
            "Онлайн-подача заявки на практику",
            "Информация о компаниях, отзывах и требованиях",
            "Прямое взаимодействие с работодателем",
        ],
        statsVacancies: "Вакансий",
        statsNewVacancies: "Новых вакансий",
        statsEmployers: "Работодателей",
        howTitle: "Как это работает?",
        howSubtitle: "Всё просто — 3 шага до успешной практики",
        steps: [
            { n: "1", title: "Зарегистрируйся", text: "Создай личный кабинет студента или организации." },
            { n: "2", title: "Найди подходящую базу", text: "Отфильтруй по городу, профилю, должности и типу практики." },
            { n: "3", title: "Оформи заявку", text: "Откликнись на предложения напрямую через портал." },
        ],
        notice: "Платформа уведомит тебя о статусе заявки и поможет связаться с представителем организации.",
        studentAdvantagesTitle: "Преимущества для студентов",
        studentAdvantages: [
            "Единая база проверенных организаций по всему Казахстану",
            "Прозрачные условия, требования и сроки",
            "Прямой контакт с работодателями",
            "Удобный личный кабинет и история заявок",
            "Возможность выбрать практику по профилю обучения",
        ],
        goStudent: "Перейти на страницу практиканта",
        orgAdvantagesTitle: "Преимущества для организаций",
        orgAdvantages: [
            "Бесплатное размещение базы практики",
            "Доступ к широкому пулу студентов ведущих вузов",
            "Автоматизированная система обработки заявок",
            "Повышение узнаваемости компании среди молодёжи",
            "Возможность отбора лучших кандидатов для дальнейшего трудоустройства",
        ],
        goOrg: "Перейти на страницу организации",
        reviewsTitle: "Отзывы",
        reviewsSubtitle: "Возможность отбора лучших кандидатов для дальнейшего трудоустройства",
        reviews: [
            {
                name: "Амина",
                role: "Студентка 3 курса",
                text: "Благодаря порталу я прошла практику в ведущей IT-компании Алматы. Удобный поиск и оперативный отклик работодателя — это то, чего не хватало раньше!",
            },
            {
                name: "HR-менеджер",
                role: "ТОО «TechLine»",
                text: "Мы нашли сразу троих практикантов через портал — удобно, быстро и без лишней бюрократии.",
            },
        ],
        partnersTitle: "Работодатели партнёры",
        numbersTitle: "ПрактикаKZ в цифрах",
        numbersSubtitle: "Единый портал для студентов и работодателей",
        numberCards: {
            vacancies: "Доступных практик\nпо всему Казахстану",
            companies: "Компаний\nпредлагают стажировки",
            regions: "Регионов\nпо всей стране",
            support: "Поддержка\nдля студентов и компаний",
        },
        companyQuestion: "Вы представитель компании?",
        companyText: "Разместите информацию о практике или стажировке и найдите талантливых молодых специалистов для своей компании. Получите доступ к базе резюме студентов и выпускников ведущих вузов Казахстана.",
        publishPractice: "Разместить практику +",
        learnMore: "Узнать больше",
        footerBrand: "Практика",
        footerDescription: "Единый портал практики и стажировки для студентов и выпускников Казахстана.",
        footerPracticeLinks: ["Найти практику", "Советы по составлению резюме", "Подготовка к собеседованию", "Истории успеха", "Блог"],
        footerCompanyTitle: "Для компаний",
        footerCompanyLinks: ["Разместить вакансию", "Поиск кандидатов", "Брендинг работодателя", "Партнёрская программа", "Тарифы"],
        footerContactsTitle: "Контакты",
        city: "г. Алматы",
        contactUs: "Свяжитесь с нами",
        faq: "Вопросы и ответы",
        copyright: "© 2025 Практика. Все права защищены.",
        legalLinks: ["Условия использования", "Политика конфиденциальности", "Карта сайта"],
        prev: "Назад",
        next: "Вперёд",
        defaultCategories: ["IT и Разработка", "Маркетинг", "Қаржы", "Инженерное дело", "Нефть и Газ"],
    },
    kk: {
        login: "Кіру",
        heroTitle: ["Қазақстан бойынша", "практика базаңды", "жылдам тап"],
        heroDescription: "Компанияларда, мемлекеттік мекемелерде және ғылыми ұйымдарда практикадан өту орнын табудың ыңғайлы әрі жылдам жолы.",
        searchPlaceholder: "Қандай практика іздеп жүрсіз?",
        searchButton: "Іздеу",
        categoriesLoading: "Санаттар жүктелуде...",
        categoriesError: "Санаттарды жүктеу мүмкін болмады",
        findBase: "Практика базасын табу",
        aboutTitle: "Портал туралы",
        aboutText: "Практика базалары порталы — бүкіл Қазақстан бойынша студенттер мен жұмыс берушілерге арналған заманауи платформа. Мұнда студенттер өндірістік, диплом алдындағы және басқа да практика түрлеріне арналған өзекті ұсыныстарды оңай табады, ал ұйымдар өз саласында дамуға ынталы болашақ тағылымгерлерді таба алады.",
        features: [
            "Қала, мамандық және ұйым түрі бойынша практика базасын іздеу",
            "Практикаға онлайн өтінім беру",
            "Компаниялар, пікірлер және талаптар туралы ақпарат",
            "Жұмыс берушімен тікелей байланыс",
        ],
        statsVacancies: "Вакансиялар",
        statsNewVacancies: "Жаңа вакансиялар",
        statsEmployers: "Жұмыс берушілер",
        howTitle: "Бұл қалай жұмыс істейді?",
        howSubtitle: "Барлығы оңай — сәтті практикаға дейін 3 қадам",
        steps: [
            { n: "1", title: "Тіркеліңіз", text: "Студенттің немесе ұйымның жеке кабинетін жасаңыз." },
            { n: "2", title: "Қолайлы базаны табыңыз", text: "Қала, бағыт, лауазым және практика түрі бойынша сүзгіден өткізіңіз." },
            { n: "3", title: "Өтінім рәсімдеңіз", text: "Ұсыныстарға портал арқылы тікелей жауап беріңіз." },
        ],
        notice: "Платформа өтінім мәртебесі туралы хабарлайды және ұйым өкілімен байланысуға көмектеседі.",
        studentAdvantagesTitle: "Студенттерге арналған артықшылықтар",
        studentAdvantages: [
            "Қазақстан бойынша тексерілген ұйымдардың бірыңғай базасы",
            "Ашық шарттар, талаптар және мерзімдер",
            "Жұмыс берушілермен тікелей байланыс",
            "Ыңғайлы жеке кабинет және өтінімдер тарихы",
            "Оқу бағытына сай практиканы таңдау мүмкіндігі",
        ],
        goStudent: "Практикант бетіне өту",
        orgAdvantagesTitle: "Ұйымдарға арналған артықшылықтар",
        orgAdvantages: [
            "Практика базасын тегін орналастыру",
            "Жетекші ЖОО студенттерінің кең базасына қол жеткізу",
            "Өтінімдерді өңдеудің автоматтандырылған жүйесі",
            "Компанияның жастар арасындағы танымалдығын арттыру",
            "Болашақ жұмысқа үздік кандидаттарды таңдау мүмкіндігі",
        ],
        goOrg: "Ұйым бетіне өту",
        reviewsTitle: "Пікірлер",
        reviewsSubtitle: "Болашақ жұмысқа үздік кандидаттарды таңдау мүмкіндігі",
        reviews: [
            {
                name: "Амина",
                role: "3-курс студенті",
                text: "Порталдың арқасында мен Алматыдағы жетекші IT-компанияда практикадан өттім. Ыңғайлы іздеу және жұмыс берушінің жылдам жауабы — бұрын дәл осы жетіспейтін!",
            },
            {
                name: "HR-менеджер",
                role: "«TechLine» ЖШС",
                text: "Біз портал арқылы бірден үш практикант таптық — ыңғайлы, жылдам және артық құжатбастылықсыз.",
            },
        ],
        partnersTitle: "Серіктес жұмыс берушілер",
        numbersTitle: "ПрактикаKZ сандармен",
        numbersSubtitle: "Студенттер мен жұмыс берушілерге арналған бірыңғай портал",
        numberCards: {
            vacancies: "Қазақстан бойынша\nқолжетімді практика",
            companies: "Компания\nтағылымдамалар ұсынады",
            regions: "Ел бойынша\nөңірлер",
            support: "Студенттер мен компанияларға\nқолдау",
        },
        companyQuestion: "Сіз компания өкілісіз бе?",
        companyText: "Практика немесе тағылымдама туралы ақпаратты орналастырып, компанияңызға талантты жас мамандарды табыңыз. Қазақстанның жетекші жоғары оқу орындарының студенттері мен түлектерінің түйіндеме базасына қол жеткізіңіз.",
        publishPractice: "Практиканы орналастыру +",
        learnMore: "Толығырақ білу",
        footerBrand: "Практика",
        footerDescription: "Қазақстан студенттері мен түлектеріне арналған практика және тағылымдама бірыңғай порталы.",
        footerPracticeLinks: ["Практика табу", "Түйіндеме құру бойынша кеңестер", "Сұхбатқа дайындық", "Сәттілік оқиғалары", "Блог"],
        footerCompanyTitle: "Компаниялар үшін",
        footerCompanyLinks: ["Вакансия орналастыру", "Кандидаттарды іздеу", "Жұмыс беруші брендингі", "Серіктестік бағдарлама", "Тарифтер"],
        footerContactsTitle: "Байланыстар",
        city: "Алматы қ.",
        contactUs: "Бізбен байланысу",
        faq: "Сұрақтар мен жауаптар",
        copyright: "© 2025 Практика. Барлық құқықтар қорғалған.",
        legalLinks: ["Пайдалану шарттары", "Құпиялылық саясаты", "Сайт картасы"],
        prev: "Артқа",
        next: "Алға",
        defaultCategories: ["IT және әзірлеу", "Маркетинг", "Қаржы", "Инженерлік іс", "Мұнай және газ"],
    },
    en: {
        login: "Sign in",
        heroTitle: ["Find your", "internship placement", "across Kazakhstan"],
        heroDescription: "A convenient and fast way to find an internship placement in companies, government institutions and research organizations.",
        searchPlaceholder: "What internship are you looking for?",
        searchButton: "Search",
        categoriesLoading: "Loading categories...",
        categoriesError: "Could not load categories",
        findBase: "Find internship placements",
        aboutTitle: "About the portal",
        aboutText: "The internship placement portal is a modern platform created for students and employers across Kazakhstan. Here, students can easily find current offers for industrial, pre-graduation and other types of internships, while organizations can find motivated potential interns ready to grow in their field.",
        features: [
            "Search internship placements by city, specialty and organization type",
            "Online internship application submission",
            "Information about companies, reviews and requirements",
            "Direct interaction with employers",
        ],
        statsVacancies: "Vacancies",
        statsNewVacancies: "New vacancies",
        statsEmployers: "Employers",
        howTitle: "How does it work?",
        howSubtitle: "It is simple — 3 steps to a successful internship",
        steps: [
            { n: "1", title: "Register", text: "Create a student or organization account." },
            { n: "2", title: "Find a suitable placement", text: "Filter by city, profile, position and internship type." },
            { n: "3", title: "Submit an application", text: "Apply to offers directly through the portal." },
        ],
        notice: "The platform will notify you about the application status and help you contact the organization representative.",
        studentAdvantagesTitle: "Benefits for students",
        studentAdvantages: [
            "A single database of verified organizations across Kazakhstan",
            "Transparent conditions, requirements and deadlines",
            "Direct contact with employers",
            "Convenient personal account and application history",
            "Ability to choose an internship matching your study profile",
        ],
        goStudent: "Go to intern page",
        orgAdvantagesTitle: "Benefits for organizations",
        orgAdvantages: [
            "Free internship placement posting",
            "Access to a wide pool of students from leading universities",
            "Automated application processing system",
            "Increased company awareness among young people",
            "Ability to select the best candidates for future employment",
        ],
        goOrg: "Go to organization page",
        reviewsTitle: "Reviews",
        reviewsSubtitle: "Ability to select the best candidates for future employment",
        reviews: [
            {
                name: "Amina",
                role: "3rd-year student",
                text: "Thanks to the portal, I completed an internship at a leading IT company in Almaty. Convenient search and quick employer response were exactly what was missing before!",
            },
            {
                name: "HR manager",
                role: "TechLine LLP",
                text: "We found three interns through the portal at once — convenient, fast and without unnecessary bureaucracy.",
            },
        ],
        partnersTitle: "Partner employers",
        numbersTitle: "PraktikaKZ in numbers",
        numbersSubtitle: "A unified portal for students and employers",
        numberCards: {
            vacancies: "Available internships\nacross Kazakhstan",
            companies: "Companies\noffer internships",
            regions: "Regions\nacross the country",
            support: "Support\nfor students and companies",
        },
        companyQuestion: "Are you a company representative?",
        companyText: "Post information about an internship or traineeship and find talented young specialists for your company. Get access to a resume database of students and graduates from leading universities in Kazakhstan.",
        publishPractice: "Post an internship +",
        learnMore: "Learn more",
        footerBrand: "Practice",
        footerDescription: "A unified internship and traineeship portal for students and graduates in Kazakhstan.",
        footerPracticeLinks: ["Find an internship", "Resume writing tips", "Interview preparation", "Success stories", "Blog"],
        footerCompanyTitle: "For companies",
        footerCompanyLinks: ["Post a vacancy", "Search candidates", "Employer branding", "Partnership program", "Pricing"],
        footerContactsTitle: "Contacts",
        city: "Almaty",
        contactUs: "Contact us",
        faq: "Questions and answers",
        copyright: "© 2025 Practice. All rights reserved.",
        legalLinks: ["Terms of use", "Privacy policy", "Sitemap"],
        prev: "Back",
        next: "Forward",
        defaultCategories: ["IT and Development", "Marketing", "Finance", "Engineering", "Oil and Gas"],
    },
};

const CATEGORY_TRANSLATIONS = {
    "IT и Разработка": { ru: "IT и Разработка", kk: "IT және әзірлеу", en: "IT and Development" },
    "IT и разработка": { ru: "IT и Разработка", kk: "IT және әзірлеу", en: "IT and Development" },
    "IT": { ru: "IT", kk: "IT", en: "IT" },
    "Маркетинг": { ru: "Маркетинг", kk: "Маркетинг", en: "Marketing" },
    "Қаржы": { ru: "Финансы", kk: "Қаржы", en: "Finance" },
    "Финансы": { ru: "Финансы", kk: "Қаржы", en: "Finance" },
    "Инженерное дело": { ru: "Инженерное дело", kk: "Инженерлік іс", en: "Engineering" },
    "Нефть и Газ": { ru: "Нефть и Газ", kk: "Мұнай және газ", en: "Oil and Gas" },
    "Нефть и газ": { ru: "Нефть и Газ", kk: "Мұнай және газ", en: "Oil and Gas" },
};

function getLocale(language) {
    if (language === "kk") return "kk-KZ";
    if (language === "en") return "en-US";
    return "ru-RU";
}

function localizeCategoryName(name, language) {
    const normalized = String(name ?? "").trim();
    const found = CATEGORY_TRANSLATIONS[normalized];

    if (found) {
        return found[language] ?? found.ru;
    }

    return normalized;
}

const IconUser = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
            fill="currentColor"
            d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        />
    </svg>
);

const IconSearch = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path
            fill="currentColor"
            d="M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
        />
    </svg>
);

const ArrowRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <path fill="currentColor" d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5z" />
    </svg>
);

const FeatureIcon = ({ variant = "blue" }) => {
    const isOrange = variant === "orange";
    return (
        <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${isOrange ? "bg-[#ff7a2f]/15 text-[#ff7a2f]" : "bg-[#187dde]/15 text-[#187dde]"
                }`}
            aria-hidden="true"
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0v12h12V6H6Zm2 2h8v2H8V8Zm0 4h8v2H8v-2Z"
                />
            </svg>
        </span>
    );
};

const SmallCardIcon = ({ variant = "blue" }) => {
    const isOrange = variant === "orange";
    return (
        <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${isOrange ? "bg-[#ff7a2f]/15 text-[#ff7a2f]" : "bg-[#187dde]/15 text-[#187dde]"
                }`}
            aria-hidden="true"
        >
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h5v-2h-5V6h-2v7a2 2 0 0 0 2 2Z"
                />
            </svg>
        </span>
    );
};

const PartnerArrow = ({ dir = "left", onClick, label }) => (
    <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-slate-500 transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)]"
        type="button"
        aria-label={label}
        onClick={onClick}
    >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d={
                    dir === "left"
                        ? "M15 6l-6 6 6 6-1.4 1.4L6.2 12l7.4-7.4L15 6z"
                        : "M9 6l1.4-1.4L17.8 12l-7.4 7.4L9 18l6-6-6-6z"
                }
            />
        </svg>
    </button>
);

export default function PublicHomePage() {
    const navigate = useNavigate();
    const { language } = useI18n();
    const text = HOME_TEXT[language] ?? HOME_TEXT.ru;
    const locale = getLocale(language);

    const [categories, setCategories] = useState([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [vacancyCount, setVacancyCount] = useState(null);
    const [newVacancyCount, setNewVacancyCount] = useState(null);
    const [employerCount, setEmployerCount] = useState(null);
    const [regionCount, setRegionCount] = useState(null);
    const [companyNames, setCompanyNames] = useState([]);
    const [firstCompanyIndex, setFirstCompanyIndex] = useState(0);
    const [companyCount, setCompanyCount] = useState(null);

    const visibleCompanyCount = 7;

    const visibleCompanies = useMemo(() => {
        if (companyNames.length === 0) return [];

        return Array.from({ length: Math.min(visibleCompanyCount, companyNames.length) }, (_, index) => {
            const companyIndex = (firstCompanyIndex + index) % companyNames.length;
            return companyNames[companyIndex];
        });
    }, [companyNames, firstCompanyIndex]);

    const categoryButtons = useMemo(() => {
        const source = categories.length > 0
            ? categories.slice(0, 5)
            : text.defaultCategories.map((name, index) => ({ id: `default-${index}`, name }));

        return source.map((category, index) => ({
            id: category.id ?? `category-${index}`,
            name: localizeCategoryName(category.name ?? category, language),
            original: category,
        }));
    }, [categories, language, text.defaultCategories]);

    function formatCount(value) {
        if (value === null || value === undefined) return "...";
        return Number(value).toLocaleString(locale);
    }

    function handlePrevCompanies() {
        if (companyNames.length === 0) return;

        setFirstCompanyIndex((prev) =>
            prev === 0 ? companyNames.length - 1 : prev - 1
        );
    }

    function handleNextCompanies() {
        if (companyNames.length === 0) return;

        setFirstCompanyIndex((prev) =>
            prev === companyNames.length - 1 ? 0 : prev + 1
        );
    }

    function handleSearch() {
        const query = searchQuery.trim();

        if (!query) {
            navigate("/student/internships");
            return;
        }

        navigate(`/student/internships?query=${encodeURIComponent(query)}`);
    }

    function handleCategoryClick(category) {
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set("query", searchQuery.trim());
        }

        if (!String(category.id).startsWith("default-")) {
            params.set("categoryId", category.id);
        }

        navigate(`/student/internships?${params.toString()}`);
    }

    useEffect(() => {
        async function loadCategories() {
            try {
                setIsCategoriesLoading(true);
                setCategoriesError(null);

                const data = await getVacancyCategoryNameDtos(language);

                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Ошибка загрузки категорий:", error);
                setCategoriesError(text.categoriesError);
            } finally {
                setIsCategoriesLoading(false);
            }
        }

        loadCategories();
    }, [language, text.categoriesError]);

    useEffect(() => {
        async function loadVacancyCount() {
            try {
                const count = await getVacancyCount();
                setVacancyCount(count);
            } catch (error) {
                console.error("Ошибка загрузки количества вакансий:", error);
                setVacancyCount(0);
            }
        }

        loadVacancyCount();
    }, []);

    useEffect(() => {
        async function loadNewVacancyCount() {
            try {
                const count = await getNewVacancyCount();
                setNewVacancyCount(count);
            } catch (error) {
                console.error("Ошибка загрузки количества новых вакансий:", error);
                setNewVacancyCount(0);
            }
        }

        loadNewVacancyCount();
    }, []);

    useEffect(() => {
        async function loadEmployerCount() {
            try {
                const count = await getEmployerCount();
                setEmployerCount(count);
            } catch (error) {
                console.error("Ошибка загрузки количества работодателей:", error);
                setEmployerCount(0);
            }
        }

        loadEmployerCount();
    }, []);

    useEffect(() => {
        async function loadRegionCount() {
            try {
                const count = await getRegionCount();
                setRegionCount(count);
            } catch (error) {
                console.error("Ошибка загрузки количества регионов:", error);
                setRegionCount(0);
            }
        }

        loadRegionCount();
    }, []);

    useEffect(() => {
        async function loadCompanyNames() {
            try {
                const companies = await getCompanyNames(language);
                setCompanyNames(Array.isArray(companies) ? companies : []);
                setFirstCompanyIndex(0);
            } catch (error) {
                console.error("Ошибка загрузки компаний:", error);
                setCompanyNames([]);
            }
        }

        loadCompanyNames();
    }, [language]);

    useEffect(() => {
        async function loadCompanyCount() {
            try {
                const count = await getCompanyCount();
                setCompanyCount(count);
            } catch (error) {
                console.error("Ошибка загрузки количества компаний:", error);
                setCompanyCount(0);
            }
        }

        loadCompanyCount();
    }, []);

    return (
        <div className="min-h-screen bg-[#f7f8fa] text-[#14181f]">
            <header className="border-b border-[#e8ecf2] bg-white">
                <div className="mx-auto flex w-[min(1180px,calc(100%-48px))] items-center justify-between py-[14px]">
                    <div className="flex items-center">
                        <img src="/logo.png" alt="Satbayev University" className="h-12 w-auto object-contain" />
                    </div>

                    <div className="flex items-center gap-[10px]">
                        <button
                            onClick={() => navigate("/login")}
                            className="inline-flex items-center gap-2 rounded-[10px] border border-[#e8ecf2] bg-white px-3 py-[9px] text-[13px] font-semibold text-[#1f2937] transition hover:shadow-[0_6px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                            type="button"
                        >
                            <IconUser size={16} />
                            <span>{text.login}</span>
                        </button>

                        <LanguageSwitcher />
                    </div>
                </div>
            </header>

            <section className="bg-white">
                <div className="mx-auto grid w-[min(1180px,calc(100%-48px))] grid-cols-1 gap-[26px] py-[26px] pb-[18px] lg:grid-cols-[1.05fr_.95fr]">
                    <div className="py-[32px] pb-[10px] lg:py-[32px]">
                        <h1 className="m-0 text-[44px] font-extrabold leading-[1.06] tracking-[-0.02em]">
                            {text.heroTitle.map((line) => (
                                <React.Fragment key={line}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </h1>

                        <p className="mt-4 max-w-[520px] text-[13px] leading-[1.55] text-[#6b7280]">
                            {text.heroDescription}
                        </p>

                        <div className="mt-[18px] flex max-w-[520px] items-center gap-[10px]">
                            <div className="flex-1 rounded-[12px] border border-[#e8ecf2] bg-white px-[12px] py-[10px] shadow-[0_10px_24px_rgba(16,24,40,.06)]">
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full border-0 bg-transparent text-[13px] text-[#111827] outline-none"
                                    type="text"
                                    placeholder={text.searchPlaceholder}
                                />
                            </div>

                            <button
                                onClick={handleSearch}
                                className="inline-flex h-[44px] items-center gap-2 rounded-[12px] bg-[#187dde] px-[14px] text-[14px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                                type="button"
                            >
                                <span>{text.searchButton}</span>
                                <IconSearch size={18} />
                            </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                            {isCategoriesLoading && (
                                <span className="text-[12px] text-[#6b7280]">
                                    {text.categoriesLoading}
                                </span>
                            )}

                            {categoriesError && (
                                <span className="text-[12px] text-red-500">
                                    {categoriesError}
                                </span>
                            )}

                            {!isCategoriesLoading &&
                                !categoriesError &&
                                categoryButtons.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category)}
                                        className="rounded-full border border-[#e8ecf2] bg-white px-[10px] py-[7px] text-[12px] text-[#3b4453] transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)]"
                                        type="button"
                                    >
                                        {category.name}
                                    </button>
                                ))}
                        </div>

                        <button
                            onClick={() => navigate("/student/internships")}
                            className="mt-[14px] inline-flex items-center gap-2 rounded-[10px] border border-[#187dde]/20 bg-[#e9f2ff] px-[14px] py-[10px] text-[14px] font-semibold text-[#187dde] transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>{text.findBase}</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="relative h-[430px] overflow-visible">
                        <img
                            src="/su-bg.png"
                            alt=""
                            className="absolute left-[70px] top-0 h-[430px] w-[360px] object-cover"
                        />

                        <img
                            src="/students.png"
                            alt="Students"
                            className="absolute bottom-0 left-[10px] z-10 w-[620px] object-contain"
                        />

                        <div className="absolute bottom-0 left-0 z-20 h-[90px] w-[620px] bg-gradient-to-t from-white to-transparent" />
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="px-1 pb-[10px]">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.aboutTitle}</h2>
                            <p className="mt-2 text-[12px] leading-[1.55] text-[#6b7280]">
                                {text.aboutText}
                            </p>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-4">
                            {text.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-start gap-[10px] rounded-[14px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-3 py-3"
                                >
                                    <FeatureIcon />
                                    <div className="mt-[2px] text-[12px] font-semibold leading-[1.35] text-[#374151]">{feature}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-[14px] grid grid-cols-1 gap-3 md:grid-cols-3">
                            {[
                                {
                                    label: text.statsVacancies,
                                    value: formatCount(vacancyCount),
                                },
                                {
                                    label: text.statsNewVacancies,
                                    value: formatCount(newVacancyCount),
                                },
                                {
                                    label: text.statsEmployers,
                                    value: formatCount(employerCount),
                                },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-4 py-[18px]">
                                    <div className="text-[24px] font-black leading-none text-[#187dde]">{stat.value}</div>
                                    <div className="mt-3 text-[12px] font-semibold text-[#6b7280]">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="mb-3 flex flex-col gap-1">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.howTitle}</h2>
                            <div className="text-[12px] text-[#6b7280]">{text.howSubtitle}</div>
                        </div>

                        <div className="grid grid-cols-1 gap-[10px] lg:grid-cols-[1fr_1fr_1fr_1.2fr]">
                            {text.steps.map((step) => (
                                <div
                                    key={step.n}
                                    className="flex gap-3 rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[14px] py-[14px]"
                                >
                                    <div className="w-[34px] text-[34px] font-black leading-none text-[#187dde]">{step.n}</div>
                                    <div>
                                        <div className="mt-[2px] text-[12px] font-extrabold text-[#1f2937]">{step.title}</div>
                                        <div className="mt-[5px] text-[11px] leading-[1.4] text-[#6b7280]">{step.text}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex gap-[10px] rounded-[16px] border border-[#ff7a2f]/35 bg-[#fff7f1] px-[14px] py-[14px]">
                                <div className="mt-1 h-[10px] w-[10px] shrink-0 rounded-full bg-[#ff7a2f]" />
                                <div className="text-[11.5px] font-semibold leading-[1.45] text-[#7a3b18]">
                                    {text.notice}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.studentAdvantagesTitle}</h2>

                        <div className="mt-3 grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-5">
                            {text.studentAdvantages.map((advantage) => (
                                <div
                                    key={advantage}
                                    className="flex min-h-[78px] items-start gap-[10px] rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[12px] py-[14px]"
                                >
                                    <SmallCardIcon />
                                    <div className="mt-[2px] text-[11.8px] font-semibold leading-[1.35] text-[#374151]">{advantage}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-3 inline-flex items-center gap-2 rounded-[12px] bg-[#187dde] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>{text.goStudent}</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.orgAdvantagesTitle}</h2>

                        <div className="mt-3 grid grid-cols-1 gap-[10px] md:grid-cols-2 lg:grid-cols-5">
                            {text.orgAdvantages.map((advantage) => (
                                <div
                                    key={advantage}
                                    className="flex min-h-[78px] items-start gap-[10px] rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[12px] py-[14px]"
                                >
                                    <SmallCardIcon variant="orange" />
                                    <div className="mt-[2px] text-[11.8px] font-semibold leading-[1.35] text-[#374151]">{advantage}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate("/employer")}
                            className="mt-3 inline-flex items-center gap-2 rounded-[12px] bg-[#187dde] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                            type="button"
                        >
                            <span>{text.goOrg}</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="mb-3 flex flex-col gap-1">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.reviewsTitle}</h2>
                            <div className="text-[12px] text-[#6b7280]">{text.reviewsSubtitle}</div>
                        </div>

                        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
                            {text.reviews.map((review) => (
                                <div key={review.name} className="grid grid-cols-[56px_1fr] gap-3">
                                    <div className="h-[56px] w-[56px] rounded-[14px] border border-black/5 bg-[#e5e7eb]" />
                                    <div className="rounded-[16px] border border-[#e8ecf2]/90 bg-[#f6f8fb] px-[14px] py-[14px] text-[12px] font-medium leading-[1.5] text-[#374151]">
                                        {review.text}
                                    </div>
                                    <div className="col-start-2 mt-2">
                                        <div className="text-[12px] font-extrabold text-[#111827]">{review.name}</div>
                                        <div className="mt-[2px] text-[11px] text-[#6b7280]">{review.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.partnersTitle}</h2>

                        <div className="mt-3 grid grid-cols-2 gap-[10px] md:grid-cols-4 lg:grid-cols-7">
                            {visibleCompanies.map((companyName, index) => (
                                <div
                                    key={`${companyName}-${index}`}
                                    className="flex flex-col items-center gap-2 px-2 py-2"
                                >
                                    <div className="h-[44px] w-[44px] rounded-[10px] border border-black/5 bg-[#e5e7eb]" />

                                    <div className="text-[11px] font-semibold text-[#6b7280]">
                                        {companyName}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {companyNames.length > 0 && (
                            <div className="mt-2 flex items-center justify-center gap-3">
                                <PartnerArrow dir="left" onClick={handlePrevCompanies} label={text.prev} />
                                <div className="flex items-center gap-[6px] rounded-full px-3 py-2">
                                    {companyNames.map((companyName, index) => (
                                        <button
                                            key={`${companyName}-dot`}
                                            onClick={() => setFirstCompanyIndex(index)}
                                            className={
                                                index === firstCompanyIndex
                                                    ? "h-[7px] w-[7px] rounded-full bg-[#187dde]"
                                                    : "h-[6px] w-[6px] rounded-full bg-[#cbd5e1]"
                                            }
                                            type="button"
                                            aria-label={`${companyName}`}
                                        />
                                    ))}
                                </div>
                                <PartnerArrow dir="right" onClick={handleNextCompanies} label={text.next} />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-4">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))]">
                    <div className="rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)]">
                        <div className="mb-3 flex flex-col gap-1">
                            <h2 className="m-0 text-[14px] font-bold text-[#111827]">{text.numbersTitle}</h2>
                            <div className="text-[12px] text-[#6b7280]">{text.numbersSubtitle}</div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    key: "vacancies",
                                    big: formatCount(vacancyCount),
                                    small: text.numberCards.vacancies,
                                },
                                {
                                    key: "companies",
                                    big: formatCount(companyCount),
                                    small: text.numberCards.companies,
                                },
                                {
                                    key: "regions",
                                    big: formatCount(regionCount),
                                    small: text.numberCards.regions,
                                },
                                {
                                    key: "support",
                                    big: "24/7",
                                    small: text.numberCards.support,
                                },
                            ].map((numberCard) => (
                                <div key={numberCard.key} className="relative overflow-hidden rounded-[16px] bg-[#187dde] px-4 py-[14px] text-white">
                                    <div className="absolute -right-12 -top-12 h-[160px] w-[160px] rounded-full bg-white/15" />
                                    <div className="relative text-[22px] font-black tracking-[-0.02em]">{numberCard.big}</div>
                                    <div className="relative mt-2 whitespace-pre-line text-[11.5px] leading-[1.35] text-white/95">
                                        {numberCard.small}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-[14px] flex flex-col gap-4 rounded-[22px] border border-[#e8ecf2]/85 bg-white p-[18px] shadow-[0_10px_30px_rgba(16,24,40,.08)] lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            <h3 className="m-0 text-[14px] font-extrabold text-[#111827]">{text.companyQuestion}</h3>
                            <p className="mt-2 max-w-[760px] text-[12px] leading-[1.55] text-[#6b7280]">
                                {text.companyText}
                            </p>
                        </div>

                        <div className="flex items-center gap-[10px] pt-1">
                            <button
                                onClick={() => navigate("/employer/create")}
                                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#187dde] px-[14px] py-[10px] text-[14px] font-semibold text-white shadow-[0_10px_18px_rgba(24,125,222,.20)] transition hover:bg-[#1f86e7] active:translate-y-[1px]"
                                type="button"
                            >
                                {text.publishPractice}
                            </button>

                            <button
                                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#187dde]/30 bg-white px-[14px] py-[10px] text-[14px] font-semibold text-[#187dde] transition hover:shadow-[0_10px_18px_rgba(16,24,40,.06)] active:translate-y-[1px]"
                                type="button"
                            >
                                {text.learnMore}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="mt-5 border-t border-[#e8ecf2] bg-white">
                <div className="mx-auto w-[min(1180px,calc(100%-48px))] py-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                        <div className="w-full lg:w-[280px]">
                            <div className="text-[14px] font-black tracking-[-0.01em]">{text.footerBrand}</div>
                            <div className="mt-2 text-[12px] leading-[1.55] text-[#6b7280]">
                                {text.footerDescription}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div>
                                <div className="mb-2 text-[12px] font-extrabold text-[#111827]">{text.footerBrand}</div>
                                {text.footerPracticeLinks.map((link) => (
                                    <a key={link} href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                        {link}
                                    </a>
                                ))}
                            </div>

                            <div>
                                <div className="mb-2 text-[12px] font-extrabold text-[#111827]">{text.footerCompanyTitle}</div>
                                {text.footerCompanyLinks.map((link) => (
                                    <a key={link} href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                        {link}
                                    </a>
                                ))}
                            </div>

                            <div>
                                <div className="mb-2 text-[12px] font-extrabold text-[#111827]">{text.footerContactsTitle}</div>
                                <div className="my-[7px] text-[12px] text-[#4b5563]">{text.city}</div>
                                <div className="my-[7px] text-[12px] text-[#4b5563]">info@praktika.kz</div>
                                <div className="my-[7px] text-[12px] text-[#4b5563]">+7 (727) 12-34-56</div>
                                <a href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                    {text.contactUs}
                                </a>
                                <a href="#!" className="my-[7px] block text-[12px] text-[#4b5563] hover:text-[#111827]">
                                    {text.faq}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3 border-t border-[#e8ecf2] pt-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-[12px] text-[#6b7280]">{text.copyright}</div>
                        <div className="flex flex-wrap gap-5">
                            {text.legalLinks.map((link) => (
                                <a key={link} href="#!" className="text-[12px] text-[#4b5563] hover:text-[#111827]">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}