import { useMutation } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "store/reducers/authReducer";

export const useLogin = () => {
  const api = useAxiosWithAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginProcess = async (user) => {
    const { data } = await api.post("/Users/LoginManager", user);
    return data;
  };

  return useMutation({
    mutationFn: loginProcess,
    onSuccess: (data) => {
      createAlert("Success", "تم تسجيل الدخول");
      navigate("/dashboard");
      dispatch(login(data));
    },
  });
};
