import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { ProtectedRoute } from "./components/protected-route";

// Pages
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import SelectUser from "./pages/SelectUser";
import NewCustomer from "./pages/NewCustomer";
import ExistingCustomer from "./pages/ExistingCustomer";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import TicketDetails from "./pages/TicketDetails";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ProtectedRoute requiredAuth={false}><Landing /></ProtectedRoute>} />
            <Route path="/auth" element={<ProtectedRoute requiredAuth={false}><Auth /></ProtectedRoute>} />
            <Route path="/select-user" element={<ProtectedRoute requiredAuth={false}><SelectUser /></ProtectedRoute>} />
            <Route path="/customer/new" element={<ProtectedRoute requiredAuth={false}><NewCustomer /></ProtectedRoute>} />
            <Route path="/customer/existing" element={<ProtectedRoute requiredAuth={false}><ExistingCustomer /></ProtectedRoute>} />

            {/* Protected Routes */}
            <Route path="/customer/dashboard" element={<ProtectedRoute requiredAuth={true}><Dashboard /></ProtectedRoute>} />
            <Route path="/customer/create-ticket" element={<ProtectedRoute requiredAuth={true}><CreateTicket /></ProtectedRoute>} />
            <Route path="/customer/tickets" element={<ProtectedRoute requiredAuth={true}><MyTickets /></ProtectedRoute>} />
            <Route path="/customer/ticket/:id" element={<ProtectedRoute requiredAuth={true}><TicketDetails /></ProtectedRoute>} />
            <Route path="/customer/settings" element={<ProtectedRoute requiredAuth={true}><Settings /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
