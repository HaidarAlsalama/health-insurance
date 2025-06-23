
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";

export const useCity = (enable) => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key,] = queryKey;
        const { data } = await api.get(`Cities`);
        return data;
    };

    return useQuery({
        queryKey: ["cities",],
        queryFn: fetchResults,
        enabled: enable,
        retry: false,
    });
};

