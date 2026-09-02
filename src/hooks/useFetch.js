import { useEffect, useState, useCallback } from "react";

/**
 * Runs an async fetcher on mount (and whenever deps change), tracking
 * loading / error / data so pages don't repeat the same boilerplate.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const run = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong while loading this page.");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, isLoading, error, refetch: run };
}
