import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    // Return null on 401 instead of throwing
    queryFn: async () => {
      const res = await fetch("/api/auth/user", {
        credentials: "include",
      });
      if (res.status === 401) {
        return null;
      }
      if (!res.ok) {
        throw new Error(`${res.status}: ${await res.text()}`);
      }
      return await res.json();
    },
  });

  return {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
  };
}
