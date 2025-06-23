import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";


export const useDailyReport = (startDate, endDate) => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key, startDate, endDate] = queryKey;
        const { data } = await api.get(`/EXCEL/report/Json`, {
            params: {
                startDate,
                endDate
            }
        });
        return data;
    };

    return useQuery({
        queryKey: ["allInsured", startDate, endDate],
        queryFn: fetchResults,
        // enabled: !!startDate && !!endDate,
        retry: false,
    });
};

export const useAllNewInsured = () => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key] = queryKey;
        const { data } = await api.get(`/EXCEL/reportForNewPersons/Json`);
        return data;
    };

    return useQuery({
        queryKey: ["allNewInsured"],
        queryFn: fetchResults,
        retry: false,
    });
};

export const useAllInsuredDetails = () => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key] = queryKey;
        const { data } = await api.get(`/EXCEL/detailed-json-report/json`);
        return data;
    };

    return useQuery({
        queryKey: ["allInsuredDetails"],
        queryFn: fetchResults,
        retry: false,
    });
};
