import { supabase } from "../../../lib/supabase";

const BASE_URL = "http://localhost:3001/";
type AvailableEndpoints =
  | "api-keys/get-project-api-keys"
  | "projects/create"
  | "project-members/create";

const apiFetch = async (
  endpoint: AvailableEndpoints,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, any>;
  } = {}
): Promise<any> => {
  const { method = "GET", body } = options;

  // Fetch the session and access token from Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not authenticated.");
  }

  const token = session.access_token;

  // Build headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the fetch request
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Handle errors
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "An error occurred.");
  }

  // Parse and return the response JSON
  return response.json();
};

export default apiFetch;
