import React, { useEffect, useState } from "react";
import DashboardTopNavComponent from "../../components/Dashboard/shared/dashboard-topnav.component";
import { Outlet } from "react-router-dom";
import AdminSidebarComponent from "../../components/Dashboard/Admin/admin-sidebar.component";
import LoadingSpinner from "../../components/loading-spinner.component";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";

export default function AdminDashboardLayout() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setBearerToken(token);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="flex">
        <AdminSidebarComponent />
        <div className="flex-1 ml-64">
          <DashboardTopNavComponent />
          <div className="p-10 mt-16">
            <div className="h-screen bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {loadingSpinner ? <LoadingSpinner /> : null}
    </React.Fragment>
  );
}
