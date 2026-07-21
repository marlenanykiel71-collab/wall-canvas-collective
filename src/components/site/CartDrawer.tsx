import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";

export function CartDrawer() {
  const { isOpen, close, items, remove, setQty, total } = useCart();

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-walnut-deep text-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="font-display uppercase tracking-wide">Koszyk ({items.length})</div>
          <button onClick={close} className="hover:text-ember" aria-label="Zamknij"><X className="h-5 w-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-white/60 px-6">
            <ShoppingBag className="h-12 w-12" strokeWidth={1} />
            <p className="text-sm">Twój koszyk jest pusty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-white/10">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 px-6 py-5">
                <img src={i.image} alt={i.name} className="h-24 w-20 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-display uppercase text-sm truncate">{i.name}</div>
                  <div className="text-xs text-white/50 mt-1">{i.variant}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-white/20">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="px-2 py-1 hover:bg-white/10"><Minus className="h-3 w-3" /></button>
                      <span className="px-3 text-sm">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="px-2 py-1 hover:bg-white/10"><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="text-xs text-white/40">{i.unit}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button onClick={() => remove(i.id)} className="text-white/40 hover:text-ember"><X className="h-4 w-4" /></button>
                  <div className="font-display text-sm">{formatPrice(i.price * i.qty)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-white/10 px-6 py-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Suma</span>
            <span className="font-display text-lg">{formatPrice(total)}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full bg-ember text-ink py-4 text-xs font-bold uppercase tracking-widest hover:bg-ember-dark disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Przejdź do kasy
          </button>
          <button onClick={close} className="w-full border border-white/30 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/10">
            Kontynuuj zakupy
          </button>
        </div>
      </aside>
    </>
  );
}
