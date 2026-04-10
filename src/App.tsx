import AppRoutes from "./routes/AppRoutes.tsx";
import { WatchlistProvider } from "./context/WatchlistContext.tsx";

export default function App() {
  return (
    <WatchlistProvider>
      <AppRoutes />
    </WatchlistProvider>
  );
}