import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Suspense } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body suppressHydrationWarning={true}>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Suspense>
            <Nav />
          </Suspense>
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
