import { useEffect, useState } from 'react';

function useFetch<T>(url: string, skip?: boolean) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    if (!url || skip) return;

    const getData = async () => {
      const response = await fetch(`/api${url}`);
      const result = await response.json();
      setData(result);
    };
    getData();
  }, [url, skip]);

  return data;
}

export default useFetch;
