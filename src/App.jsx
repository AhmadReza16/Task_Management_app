import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          top: 16,
          right: 16,
          left: 16,
        }}
        toastOptions={{
          duration: 3000,

          style: {
            maxWidth: "420px",
            borderRadius: "16px",
            background: "#1f2937",
            color: "#ffffff",
            fontWeight: 500,
            padding: "14px 18px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
