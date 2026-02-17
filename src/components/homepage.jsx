import React from "react";

const categories = [
    "Маркетинг",
    "IT и Разработка",
    "Финансы",
    "Инженерное дело",
    "Нефть и газ",
];

const stats = [
    { number: "10.265", label: "Вакансий" },
    { number: "3.265", label: "Новых вакансий" },
    { number: "8.365", label: "Работодателей" },
];

const steps = [
    {
        number: "1",
        title: "Зарегистрируйся",
        text: "Создай личный кабинет студента или организации.",
    },
    {
        number: "2",
        title: "Найди подходящую базу",
        text: "Отфильтруй по городу, профилю, дате начала и типу практики.",
    },
    {
        number: "3",
        title: "Оформи заявку",
        text: "Откликайся на интересные предложения напрямую через портал.",
    },
];

const advantagesStudents = [
    "Единая база проверенных организаций",
    "Прозрачные условия, требования и сроки",
    "Прямой контакт с работодателем",
    "Удобный личный кабинет",
    "Выбор практики по профилю обучения",
];

const advantagesCompanies = [
    "Бесплатное размещение практик",
    "Доступ к широкому пулу студентов",
    "Автоматизированная обработка заявок",
    "Повышение узнаваемости бренда",
    "Подбор лучших кандидатов",
];

function HomePage() {
    return (
        <div className="page">
            <Header />
            <Hero />
            <Stats />
            <HowItWorks />
            <Advantages
                title="Преимущества для студентов"
                items={advantagesStudents}
            />
            <Advantages
                title="Преимущества для организаций"
                items={advantagesCompanies}
            />
            <Numbers />
            <CTA />
            <Footer />
        </div>
    );
}

export default HomePage;

/* ======================== COMPONENTS ======================== */

function Header() {
    return (
        <header className="header">
            <div className="container header-inner">
                <div className="logo">ПрактикаKZ</div>
                <div className="header-actions">
                    <button className="btn-outline">Вход / Регистрация</button>
                    <select className="lang-select">
                        <option>Рус</option>
                        <option>Қаз</option>
                    </select>
                </div>
            </div>
        </header>
    );
}

function Hero() {
    return (
        <section className="hero">
            <div className="container hero-grid">
                <div>
                    <h1>Найди свою базу практики по всему Казахстану</h1>
                    <p>
                        Удобный и быстрый способ найти место для прохождения практики в
                        компаниях, государственных учреждениях и научных организациях.
                    </p>

                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Какую практику вы ищете?"
                        />
                        <button className="btn-primary">Поиск</button>
                    </div>

                    <div className="categories">
                        {categories.map((cat) => (
                            <button key={cat} className="tag">
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hero-image">
                    <div className="mock-image" />
                </div>
            </div>
        </section>
    );
}

function Stats() {
    return (
        <section className="stats">
            <div className="container stats-grid">
                {stats.map((item) => (
                    <div key={item.label} className="stat-card">
                        <div className="stat-number">{item.number}</div>
                        <div>{item.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function HowItWorks() {
    return (
        <section className="how">
            <div className="container">
                <h2>Как это работает?</h2>
                <div className="steps">
                    {steps.map((step) => (
                        <div key={step.number} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Advantages({ title, items }) {
    return (
        <section className="advantages">
            <div className="container">
                <h2>{title}</h2>
                <div className="adv-grid">
                    {items.map((item, index) => (
                        <div key={index} className="adv-card">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Numbers() {
    return (
        <section className="numbers">
            <div className="container numbers-grid">
                <NumberCard number="5,000+" label="Доступных практик" />
                <NumberCard number="1,200+" label="Компаний" />
                <NumberCard number="17" label="Регионов" />
                <NumberCard number="24/7" label="Поддержка" />
            </div>
        </section>
    );
}

function NumberCard({ number, label }) {
    return (
        <div className="number-card">
            <div className="number-big">{number}</div>
            <div>{label}</div>
        </div>
    );
}

function CTA() {
    return (
        <section className="cta">
            <div className="container cta-box">
                <div>
                    <h2>Вы представитель компании?</h2>
                    <p>
                        Разместите информацию о практике или стажировке и найдите
                        талантливых молодых специалистов.
                    </p>
                </div>
                <div>
                    <button className="btn-primary">Разместить практику</button>
                    <button className="btn-outline">Узнать больше</button>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div>
                    <h3>ПрактикаKZ</h3>
                    <p>
                        Единый портал практики и стажировок для студентов и выпускников
                        Казахстана.
                    </p>
                </div>
                <div>
                    <h4>Контакты</h4>
                    <p>г. Алматы</p>
                    <p>info@praktika.kz</p>
                    <p>+7 (7172) 12-34-56</p>
                </div>
            </div>
            <div className="copyright">
                © 2026 ПрактикаKZ. Все права защищены.
            </div>
        </footer>
    );
}
