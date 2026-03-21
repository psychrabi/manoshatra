import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Loading from "./components/Loading";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <Suspense
        fallback={
          <Loading />
        }
      >
        <App />
      </Suspense>
    </StrictMode>
  );
}
