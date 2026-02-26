import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.ts";
import PageLoader from "./components/PageLoader.tsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <PageLoader />

return (
  <div 
    className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-cover bg-center"
    style={{ backgroundImage: "url('/background.png')" }}
  >
    <Routes>
      <Route
        path="/"
        element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/login"
        element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
      />
    </Routes>

    <Toaster/>
  </div>
);
}

export default App;
