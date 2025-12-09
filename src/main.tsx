import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, MantineProvider} from '@mantine/core'
import '@mantine/core/styles.css';
import "@mantine/notifications/styles.css";
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './Routes/AppRoutes.tsx'
import { Notifications } from "@mantine/notifications";
import { Provider } from 'react-redux'
import appStore from './AppStore.tsx'
import {createStyles } from "@mantine/core";

const theme = createTheme({
  focusRing: "never",
  colors: {
    primary: ['#f1fcfa', '#cff8ef', '#9ff0e1', '#67e1cf', '#32b9a9', '#1fad9f', '#168b82', '#166f69', '#165955', '#174a47', '#072c2b'],
    neutral: ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '#000000',],
  },
  primaryColor: "primary",
  primaryShade: 4,
  defaultGradient: {
    from: "primary.4",
    to: "primary.8",
    deg: 132
  }
});
export const headerSx = {
  // green gradient header (white, green, black palette)
  background:
    "linear-gradient(135deg, rgba(0,184,148,1) 0%, rgba(46,204,113,1) 100%)",
  padding: 28,
  borderRadius: "12px 12px 0 0",
  color: "#fff",
  textAlign: "center" as const,
};

export const cardBodySx = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  marginTop: -28,
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.06)",
};

export const labelSx = { fontSize: 13, color: "rgba(0,0,0,0.6)" };
export const valueSx = { fontWeight: 600, color: "#000", marginTop: 6 };


const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <MantineProvider theme={theme}>
    <Notifications position="top-center" />
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
    </Provider>
  </MantineProvider>
);
