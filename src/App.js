import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { AuthProvider } from "./providers/authProvider";

export function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
