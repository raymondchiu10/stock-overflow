"use client";
import { QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import React, { ReactElement, useState } from "react";

export const ReactQueryClientProvider = ({
	children,
	dehydratedState,
}: {
	children: ReactElement;
	dehydratedState?: DehydratedState | null;
}) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000,
					},
				},
			})
	);
	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
		</QueryClientProvider>
	);
};
