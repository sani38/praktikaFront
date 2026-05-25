import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pill } from "../ui/EmployerUi.jsx";
import { getAllStudents } from "../../shared/api/studentApi.js";

function Select({ value, onChange, children, w = "min-w-[160px]" }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className={`h-9 ${w} rounded-xl border border-black/10 bg-white px-3 text-[12px] text-black/60 outline-none focus:border-[#1677ff]`}
        >
            {children}
        </select>
    );
}

function getFullName(student) {
    return [student.lastName, student.firstName]
        .filter(Boolean)
        .join(" ")
        .trim() || "Студент";
}

function getGpaText(gpa) {
    if (gpa === null || gpa === undefined) {
        return "—";
    }

    return `${gpa}/4`;
}

function StudentCard({ student, onMore }) {
    const fullName = getFullName(student);
    const skills = student.skillsMap || [];

    return (
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-3">
                <div className="text-[12px] font-semibold text-black/75">{fullName}</div>
                <Pill variant="blue">GPA: {getGpaText(student.gpa)}</Pill>
            </div>

            <div className="mt-2 text-[12px] text-black/55">
                Satbayev University
                {student.statusName ? `, ${student.statusName}` : ""}
                {student.course ? `, ${student.course} курс` : ""}
            </div>

            <div className="mt-3 text-[11px] text-black/40">Навыки:</div>

            <div className="mt-2 flex flex-wrap gap-2">
                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <Pill key={skill} variant="gray">
                            {skill}
                        </Pill>
                    ))
                ) : (
                    <Pill variant="gray">Навыки не указаны</Pill>
                )}
            </div>

            <div className="mt-3 text-[11px] text-black/40">
                Статус: {student.statusName || "Не указан"}
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
                <button
                    type="button"
                    disabled
                    className="h-9 cursor-not-allowed rounded-xl border border-black/10 bg-black/5 px-4 text-[12px] font-semibold text-black/30"
                >
                    Скачать CV / Резюме
                </button>

                <button
                    type="button"
                    className="h-9 rounded-xl bg-[#eef5ff] px-4 text-[12px] font-semibold text-[#1677ff] transition hover:bg-[#e7f0ff]"
                    onClick={onMore}
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
}

function getUniqueCourses(students) {
    return Array.from(
        new Set(
            students
                .map((student) => student.course)
                .filter((course) => course !== null && course !== undefined)
        )
    ).sort((a, b) => a - b);
}

function getUniqueSkills(students) {
    return Array.from(
        new Set(
            students.flatMap((student) => student.skillsMap || [])
        )
    ).sort((a, b) => a.localeCompare(b));
}

export default function EmployerSearchPage() {
    const navigate = useNavigate();

    const [program, setProgram] = useState("Факультет / программа");
    const [course, setCourse] = useState("Курс обучения");
    const [gpa, setGpa] = useState("Средний балл (GPA)");
    const [skill, setSkill] = useState("Навыки");
    const [cv, setCv] = useState("Наличие резюме / портфолио");

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadStudents() {
        try {
            setLoading(true);
            setError("");

            const response = await getAllStudents();
            setStudents(Array.isArray(response) ? response : []);
        } catch (err) {
            console.error("Ошибка загрузки соискателей:", err);
            setError(err.message || "Не удалось загрузить соискателей");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStudents();
    }, []);

    const courses = useMemo(() => getUniqueCourses(students), [students]);
    const skills = useMemo(() => getUniqueSkills(students), [students]);

    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const studentSkills = student.skillsMap || [];

            const courseMatched =
                course === "Курс обучения" ||
                Number(course.replace(" курс", "")) === student.course;

            const gpaMatched =
                gpa === "Средний балл (GPA)" ||
                (gpa === "3.0+" && Number(student.gpa || 0) >= 3.0) ||
                (gpa === "3.5+" && Number(student.gpa || 0) >= 3.5) ||
                (gpa === "3.7+" && Number(student.gpa || 0) >= 3.7) ||
                (gpa === "3.9+" && Number(student.gpa || 0) >= 3.9);

            const skillMatched =
                skill === "Навыки" ||
                studentSkills.some((studentSkill) =>
                    studentSkill.toLowerCase().includes(skill.toLowerCase())
                );

            const programMatched =
                program === "Факультет / программа" ||
                (student.statusName || "").toLowerCase().includes(program.toLowerCase());

            const cvMatched =
                cv === "Наличие резюме / портфолио" ||
                cv === "Нет";

            return courseMatched && gpaMatched && skillMatched && programMatched && cvMatched;
        });
    }, [students, program, course, gpa, skill, cv]);

    const reset = () => {
        setProgram("Факультет / программа");
        setCourse("Курс обучения");
        setGpa("Средний балл (GPA)");
        setSkill("Навыки");
        setCv("Наличие резюме / портфолио");
    };

    return (
        <div className="py-10">
            <div className="text-[12px] text-[#1677ff]">Поиск соискателей</div>
            <h1 className="mt-2 text-[20px] font-semibold text-black/80">Поиск соискателей</h1>

            <div className="mt-6">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-black/60">
                    <span className="text-black/50">⚑</span> Фильтры
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Select value={program} onChange={(e) => setProgram(e.target.value)}>
                        <option>Факультет / программа</option>
                        <option>Активный</option>
                        <option>В поиске практики</option>
                    </Select>

                    <Select value={course} onChange={(e) => setCourse(e.target.value)} w="min-w-[140px]">
                        <option>Курс обучения</option>
                        {courses.map((courseItem) => (
                            <option key={courseItem}>{courseItem} курс</option>
                        ))}
                    </Select>

                    <Select value={gpa} onChange={(e) => setGpa(e.target.value)} w="min-w-[160px]">
                        <option>Средний балл (GPA)</option>
                        <option>3.0+</option>
                        <option>3.5+</option>
                        <option>3.7+</option>
                        <option>3.9+</option>
                    </Select>

                    <Select value={skill} onChange={(e) => setSkill(e.target.value)} w="min-w-[120px]">
                        <option>Навыки</option>
                        {skills.map((skillItem) => (
                            <option key={skillItem}>{skillItem}</option>
                        ))}
                    </Select>

                    <Select value={cv} onChange={(e) => setCv(e.target.value)} w="min-w-[190px]">
                        <option>Наличие резюме / портфолио</option>
                        <option>Нет</option>
                    </Select>

                    <button
                        type="button"
                        onClick={reset}
                        className="h-9 rounded-xl border border-black/10 bg-white px-4 text-[12px] font-semibold text-black/60 transition hover:bg-black/5"
                    >
                        Сбросить <span className="ml-2">×</span>
                    </button>
                </div>
            </div>

            {loading && (
                <div className="mt-6 rounded-2xl bg-white p-5 text-[13px] text-black/55">
                    Загрузка соискателей...
                </div>
            )}

            {!loading && error && (
                <div className="mt-6 rounded-2xl bg-red-50 p-5 text-[13px] text-red-600">
                    {error}
                </div>
            )}

            {!loading && !error && filteredStudents.length === 0 && (
                <div className="mt-6 rounded-2xl bg-white p-5 text-[13px] text-black/55">
                    Соискатели не найдены.
                </div>
            )}

            {!loading && !error && filteredStudents.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {filteredStudents.map((student) => (
                        <StudentCard
                            key={student.userId}
                            student={student}
                            onMore={() =>
                                navigate(`/employer/candidates/${student.userId}`, {
                                    state: { student },
                                })
                            }
                        />
                    ))}
                </div>
            )}

            <div className="h-10" />
        </div>
    );
}