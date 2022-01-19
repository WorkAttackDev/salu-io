import { AxiosError } from "axios";
import { useState } from "react";
import { handleClientError } from "../utils/client_errors";

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

const useApi = <Fn extends Function>() => {
  const [data, setData] = useState<Awaited<ReturnType<Fn>> | null>(null);
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const request = async (
    promiseFn: ReturnType<Fn>
  ): Promise<Awaited<ReturnType<Fn>> | null> => {
    setLoading(true);
    try {
      const result = await promiseFn;

      setData(result);
      return result;
    } catch (err) {
      setError(handleClientError(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    data && setData(null);
    error && setError(null);
    loading && setLoading(false);
  };

  return {
    data,
    error,
    setError,
    loading,
    request,
    reset,
  };
};

export default useApi;
