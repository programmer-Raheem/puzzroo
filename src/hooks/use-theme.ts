import { useTheme as useThemeContext } from '../app/providers'

/**
 * Custom React hook to access and toggle the current theme state.
 * Must be used within a component rendered inside the ThemeProvider wrapper.
 */
export function useTheme() {
  return useThemeContext()
}
