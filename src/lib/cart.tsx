import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  variant: string;
  qty: number;
  unit: string;
};

type CartCtx = {
  items: CartItem[];
  favorites: string[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "id">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleFav: (productId: string) => void;
  total: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mw-cart");
      if (raw) setItems(JSON.parse(raw));
      const rawF = localStorage.getItem("mw-fav");
      if (rawF) setFavorites(JSON.parse(rawF));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("mw-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("mw-fav", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const add: CartCtx["add"] = (item) => {
    setItems((prev) => {
      const key = `${item.productId}-${item.variant}`;
      const existing = prev.find((i) => i.id === key);
      if (existing) return prev.map((i) => (i.id === key ? { ...i, qty: i.qty + item.qty } : i));
      return [...prev, { ...item, id: key }];
    });
    setOpen(true);
  };

  const value: CartCtx = {
    items,
    favorites,
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    add,
    remove: (id) => setItems((p) => p.filter((i) => i.id !== id)),
    setQty: (id, qty) =>
      setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))),
    toggleFav: (productId) =>
      setFavorites((p) => (p.includes(productId) ? p.filter((x) => x !== productId) : [...p, productId])),
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    count: items.reduce((s, i) => s + i.qty, 0),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
}

export function pluralize(n: number, forms: [string, string, string]) {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs === 1) return forms[0];
  if (n1 >= 2 && n1 <= 4 && (abs < 10 || abs >= 20)) return forms[1];
  return forms[2];
}
