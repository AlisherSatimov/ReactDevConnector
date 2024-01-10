import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;

    (async function () {
      try {
        setIsLoading(true);
        let { data } = await axios.get(url);
        if (unmounted) return;
        setData(data);
      } catch (err) {
        if (unmounted) return;
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      unmounted = true;
    };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;