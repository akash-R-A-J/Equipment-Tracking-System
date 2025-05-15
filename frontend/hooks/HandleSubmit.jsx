import { useEffect, useState } from "react";
import axios from "axios";

// url -> which backend endpoint to hit?
// method -> request method type,
// headers -> including auth token
export const useFetch = (url, method = "GET", body, headers = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const config = {
          method,
          headers,
          cancelToken: source.token,
        };
        
        // for GET request
        if(method !== 'GET'){
          config.data = body;
        }
        
        const response = await axios(url, config);
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error?.response?.data || error?.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Component unmounted, request canceled");
    };
  }, [url, method, body, headers]);

  return { loading, data, error };
};
