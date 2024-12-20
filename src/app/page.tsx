"use client";
import ProtectedRoutes from "@/components/Auth/Signin/ProtectedRoutes";
import DashBoardPage from "./dashboard/page";
import SignInpage from "./auth/login/page";

const Home: React.FC = () => {
  return (
    <ProtectedRoutes>
      {/* <DashBoardPage /> */}
      <SignInpage />
    </ProtectedRoutes>
  );
};

export default Home;
