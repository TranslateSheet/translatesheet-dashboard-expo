export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          create_by_user_id: string | null
          created_at: string
          id: number
          is_active: boolean
          key: string
          last_used_at: string | null
          name: string | null
          project_id: string | null
          usage_count: number
        }
        Insert: {
          create_by_user_id?: string | null
          created_at?: string
          id?: number
          is_active?: boolean
          key: string
          last_used_at?: string | null
          name?: string | null
          project_id?: string | null
          usage_count?: number
        }
        Update: {
          create_by_user_id?: string | null
          created_at?: string
          id?: number
          is_active?: boolean
          key?: string
          last_used_at?: string | null
          name?: string | null
          project_id?: string | null
          usage_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          current_period_end: string | null
          email: string | null
          full_name: string | null
          id: string
          subscription_id: string | null
          subscription_status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          current_period_end?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          subscription_id?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          current_period_end?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          subscription_id?: string | null
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string | null
        }
        Relationships: []
      }
      project_members: {
        Row: {
          created_at: string | null
          id: string
          project_id: string
          role: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id: string
          role?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string
          role?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          id: string
          name: string
          primary_language: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          primary_language?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          primary_language?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      translation_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: number
          new_value: string | null
          old_value: string | null
          translation_id: number | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: number
          new_value?: string | null
          old_value?: string | null
          translation_id?: number | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: number
          new_value?: string | null
          old_value?: string | null
          translation_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "translation_history_translation_id_fkey"
            columns: ["translation_id"]
            isOneToOne: false
            referencedRelation: "translations"
            referencedColumns: ["id"]
          },
        ]
      }
      translation_keys: {
        Row: {
          id: number
          key_name: string
          namespace: string
          project_id: string | null
        }
        Insert: {
          id?: number
          key_name: string
          namespace: string
          project_id?: string | null
        }
        Update: {
          id?: number
          key_name?: string
          namespace?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "translation_keys_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      translations: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          id: number
          key_id: number | null
          language: string
          last_updated_at: string | null
          value: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          id?: number
          key_id?: number | null
          language: string
          last_updated_at?: string | null
          value: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          id?: number
          key_id?: number | null
          language?: string
          last_updated_at?: string | null
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "translations_key_id_fkey"
            columns: ["key_id"]
            isOneToOne: false
            referencedRelation: "translation_keys"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      combined_project_members: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
          profile_id: string | null
          project_id: string | null
          role: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_member_role: "owner" | "admin" | "editor" | "viewer"
      subscription_status:
        | "active"
        | "past due"
        | "canceled"
        | "paused"
        | "inactive"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
