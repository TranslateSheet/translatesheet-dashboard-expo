const { exec } = require("child_process");

const projectId = "mxexigmyqfmvezgpmfrq"

if (!projectId) {
  console.error(
    "Error: SUPABASE_PROJECT_ID is not set in environment variables.",
  );
  process.exit(1);
}

const command = `npx supabase gen types --lang=typescript --project-id '${projectId}' --schema public > lib/supabase/database.types.ts`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating types: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log("Types generated successfully:", stdout);
});
