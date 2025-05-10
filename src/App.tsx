
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SymptomAnalyzer from "./pages/SymptomAnalyzer";
import ImageAnalysis from "./pages/ImageAnalysis";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import AboutUs from "./pages/AboutUs";
import Doctors from "./pages/Doctors";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { useUser } from "@civic/auth/react";
import { WagmiProvider, createConfig, useAccount, useConnect, useBalance, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { embeddedWallet } from "@civic/auth-web3/wagmi";
import { toast } from "@/components/ui/sonner";


const wagmiConfig = createConfig({
  chains: [ mainnet, sepolia ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    embeddedWallet(),
  ],
});

// Wagmi requires react-query
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { user: civicUser } = useUser();

  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading protected page...</div>;

  console.log('ProtectedRoute:', { user, civicUser });

  const isLoggedIn =  user || civicUser;

  console.log('isLoggedIn:', isLoggedIn);

  if (!isLoggedIn) {
    // case when user is not logged in
    toast.error('You need to be logged in to access this page');
    return <Navigate to="/login" replace />;
  }
  
  
  return <>{children}</>;
};

// Routes with Auth Provider
const AppRoutes = () => {
  const { user, loading } = useAuth();
  const { user: civicUser } = useUser();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/doctors" element={<Doctors />} />
      
      {/* Protected routes */}
      <Route path="/symptom-analyzer" element={
        <ProtectedRoute>
          <SymptomAnalyzer />
        </ProtectedRoute>
      } />
      <Route path="/image-analysis" element={
        <ProtectedRoute>
          <ImageAnalysis />
        </ProtectedRoute>
      } />
      <Route path="/appointments" element={
        <ProtectedRoute>
          <Appointments />
        </ProtectedRoute>
      } />
      <Route path="/pricing" element={<Pricing />} />
      
      {/* Auth routes - redirect if already logged in */}
      <Route path="/login" element={
        user || civicUser ? <Navigate to="/" replace /> : <Login />
      } />
      <Route path="/signup" element={
        user || civicUser ? <Navigate to="/" replace /> : <Signup />
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const clientId = import.meta.env.VITE_CIVIC_CLIENT_ID;

const App = () => (

  <QueryClientProvider client={queryClient}>
  <WagmiProvider config={wagmiConfig}>
  <CivicAuthProvider clientId={clientId}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </CivicAuthProvider>
  </WagmiProvider>
  </QueryClientProvider>
);

export default App;
