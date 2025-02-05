import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { Database } from "../../lib/supabase/database.types";

type TranslationUpdate = Database["public"]["Tables"]["translations"]["Update"];
type TranslationRow = Database["public"]["Tables"]["translations"]["Row"];

interface UpdateTranslationVars {
  translationId: number;
  newValue: string;
}

export const useUpdateTranslation = () => {
  const queryClient = useQueryClient();

  return useMutation<TranslationRow, Error, UpdateTranslationVars>({
    mutationFn: async ({
      translationId,
      newValue,
    }: {
      translationId: number;
      newValue: string;
    }) => {
      const payload: TranslationUpdate = {
        value: newValue,
        last_updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("translations")
        .update(payload)
        .eq("id", translationId)
        .single();

      if (error) throw error;
      return data as TranslationRow;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["translations"],
      });
    },
  });
};
