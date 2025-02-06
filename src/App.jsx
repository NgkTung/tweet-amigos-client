import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <ToastContainer hideProgressBar />
    </QueryClientProvider>
  );
}

export default App;
