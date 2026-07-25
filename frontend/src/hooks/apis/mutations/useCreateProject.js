import { useMutation } from "@tanstack/react-query";
import { createProjectApi } from "../../../apis/projects";

export const useCreateProject = () => {
    const { mutateAsync, isPending, isSuccess, isError } = useMutation({
        mutationFn: createProjectApi,
        onSuccess: (data) => {
            console.log("Project created successfully:", data);
        },
        onError: (error) => {
            console.error("Error creating project:", error);
        },
    });
    return {
        createProjectMutation : mutateAsync,
        isPending,
        isSuccess,
        isError
      };
};

