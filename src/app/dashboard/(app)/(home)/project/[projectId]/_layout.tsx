import { supabaseAdmin } from "../../../../../../../lib/supabase";
import Drawer from "expo-router/drawer";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { CustomDrawerContent } from "@/components/navigation/CustomDrawerContent";

export async function generateStaticParams() {
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("id");

  if (error || !projects) {
    console.warn("No projects found:", error);
    return [];
  }

  return projects.map((p: { id: string }) => ({
    projectId: p.id,
  }));
}

export default function ProjectLayout() {
  const isDesktop = useIsDesktop();
  return (
    <Drawer
      screenOptions={{
        drawerType: isDesktop ? "permanent" : "front",
        headerShown: false,
        drawerStyle: {
          width: 290,
          padding: 16,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Translations",
        }}
      />
      <Drawer.Screen
        name="api-keys"
        options={{
          drawerLabel: "API Keys",
        }}
      />
      <Drawer.Screen
        name="project-members"
        options={{
          drawerLabel: "Project Members",
        }}
      />
    </Drawer>
  );
}
