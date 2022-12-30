import "../styles/globals.css";
import AuthProvider from "./Component/Contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import "tailwindcss/tailwind.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
