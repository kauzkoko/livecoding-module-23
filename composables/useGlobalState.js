// store.js
import { createGlobalState, useStorage } from "@vueuse/core";

export const useGlobalState = createGlobalState(() => {
  const willstay = useStorage("vueuse-local-storage", "initialValue");
  return { willstay };
});
