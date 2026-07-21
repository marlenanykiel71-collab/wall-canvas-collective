import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteLayout({ children, transparentHeader = false }: { children: ReactNode; transparentHeader?: boolean }) {
  return (
    <CartProvider>
      <Header />
      <main className={transparentHeader ? "" : "pt-16 md:pt-20"}>{children}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
