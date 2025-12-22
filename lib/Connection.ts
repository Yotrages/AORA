import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useConnection = () => {
  const [data, setData] = useState<{id: string, name: string, image: string}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("htt", {
        method: "GET",
      });
      const data = await response.json();
      setData(data);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData()
  return { data, isLoading, refetch }
};

export default useConnection
