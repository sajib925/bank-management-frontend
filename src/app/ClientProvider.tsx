"use client";

import useLenis from "@/lib/useLenis";
import { QueryClientProvider, QueryClient } from "react-query";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useLenis();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
