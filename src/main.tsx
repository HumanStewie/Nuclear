import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Scene from "./Scene.tsx";
import Button from "./components/Button.tsx";
import { Suspense } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <Scene />
    </>
  </StrictMode>
);
