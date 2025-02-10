import { Database } from "../../lib/supabase/database.types";

/////////////////////////
// PROJECTS
/////////////////////////

export type ProjectsRow = Database["public"]["Tables"]["projects"]["Row"];

/////////////////////////
// PROJECT MEMBERS
/////////////////////////

export type ProjectMemberRole =
  Database["public"]["Enums"]["project_member_role"];

export type ProjectMemberInsert =
  Database["public"]["Tables"]["project_members"]["Insert"];

/////////////////////////
// API KEYS
/////////////////////////  

export type ApiKeyRow = Database["public"]["Tables"]["api_keys"]["Row"];

/////////////////////////
// TRANSLATIONS
/////////////////////////  

export type TranslationKeyRow =
  Database["public"]["Tables"]["translation_keys"]["Row"];

export type TranslationRow = Database["public"]["Tables"]["translations"]["Row"];

export type TranslationUpdate = Database["public"]["Tables"]["translations"]["Update"];


/////////////////////////
// USER PROFILES
/////////////////////////  

export type UserProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
