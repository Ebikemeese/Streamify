import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/root/HomePage"
import NotFoundPage from "./pages/root/NotFoundPage"
import SignupPage from "./pages/auth/SignupPage"
import LoginPage from "./pages/auth/LoginPage"
import  OnboardingPage from "./pages/auth/OnboardingPage"
import NotificationsPage from "./pages/chats/NotificationsPage"
import CallPage from "./pages/chats/CallPage"
import ChatPage from "./pages/chats/ChatPage"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div >
      <BrowserRouter>
        <Routes>

          <Route path="sign-up" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="call" element={<CallPage />} />
            <Route path="chat" element={<ChatPage />} />

          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  )
}

export default App
