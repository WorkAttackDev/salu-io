import { useState } from "react";
import { useErrorStore } from "../stores/errorStore";

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

const useApi = <Fn extends Function>() => {
  const [data, setData] = useState<Awaited<ReturnType<Fn>> | null>(null);
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleError } = useErrorStore();

  const request = async <Fn2 extends Fn>(
    promiseFn: ReturnType<Fn>,
    silent?: boolean
  ): Promise<Awaited<ReturnType<Fn2>> | null> => {
    setLoading(true);
    try {
      const result = await promiseFn;

      setData(result);
      return result;
    } catch (err) {
      setError(handleError(err, silent));
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
