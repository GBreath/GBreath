import "./app.css";
import App from "./App.svelte";
import "@/styles/style.scss";

// PWA starter
if (typeof window !== "undefined") {
  import("./pwa");
}

const app = new App({
  target: document.getElementById("app"),
});

export default app;
