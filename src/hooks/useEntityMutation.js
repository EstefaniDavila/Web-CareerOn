import { useQueryClient, useMutation } from '@tanstack/react-query';
import React from 'react'
import { useToast, ToastAction } from '../components/ui/use-toast'
import useCrud from './useCrud';

const entityTranslations = {
  professors: "profesores",
  maintenances: "mantenimientos",
};

const useEntityMutation = ({ entityName }) => {
  const queryClient = useQueryClient();
  const { insertModel, updateModel, deleteModel, patchModel } = useCrud();

  const mutation = useMutation({
    mutationFn: async ({ action, entity, endpoint }) => {
      const formData = new FormData();

      if (action === "create" || action === "update" || action === "patch") {
        if (entity instanceof FormData) {
          for (const [key, value] of entity.entries()) {
            formData.append(`${entityName}[${key}]`, value);
          }
        } else if (entity) {
          for (const key in entity) {
            formData.append(`${entityName}[${key}]`, entity[key]);
          }
        }
      }

      switch (action) {
        case "create":
          // Si tu API usa JSON en lugar de FormData, pasa 'entity' directamente
          return await insertModel(entity, endpoint);
        case "update":
          return await updateModel(entity, endpoint);
        case "delete":
          return await deleteModel(endpoint);
        case "patch":
          return await patchModel(entity, endpoint);
        default:
          throw new Error("Acción no válida");
      }
    },
    onMutate: async ({ action, entity, id }) => {
      await queryClient.cancelQueries([entityName]);
      const previousData = queryClient.getQueryData([entityName]);

      queryClient.setQueryData([entityName], (old) => {
        if (!old) return old;

        if (action === "create") {
          return {
            ...old,
            rows: [...(old?.rows || []), entity],
            rowsCount: (old?.rowsCount || 0) + 1
          };
        } else if (action === "update") {
          if (Array.isArray(old?.rows)) {
            return {
              ...old,
              rows: old.rows.map((item) => (item.id === id ? { ...item, ...entity } : item))
            };
          }
        } else if (action === "delete") {
          if (Array.isArray(old?.rows)) {
            return {
              ...old,
              rows: old.rows.filter((item) => item.id !== id),
              rowsCount: (old?.rowsCount || 1) - 1
            };
          }
        }
        return old;
      });
      return { previousData };
    },
    onError: (error, { action }, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([entityName], context.previousData);
      }
      const backendData = error?.response?.data || {};
      const backendMessage = backendData?.message || 'Error desconocido';

      console.error("ERROR MUTATION:", backendMessage, error);
      alert(`Error: ${backendMessage}`); // Reemplazar con toast() de shadcn si lo traes
    },
    onSuccess: (data, { action }) => {
      const translatedEntityName = entityTranslations[entityName] || entityName;
      console.log(`El ${translatedEntityName} se ha procesado correctamente.`);

      // Descomentar si usas useToast()
      // toast({ title: "Exito", description: "Operación completada" })

      queryClient.invalidateQueries([entityName]);
    },
    onSettled: () => {
      queryClient.invalidateQueries([entityName]);
    },
  });

  return mutation;
};

export default useEntityMutation;
