import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["authUser"] }),
            navigate("/");
            toast.success("Login successful")
        }
    });

    return { error, isPending, loginMutation: mutate };
};

export default useLogin;