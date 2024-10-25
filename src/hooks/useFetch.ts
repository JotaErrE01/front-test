import { testApi } from '@/api/testApi';
import { useEffect, useState } from 'react';


interface FetchOptions<T> {
  data?: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string | null;
}

interface Options {
  isLazy?: boolean;
}


const initialState: FetchOptions<null> = {
  data: null,
  isLoading: true,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}

export const useFetch = <T,>(url: string, options: Options = {}) => {
  const { isLazy } = options;
  const [fetchOptions, setFetchOptions] = useState<FetchOptions<T>>({ ...initialState });


  useEffect(() => {
    if (isLazy) return;
    setFetchOptions(fetchOptions => ({
      ...fetchOptions,
      isLoading: true,
    }));

    testApi.get(url)
      .then((response) => {
        setFetchOptions(fetchOptions => ({
          ...fetchOptions,
          data: response.data,
          isLoading: false,
          isSuccess: true,
        }));
      })
      .catch((error) => {
        setFetchOptions(fetchOptions => ({
          ...fetchOptions,
          isLoading: false,
          isError: true,
          errorMessage: error.response?.data?.message,
        }));
      });
  }, [url, isLazy]);

  const fetch = async () => {
    setFetchOptions(fetchOptions => ({
      ...fetchOptions,
      isLoading: true,
    }));
    try {
      const response = await testApi.get(url);
      setFetchOptions(fetchOptions_1 => ({
        ...fetchOptions_1,
        data: response.data,
        isLoading: false,
        isSuccess: true,
      }));
    } catch (error: any) {
      setFetchOptions(fetchOptions_2 => ({
        ...fetchOptions_2,
        isLoading: false,
        isError: true,
        errorMessage: error.response?.data?.message,
      }));
    }
  };

  const mutate = async (data?: any) => {
    setFetchOptions(fetchOptions => ({
      ...fetchOptions,
      isLoading: true,
    }));
    try {
      const response = await testApi.post(url, data);
      const newState = {
        ...fetchOptions,
        data: response.data,
        isLoading: false,
        isSuccess: true,
      }
      setFetchOptions(newState);
      return newState;
    } catch (error: any) {
      const newState = {
        ...fetchOptions,
        isLoading: false,
        isError: true,
        errorMessage: error?.response?.data?.message,
      }
      setFetchOptions(newState);
      return newState;
    }
  };

  return { ...fetchOptions, mutate, fetch };
};
