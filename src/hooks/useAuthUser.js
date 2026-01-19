import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // don’t retry failed auth check
  });

  return {
    isLoading,
    isError,
    error,
    // if your API returns { user: {...} }, grab that
    // otherwise just return the data directly
    authUser: data?.user ?? data,
  };
};

export default useAuthUser;
