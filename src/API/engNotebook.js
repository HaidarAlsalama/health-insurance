
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";


export const useSpacilzations = () => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key,] = queryKey;
        const { data } = await api.get(`/Specializations`);
        return data;
    };

    return useQuery({
        queryKey: ["spacilzations",],
        queryFn: fetchResults,
        retry: false,
    });
};

export const useWorkplaces = () => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key,] = queryKey;
        const { data } = await api.get(`/Workplaces`);
        return data;
    };

    return useQuery({
        queryKey: ["workplaces",],
        queryFn: fetchResults,
        retry: false,
    });
};

export const useEngineerWAS = (engineerId) => {
    const api = useAxiosWithAuth();

    const fetchEngineerWAS = async () => {
        const { data } = await api.get(`Engineers/get-EngineerData`, {
            params: {
                engineerId,
            },
        });
        return data;
    };

    return useQuery({
        queryKey: ["engineerWAS", engineerId],
        queryFn: fetchEngineerWAS,
        enabled: !!engineerId, // لا يتم تفعيل الاستعلام إلا إذا كان engNum موجودًا
        retry: false, // لا تعيد المحاولة عند فشل الاستعلام
    });
};

export const useEditPersonWAS = () => {
    const api = useAxiosWithAuth();
    const queryClient = useQueryClient();

    const editPerson = async (info) => {
        const { data } = await api.post(
            `Engineers/update-EngineerInfo`,
            info
        );
        return data;
    };

    return useMutation({
        mutationFn: editPerson,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["engCard", "subscriber"]);
            createAlert("Success", "تم تعديل بطاقة المهندس");
        },
        onError: (error) => {
            console.error("Error updating data:", error.message);
        },
        retry: false,
    });
};