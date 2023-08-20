import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { VIEWS } from "../../utils/routes";
import DashboardCardComponent from "../../components/Dashboard/shared/dashboard-card.component";
import { getAdminStatistics } from "../../API/Statistics/statistics-api.service";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminDashboard() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [adminStatistics, setAdminStatistics] = useState({
    totalUsers: 0,
    totalInstitutions: 0,
    totalDegreePrograms: 0,
    totalSummaries: 0,
  });
  const [bearToken, setBearToken] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetAdminStatistics(token);
    }
  }, []);

  const handleGetAdminStatistics = async (token: string) => {
    setLoadingSpinner(true);
    const response = await getAdminStatistics(token);
    if (response.success) {
      console.log(response.data);
      setAdminStatistics({
        totalUsers: response.data.totalUsers,
        totalInstitutions: response.data.totalInstitutions,
        totalDegreePrograms: response.data.totalDegreePrograms,
        totalSummaries: response.data.totalSummaries,
      });
      setLoadingSpinner(false);
    } else {
      console.log("Error:", response.error);
      setLoadingSpinner(false);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl text-slate-700 font-bold">Dashboard</h1>
      <div className="container mx-auto mt-12 mb-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCardComponent
            title={"All Users"}
            value={adminStatistics.totalUsers}
            icon={"fa-solid fa-users"}
          />
          <DashboardCardComponent
            title={"All Institutions"}
            value={adminStatistics.totalInstitutions}
            icon={"fa-solid fa-school"}
          />
          <DashboardCardComponent
            title={"All Degree Programs"}
            value={adminStatistics.totalDegreePrograms}
            icon={"fa-solid fa-user-graduate"}
          />
          <DashboardCardComponent
            title={"All Summaries"}
            value={adminStatistics.totalSummaries}
            icon={"fa-solid fa-book-open"}
          />
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
