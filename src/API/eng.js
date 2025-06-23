
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";

export const useSearchPerson = (limit = 15, pageNumber = 1, searchTerm = "", searchMethod = "", searchTable = "main") => {
    const api = useAxiosWithAuth();

    const fetchSearchResults = async ({ queryKey }) => {
        const [_key, limit, page, term, value, searchTable] = queryKey;
        const { data } = await api.get(`/Searchs/AI_SERCHs`, {
            params: {
                searchValue: term,
                searchType: value,
                pageSize: limit,
                pageNumber: page,
                searchTable
            },
        });
        return data;
    };

    return useQuery({
        queryKey: ["searchhPerson", limit, pageNumber, searchTerm, searchMethod, searchTable],
        queryFn: fetchSearchResults,
        enabled: !!searchTerm,
        retry: false,
    });
};

export const useAllEngs = (limit = 15, pageNumber = 1) => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key, limit, page] = queryKey;
        const data = await api.get(`/Engineers`, {
            params: {

                pageSize: limit,
                pageNumber: page,
            },
        });
        return data;
    };

    return useQuery({
        queryKey: ["allEngs", limit, pageNumber,],
        queryFn: fetchResults,
        retry: false,
    });
};

export const useEngCard = (engNum) => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key, engNum] = queryKey;
        const { data } = await api.get(`/AnnualData/${engNum}/Engineer-And-Family-Member`);
        return data;
    };

    return useQuery({
        queryKey: ["engCard", engNum],
        queryFn: fetchResults,
        enabled: !!engNum,
        retry: false,
    });
};

export const usePerson = (personId) => {
    const api = useAxiosWithAuth();

    const getPerson = async () => {
        const { data } = await api.get(`Persons/${personId}`, {
            params: {
                personId
            },
        });
        return data;
    };

    return useQuery({
        queryKey: ['person', personId], // إضافة queryKey
        queryFn: getPerson,
        enabled: !!personId, // تفعيل الاستعلام فقط إذا كان هناك invoiceId
        retry: false, // إيقاف إعادة المحاولة
    });
};

export const useEditPerson = (personId, year) => {
    const api = useAxiosWithAuth();
    const queryClient = useQueryClient();

    const editPerson = async (newPerson) => {
        const { data } = await api.post(
            `Persons/${personId}/update-person-details?Year=${year}`,
            newPerson
        );
        return data;
    };

    return useMutation({
        mutationFn: editPerson,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["engCard"]);
        },
        onError: (error) => {
            console.error("Error updating data:", error.message);
        },
        enabled: !!personId,
        retry: false,
    });
};

export const useEngineer = (engNum) => {
    const api = useAxiosWithAuth();

    const fetchEngineer = async () => {
        const { data } = await api.get(`/${engNum}`);
        return data;
    };

    return useQuery({
        queryKey: ["engineer", engNum],
        queryFn: fetchEngineer,
        enabled: !!engNum, // لا يتم تفعيل الاستعلام إلا إذا كان engNum موجودًا
        retry: false, // لا تعيد المحاولة عند فشل الاستعلام
    });
};


export const useEngFromNakaba = (engNum) => {
    const api = useAxiosWithAuth();

    const getEngFromNakaba = async () => {
        const res = await api.get(`Engineers/GetByEngNumber/${engNum}`);
        if (res.status == 200)
            return res.data;
        else if (res.status == 204) {
            createAlert('Error', "ss")
            return null;
        }
    };

    return useQuery({
        queryKey: ['engFromNakaba', engNum], // إضافة queryKey
        queryFn: getEngFromNakaba,
        enabled: !!engNum, // تفعيل الاستعلام فقط إذا كان هناك invoiceId
        retry: false, // إيقاف إعادة المحاولة
    });
};