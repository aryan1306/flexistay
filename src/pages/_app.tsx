import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
