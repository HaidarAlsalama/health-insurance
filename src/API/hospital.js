
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAlert } from "components/Alert/Alert";
import { useAxiosWithAuth } from "Hooks/useAxiosWithAuth";

export const useHospital = () => {
    const api = useAxiosWithAuth();

    const fetchResults = async ({ queryKey }) => {
        const [_key,] = queryKey;
        const { data } = await api.get(`Hospitals`);
        return data;
    };

    return useQuery({
        queryKey: ["hospital",],
        queryFn: fetchResults,
        retry: false,
    });
};


export const useEditHospital = (hospitalId) => {
    const api = useAxiosWithAuth();
    const queryClient = useQueryClient();

    const editHospitalStatus = async (geter) => {
        const { data } = await api.post(
            `/Hospitals/${hospitalId}`,
            geter
        );
        return data;
    };

    return useMutation({
        mutationFn: editHospitalStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["hospital"]);
            createAlert("Success", "تم تعديل بيانات مشفى");
        },
        onError: (error) => {
            console.error("Error updating data:", error.message);
        },
        retry: false,
    });
};

export const useEditHospitalStatus = () => {
    const api = useAxiosWithAuth();
    const queryClient = useQueryClient();

    const editHospitalStatus = async (geter) => {
        const { data } = await api.post(
            `/Hospitals/update-status-hospital`,
            geter
        );
        return data;
    };

    return useMutation({
        mutationFn: editHospitalStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["hospital"]);
            createAlert("Info", "تم تغيير حالة التعاقد مع المشفى");
        },
        onError: (error) => {
            console.error("Error updating data:", error.message);
        },
        retry: false,
    });
};

export const useAddHospital = () => {
    const api = useAxiosWithAuth();
    const queryClient = useQueryClient();

    const editHospitalStatus = async (geter) => {
        const { data } = await api.post(
            `/Hospitals`,
            geter
        );
        return data;
    };

    return useMutation({
        mutationFn: editHospitalStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(["hospital"]);
            createAlert("Success", "تم ضافة المشفى");
        },
        onError: (error) => {
            console.error("Error updating data:", error.message);
        },
        retry: false,
    });
};

export const useDeleteHospital = () => {
    const api = useAxiosWithAuth(); // hook for authenticated API calls
    const queryClient = useQueryClient(); // manage query cache

    // Define the mutation function
    const deleteHospital = async (hospitalId) => {
        const { data } = await api.delete(`/Hospitals/${hospitalId}`); // Pass the hospitalId in the URL
        return data; // Return response data if needed
    };

    // UseMutation hook
    return useMutation({
        mutationFn: deleteHospital, // Function for performing the mutation
        onSuccess: () => {
            queryClient.invalidateQueries(["hospital"]); // Refresh the cache for 'hospital'
            createAlert("Success", "تم حذف المستشفى"); // Display success message
        },
        onError: (error) => {
            console.error("Error deleting hospital:", error?.response?.data || error.message); // More detailed error logging
        },
        retry: 1, // Allow one retry before failing
    });
};
