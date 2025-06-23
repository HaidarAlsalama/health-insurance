import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";


export const useSubscriber = (engNum, year) => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key, engNum, year] = queryKey;
        const { data } = await api.get(`/AnnualData/${engNum}/GetAllInfo/${year}`);
        return data;
    };

    return useQuery({
        queryKey: ["subscriber", engNum, year],
        queryFn: fetchResults,
        enabled: !!engNum,
        retry: false,
    });
};

export const usePayMethodAndFormNumber = (engineerId, year) => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key, engineerId, year] = queryKey;
        const { data } = await api.get(`/AnnualData/GetPayMethodAndFormNumber`, {
            params: {
                engineerId,
                year
            }
        });
        return data;
    };

    return useQuery({
        queryKey: ["subscriber", engineerId, year],
        queryFn: fetchResults,
        enabled: !!engineerId,
        retry: false,
    });
};

export const useEditPayMethodAndFormNumber = () => {
    const api = useAxiosWithAuth();
    const queryClient = useQueryClient();

    const editPerson = async (info) => {
        const { data } = await api.post(
            `AnnualData/UpdatePayMethodAndFormNumber`,
            info
        );
        return data;
    };

    return useMutation({
        mutationFn: editPerson,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["subscriber"]);
            createAlert("Success", "تم تعديل بطاقة المهندس");
        },
        onError: (error) => {
            console.error("Error updating data:", error.message);
        },
        retry: false,
    });
};

export const usePayMethode = () => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key] = queryKey;
        const { data } = await api.get(`/AnnualData/get-allPayMethode`)
        return data;
    };

    return useQuery({
        queryKey: ["payMethode",],
        queryFn: fetchResults,
        retry: false,
    });
};

