import React, { useEffect, useState } from "react";
import DashboardTopNavComponent from "../../components/Dashboard/shared/dashboard-topnav.component";
import UserSidebarComponent from "../../components/Dashboard/User/user-sidebar.component";
import { Outlet } from "react-router-dom";

export default function UserDashboardLayout() {
  return (
    <React.Fragment>
      <div className="flex">
        <UserSidebarComponent />
        <div className="flex-1 ml-64">
          <DashboardTopNavComponent />
          <div className="p-10 mt-16">
            <div className="h-screen bg-white">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
