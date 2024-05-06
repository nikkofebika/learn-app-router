"use client";

import { QueryClient, QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query";

const client = new QueryClient();
export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider client={client}>
            {children}
        </ReactQueryProvider>
    )
}