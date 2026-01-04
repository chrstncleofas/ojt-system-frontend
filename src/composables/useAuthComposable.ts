import { useAuth as useAuthContext } from '../contexts/AuthContext';

// Thin wrapper to keep composables separate from context implementation
export function useAuth() {
  return useAuthContext();
}
