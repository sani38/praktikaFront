import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//import PublicLayout from "./public/Publiclayout.jsx";
import PublicHomePage from "./pages/PublicHomePage.jsx";

import StudentLayout from "./student/StudentLayout.jsx";

// страницы студента
import StudentCabinetPage from "./student/pages/StudentCabinetPage.jsx";
import StudentInternshipsPage from "./student/pages/StudentInternshipsPage.jsx";
import StudentInternshipDetailsPage from "./student/pages/StudentInternshipDetailsPage.jsx";
import StudentApplicationsPage from "./student/pages/StudentApplicationsPage.jsx";
import StudentEmployersPage from "./student/pages/StudentEmployersPage.jsx";
import StudentContractsPage from "./student/pages/StudentContractsPage.jsx";
import StudentContractDetailsPage from "./student/pages/StudentContractDetailsPage.jsx";
import StudentResumeBuilderPage from "./student/pages/StudentResumeBuilderPage.jsx";
import StudentDiaryPage from "./student/pages/StudentDiaryPage.jsx";
// страницы работодателя
import EmployerLayout from "./employer/EmployerLayout.jsx";
import EmployerDashboardPage from "./employer/pages/EmployerDashboardPage.jsx";
import EmployerVacanciesPage from "./employer/pages/EmployerVacanciesPage.jsx";
import EmployerCandidatesPage from "./employer/pages/EmployerCandidatesPage.jsx";
import EmployerStudentDetailsPage from "./employer/pages/EmployerStudentDetailsPage.jsx";
import EmployerSearchPage from "./employer/pages/EmployerSearchPage.jsx";
import EmployerCreateVacancyPage from "./employer/pages/EmployerCreateVacancyPage.jsx";
//страницы центра карьеры
import CareerLayout from "./career/CareerLayout.jsx";
import CareerDashboardPage from "./career/pages/CareerDashboardPage.jsx";
import CareerStudentsPage from "./career/pages/CareerStudentsPage.jsx";
import CareerEmployersPage from "./career/pages/CareerEmployersPage.jsx";
import CareerContractsPage from "./career/pages/CareerContractsPage.jsx";
import CareerDiaryPage from "./career/pages/CareerDiaryPage.jsx";
import CareerContractDetailsPage from "./career/pages/CareerContractDetailsPage.jsx";
import CareerDiaryDetailsPage from "./career/pages/CareerDiaryDetailsPage.jsx";
//страницы админа
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage.jsx";
import AdminUsersPage from "./admin/pages/AdminUsersPage.jsx";
import AdminApprovalsPage from "./admin/pages/AdminApprovalsPage.jsx";
import AdminLogsPage from "./admin/pages/AdminLogsPage.jsx";
import AdminSettingsPage from "./admin/pages/AdminSettingsPage.jsx";
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* PUBLIC */}
                {/*<Route element={<PublicLayout />}>*/}
                    <Route path="/" element={<PublicHomePage />} />
                {/*</Route>*/}

                <Route path="/student" element={<StudentCabinetPage />} />

                <Route path="/student" element={<StudentLayout />}>
                    <Route path="internships" element={<StudentInternshipsPage />} />
                    <Route path="internships/:id" element={<StudentInternshipDetailsPage />} />
                    <Route path="applications" element={<StudentApplicationsPage />} />
                    <Route path="employers" element={<StudentEmployersPage />} />
                    <Route path="contracts" element={<StudentContractsPage />} />
                    <Route path="contracts/:id" element={<StudentContractDetailsPage />} />
                    <Route path="resume" element={<StudentResumeBuilderPage />} />
                    <Route path="diary" element={<StudentDiaryPage />} />
                    <Route path="*" element={<Navigate to="/student" replace />} />
                </Route>

                {/* EMPLOYER */}
                <Route path="/employer" element={<EmployerLayout />}>
                    <Route index element={<EmployerDashboardPage />} />
                    <Route path="vacancies" element={<EmployerVacanciesPage />} />
                    <Route path="candidates" element={<EmployerCandidatesPage />} />

                    <Route path="candidates/:id" element={<EmployerStudentDetailsPage />} />
                    <Route path="search" element={<EmployerSearchPage />} />
                    <Route path="create" element={<EmployerCreateVacancyPage />} />

                    <Route path="*" element={<Navigate to="/employer" replace />} />
                </Route>

                {/*CAREER*/}
                <Route path="/career" element={<CareerLayout />}>
                    <Route index element={<CareerDashboardPage />} />
                    <Route path="students" element={<CareerStudentsPage />} />
                    <Route path="employers" element={<CareerEmployersPage />} />
                    <Route path="contracts" element={<CareerContractsPage />} />
                    <Route path="diary" element={<CareerDiaryPage />} />
                    <Route path="*" element={<Navigate to="/career" replace />} />
                    <Route path="contracts/:id" element={<CareerContractDetailsPage />} />
                    <Route path="diary/:id" element={<CareerDiaryDetailsPage />} />
                </Route>
                {/*ADMIN*/}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="approvals" element={<AdminApprovalsPage />} />
                    <Route path="logs" element={<AdminLogsPage />} />
                    <Route path="settings" element={<AdminSettingsPage />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
