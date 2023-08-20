import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading-spinner.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
import DashboardCardComponent from "../../components/Dashboard/shared/dashboard-card.component";
import { getUserStatistics } from "../../API/Statistics/statistics-api.service";

export default function UserDashboard() {
  useScrollToTop();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [userStatistics, setUserStatistics] = useState({
    totalSummaries: 0,
    totalRatings: 0,
    totalFeedbacks: 0,
    totalDownloads: 0,
  });
  const [bearToken, setBearToken] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("accessToken");
    if (user && token) {
      handleGetUserStatistics(token);
    }
  }, []);

  const handleGetUserStatistics = async (token: string) => {
    setLoadingSpinner(true);
    const response = await getUserStatistics(token);
    if (response.success) {
      console.log(response.data);
      setUserStatistics({
        totalSummaries: response.data.totalSummaries,
        totalRatings: response.data.totalRatingsForSpecificUser,
        totalFeedbacks: response.data.totalFeedbacksForSpecificUser,
        totalDownloads: response.data.totalDownloads,
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
            title={"Ratings for me"}
            value={userStatistics.totalRatings}
            icon={"fa-solid fa-star"}
          />
          <DashboardCardComponent
            title={"Feedbacks for me"}
            value={userStatistics.totalFeedbacks}
            icon={"fa-solid fa-comments"}
          />
          <DashboardCardComponent
            title={"Summaries posted by me"}
            value={userStatistics.totalSummaries}
            icon={"fa-solid fa-book-open"}
          />
          <DashboardCardComponent
            title={"My summary downloads"}
            value={userStatistics.totalDownloads}
            icon={"fa-solid fa-download"}
          />
        </div>
      </div>
      <div className="h-32"></div>
      {loadingSpinner ? <LoadingSpinner /> : null}
      <ToastContainer />
    </React.Fragment>
  );
}
