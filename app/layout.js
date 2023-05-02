import { ContextProvider } from "@/components/Clients";
import "../styles/app.scss";
import Header from "./Header";

export const metadata = {
  title: "Todo App",
  description: "This is a todo app. You can add and modify your daily todos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
