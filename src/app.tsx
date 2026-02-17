import React from "react";

const IconUser = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="currentColor"
            d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        />
    </svg>
);

const IconSearch = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="currentColor"
            d="M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
        />
    </svg>
);

const FeatureIcon = ({ variant = "blue" }) => {
    const isOrange = variant === "orange";
    return (
        <span className={`fi ${isOrange ? "fiOrange" : "fiBlue"}`} aria-hidden="true">
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
        <span className={`sci ${isOrange ? "sciOrange" : "sciBlue"}`} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h5v-2h-5V6h-2v7a2 2 0 0 0 2 2Z"
                />
            </svg>
        </span>
    );
};

const ArrowRight = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5z" />
    </svg>
);

const ChevronDown = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7 10l5 5 5-5 1.4 1.4-6.4 6.4-6.4-6.4L7 10z" />
    </svg>
);

const PartnerArrow = ({ dir = "left" }) => (
    <button className="partnerArrow" type="button" aria-label={dir === "left" ? "Назад" : "Вперёд"}>
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

function Header() {
    return (
        <header className="header">
            <div className="container headerInner">
                <div className="logoWrap">
                    <div className="logoMark" aria-hidden="true" />
                    <div className="logoText">Лого</div>
                </div>

                <div className="headerRight">
                    <button className="btn btnGhost btnSm" type="button">
                        <IconUser size={16} />
                        <span>Вход / Регистрация</span>
                    </button>

                    <button className="btn btnGhost btnSm langBtn" type="button">
                        <span>Рус</span>
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="hero">
            <div className="container heroGrid">
                <div className="heroLeft">
                    <h1 className="heroTitle">
                        Найди свою базу
                        <br />
                        практики по
                        <br />
                        всему Казахстану
                    </h1>

                    <p className="heroSubtitle">
                        Удобный и быстрый способ найти место для прохождения практики в компаниях, государственных учреждениях и
                        научных организациях.
                    </p>

                    <div className="searchRow">
                        <div className="searchInputWrap">
                            <input className="searchInput" type="text" defaultValue="" placeholder="Какую практику вы ищете?" />
                        </div>
                        <button className="btn btnPrimary searchBtn" type="button">
                            <span>Поиск</span>
                            <IconSearch size={18} />
                        </button>
                    </div>

                    <div className="tagRow">
                        <button className="tag" type="button">Маркетинг</button>
                        <button className="tag" type="button">IT и Разработка</button>
                        <button className="tag" type="button">Финансы</button>
                        <button className="tag" type="button">Инженерное дело</button>
                        <button className="tag" type="button">Нефть и Газ</button>
                    </div>

                    <button className="btn btnSoft" type="button">
                        <span>Найти базу практик</span>
                        <ArrowRight size={16} />
                    </button>
                </div>

                <div className="heroRight" aria-label="Место для изображения">
                    <div className="heroImageFrame">
                        <div className="heroImageBackdrop" />
                        <div className="heroImagePhoto" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function AboutPortal() {
    return (
        <section className="section">
            <div className="container">
                <div className="card aboutCard">
                    <div className="aboutTop">
                        <h2 className="sectionTitle">О портале</h2>
                        <p className="sectionText">
                            Портал баз практики — это современная платформа, созданная для студентов и работодателей по всему
                            Казахстану. Здесь студенты легко находят актуальные предложения для прохождения производственной,
                            преддипломной и других видов практик, а организации — потенциальных стажёров, мотивированных развиваться в
                            своей сфере.
                        </p>
                    </div>

                    <div className="aboutFeatures">
                        <div className="featureItem">
                            <FeatureIcon />
                            <div className="featureText">Поиск базы практики по городу, специальности и типу организации</div>
                        </div>
                        <div className="featureItem">
                            <FeatureIcon />
                            <div className="featureText">Онлайн-подача заявки на практику</div>
                        </div>
                        <div className="featureItem">
                            <FeatureIcon />
                            <div className="featureText">Информация о компаниях, отзывах и требованиях</div>
                        </div>
                        <div className="featureItem">
                            <FeatureIcon />
                            <div className="featureText">Прямое взаимодействие с работодателем</div>
                        </div>
                    </div>

                    <div className="statsRow">
                        <div className="statCard">
                            <div className="statLabel">Вакансий</div>
                            <div className="statValue">10.265</div>
                        </div>
                        <div className="statCard">
                            <div className="statLabel">Новых вакансий</div>
                            <div className="statValue">3.265</div>
                        </div>
                        <div className="statCard">
                            <div className="statLabel">Работодателей</div>
                            <div className="statValue">8.365</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    return (
        <section className="section">
            <div className="container">
                <div className="card howCard">
                    <div className="howHead">
                        <h2 className="sectionTitle">Как это работает?</h2>
                        <div className="muted">Всё просто — 3 шага до успешной практики</div>
                    </div>

                    <div className="howRow">
                        <div className="howStep">
                            <div className="howNum">1</div>
                            <div className="howBody">
                                <div className="howTitle">Зарегистрируйся</div>
                                <div className="howText">Создай личный кабинет студента или организации.</div>
                            </div>
                        </div>

                        <div className="howStep">
                            <div className="howNum">2</div>
                            <div className="howBody">
                                <div className="howTitle">Найди подходящую базу</div>
                                <div className="howText">Отфильтруй по городу, профилю, должности и типу практики.</div>
                            </div>
                        </div>

                        <div className="howStep">
                            <div className="howNum">3</div>
                            <div className="howBody">
                                <div className="howTitle">Оформи заявку</div>
                                <div className="howText">Откликнись на предложения напрямую через портал.</div>
                            </div>
                        </div>

                        <div className="howNote">
                            <div className="howNoteDot" aria-hidden="true" />
                            <div className="howNoteText">
                                Платформа уведомит тебя о статусе заявки и поможет связаться с представителем организации.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AdvantagesStudents() {
    return (
        <section className="section">
            <div className="container">
                <div className="card advCard">
                    <div className="advHead">
                        <h2 className="sectionTitle">Преимущества для студентов</h2>
                    </div>

                    <div className="advGrid">
                        <div className="advSmall">
                            <SmallCardIcon />
                            <div className="advText">Единая база проверенных организаций по всему Казахстану</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon />
                            <div className="advText">Прозрачные условия, требования и сроки</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon />
                            <div className="advText">Прямой контакт с работодателями</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon />
                            <div className="advText">Удобный личный кабинет и история заявок</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon />
                            <div className="advText">Возможность выбрать практику по профилю обучения</div>
                        </div>
                    </div>

                    <button className="btn btnPrimary btnSm wideLeft" type="button">
                        <span>Перейти на страницу практиканта</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}

function AdvantagesCompanies() {
    return (
        <section className="section">
            <div className="container">
                <div className="card advCard">
                    <div className="advHead">
                        <h2 className="sectionTitle">Преимущества для организаций</h2>
                    </div>

                    <div className="advGrid">
                        <div className="advSmall">
                            <SmallCardIcon variant="orange" />
                            <div className="advText">Бесплатное размещение базы практики</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon variant="orange" />
                            <div className="advText">Доступ к широкому пулу студентов ведущих вузов</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon variant="orange" />
                            <div className="advText">Автоматизированная система обработки заявок</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon variant="orange" />
                            <div className="advText">Повышение узнаваемости компании среди молодёжи</div>
                        </div>
                        <div className="advSmall">
                            <SmallCardIcon variant="orange" />
                            <div className="advText">Возможность отбора лучших кандидатов для дальнейшего трудоустройства</div>
                        </div>
                    </div>

                    <button className="btn btnPrimary btnSm wideLeft" type="button">
                        <span>Перейти на страницу организации</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}

function Reviews() {
    return (
        <section className="section">
            <div className="container">
                <div className="card reviewsCard">
                    <div className="reviewsHead">
                        <h2 className="sectionTitle">Отзывы</h2>
                        <div className="muted">Возможность отбора лучших кандидатов для дальнейшего трудоустройства</div>
                    </div>

                    <div className="reviewsGrid">
                        <div className="reviewItem">
                            <div className="reviewAvatar" aria-hidden="true" />
                            <div className="reviewBubble">
                                Благодаря порталу я прошла практику в ведущей IT-компании Алматы. Удобный поиск и оперативный отклик
                                работодателя — это то, чего не хватало раньше!
                            </div>
                            <div className="reviewMeta">
                                <div className="reviewName">Амина</div>
                                <div className="reviewRole">Студентка 3 курса</div>
                            </div>
                        </div>

                        <div className="reviewItem">
                            <div className="reviewAvatar" aria-hidden="true" />
                            <div className="reviewBubble">
                                Мы нашли сразу троих практикантов через портал — удобно, быстро и без лишней бюрократии.
                            </div>
                            <div className="reviewMeta">
                                <div className="reviewName">HR-менеджер</div>
                                <div className="reviewRole">ТОО «TechLine»</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Partners() {
    return (
        <section className="section">
            <div className="container">
                <div className="card partnersCard">
                    <div className="partnersHead">
                        <h2 className="sectionTitle">Работодатели партнёры</h2>
                    </div>

                    <div className="partnersRow">
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                        <div className="partnerItem">
                            <div className="partnerLogo" aria-hidden="true" />
                            <div className="partnerName">Казатомпром</div>
                        </div>
                    </div>

                    <div className="partnersNav">
                        <PartnerArrow dir="left" />
                        <div className="dots" aria-label="Пагинация партнёров">
                            <span className="dot" />
                            <span className="dot active" />
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </div>
                        <PartnerArrow dir="right" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function NumbersAndCTA() {
    return (
        <section className="section">
            <div className="container">
                <div className="card numbersCard">
                    <div className="numbersHead">
                        <h2 className="sectionTitle">ПрактикаKZ в цифрах</h2>
                        <div className="muted">Единый портал для студентов и работодателей</div>
                    </div>

                    <div className="numbersRow">
                        <div className="numCard">
                            <div className="numBig">5.000+</div>
                            <div className="numSmall">Доступных практик<br />по всему Казахстану</div>
                        </div>
                        <div className="numCard">
                            <div className="numBig">1.200+</div>
                            <div className="numSmall">Компаний<br />предлагают стажировки</div>
                        </div>
                        <div className="numCard">
                            <div className="numBig">17</div>
                            <div className="numSmall">Регионов<br />по всей стране</div>
                        </div>
                        <div className="numCard">
                            <div className="numBig">24/7</div>
                            <div className="numSmall">Поддержка<br />для студентов и компаний</div>
                        </div>
                    </div>
                </div>

                <div className="card ctaCard">
                    <div className="ctaLeft">
                        <h3 className="ctaTitle">Вы представитель компании?</h3>
                        <p className="ctaText">
                            Разместите информацию о практике или стажировке и найдите талантливых молодых специалистов для своей
                            компании. Получите доступ к базе резюме студентов и выпускников ведущих вузов Казахстана.
                        </p>
                    </div>

                    <div className="ctaRight">
                        <button className="btn btnPrimary" type="button">Разместить практику +</button>
                        <button className="btn btnOutline" type="button">Узнать больше</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container footerTop">
                <div className="footerBrand">
                    <div className="footerTitle">Практика</div>
                    <div className="footerDesc">
                        Единый портал практики и стажировок для студентов и выпускников Казахстана.
                    </div>
                </div>

                <div className="footerCols">
                    <div className="footerCol">
                        <div className="footerColTitle">Практика</div>
                        <a className="footerLink" href="#!">Найти практику</a>
                        <a className="footerLink" href="#!">Советы по составлению резюме</a>
                        <a className="footerLink" href="#!">Подготовка к собеседованию</a>
                        <a className="footerLink" href="#!">Истории успеха</a>
                        <a className="footerLink" href="#!">Блог</a>
                    </div>

                    <div className="footerCol">
                        <div className="footerColTitle">Для компаний</div>
                        <a className="footerLink" href="#!">Разместить вакансию</a>
                        <a className="footerLink" href="#!">Поиск кандидатов</a>
                        <a className="footerLink" href="#!">Брендинг работодателя</a>
                        <a className="footerLink" href="#!">Партнёрская программа</a>
                        <a className="footerLink" href="#!">Тарифы</a>
                    </div>

                    <div className="footerCol">
                        <div className="footerColTitle">Контакты</div>
                        <div className="footerText">г. Алматы</div>
                        <div className="footerText">info@praktika.kz</div>
                        <div className="footerText">+7 (727) 12-34-56</div>
                        <a className="footerLink" href="#!">Свяжитесь с нами</a>
                        <a className="footerLink" href="#!">Вопросы и ответы</a>
                    </div>
                </div>
            </div>

            <div className="container footerBottom">
                <div className="footerCopy">© 2025 Практика. Все права защищены.</div>
                <div className="footerBottomLinks">
                    <a className="footerLink" href="#!">Условия использования</a>
                    <a className="footerLink" href="#!">Политика конфиденциальности</a>
                    <a className="footerLink" href="#!">Карта сайта</a>
                </div>
            </div>
        </footer>
    );
}

export default function App() {
    return (
        <div className="page">
            <Header />
            <Hero />
            <AboutPortal />
            <HowItWorks />
            <AdvantagesStudents />
            <AdvantagesCompanies />
            <Reviews />
            <Partners />
            <NumbersAndCTA />
            <Footer />
        </div>
    );
}
