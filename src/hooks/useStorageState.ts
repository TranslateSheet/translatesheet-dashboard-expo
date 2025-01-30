import { useEffect, useCallback, useReducer } from "react";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

async function encryptData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(data)
  );

  const exportedKey = await crypto.subtle.exportKey("raw", key);
  const keyString = Array.from(new Uint8Array(exportedKey))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const encryptedArray = new Uint8Array(encrypted);
  const combined = new Uint8Array(iv.length + encryptedArray.length);
  combined.set(iv);
  combined.set(encryptedArray, iv.length);

  return JSON.stringify({
    data: Array.from(combined)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""),
    key: keyString,
  });
}

async function decryptData(encryptedData: string): Promise<string> {
  const { data, key } = JSON.parse(encryptedData);
  const decoder = new TextDecoder();

  const combined = new Uint8Array(
    data.match(/.{2}/g)!.map((byte: string) => parseInt(byte, 16))
  );
  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);

  const keyArray = new Uint8Array(
    key.match(/.{2}/g)!.map((byte: string) => parseInt(byte, 16))
  );
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyArray,
    "AES-GCM",
    true,
    ["encrypt", "decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encrypted
  );

  return decoder.decode(decrypted);
}

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null): [boolean, T | null] => [
      false,
      action,
    ],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      const encryptedValue = await encryptData(value);
      localStorage.setItem(key, encryptedValue);
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function useStorageState<T>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
          const decryptedValue = await decryptData(encryptedValue);

          try {
            setState(JSON.parse(decryptedValue));  // Parse JSON if possible
          } catch {
            setState(decryptedValue as unknown as T);  // Handle plain strings
          }
        } else {
          setState(null);
        }
      } catch (e) {
        console.error("Storage error:", e);
      }
    };

    fetchData();
  }, [key]);

  const setValue = useCallback(
    (value: T | null) => {
      setState(value);
      const serializedValue = value !== null ? JSON.stringify(value) : null;
      setStorageItemAsync(key, serializedValue);
    },
    [key]
  );

  return [state, setValue];
}

