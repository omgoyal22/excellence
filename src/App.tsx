
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { TodoProvider } from "@/contexts/TodoContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TodoList from "./pages/TodoList";
import CalendarView from "./pages/CalendarView";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TodoProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TodoProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
