import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: logoutMutation, isPending, error } = useMutation({
      mutationFn: logout,
      onSuccess: () => { 
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
          navigate("/login");
          toast.success("Logout successful")
      }
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;