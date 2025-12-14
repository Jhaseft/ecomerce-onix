import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CartModal({ isOpen, onClose }) {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setShow(true), 20);
    } else {
      setShow(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000000] flex justify-end transition-colors duration-300
        ${show ? 'bg-black/60' : 'bg-black/0'}`}
    >
      <div
        className={`
          bg-black
          w-full
          sm:w-96
          h-full
          p-6
          relative
          flex
          flex-col
          text-white
          shadow-2xl
          rounded-l-3xl
          transform
          transition-transform
          duration-300
          ${show ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Cerrar */}
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Título */}
        <div className="flex gap-12 items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Mi Carrito</h2>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center text-white hover:text-red-400 transition"
            >
              <Trash2 size={18} className="mr-1" />
              Vaciar
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-white text-center mt-10">
              El carrito está vacío
            </p>
          ) : (
            cart.map(item => (
              <div
                key={item.rowId}
                className="flex items-center gap-4 p-3 bg-white/10 rounded-2xl"
              >
                <img
                  src={item.options.image || 'https://via.placeholder.com/100'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1 flex flex-col justify-between h-full">
                  <p className="font-semibold truncate">{item.name}</p>

                  {item.options.variant && (
                    <p className="text-sm text-white/80">
                      {item.options.variant}
                    </p>
                  )}

                  {item.options.sku && (
                    <p className="text-sm text-white/80">
                      {item.options.sku}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.rowId, item.qty - 1)}
                      disabled={item.qty <= 1}
                      className="p-1 bg-white/10 rounded-l hover:bg-white/30 transition"
                    >
                      <Minus size={16} className="text-white" />
                    </button>

                    <span className="px-3 font-semibold">{item.qty}</span>

                    <button
                      onClick={() => updateQuantity(item.rowId, item.qty + 1)}
                      className="p-1 bg-white/10 rounded-r hover:bg-white/30 transition"
                    >
                      <Plus size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-between h-full">
                  <p className="font-bold text-white">
                    $ {(item.price * item.qty).toFixed(2)}
                  </p>

                  <button
                    className="text-white text-sm mt-1 hover:text-red-400 transition"
                    onClick={() => removeFromCart(item.rowId)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        {cart.length > 0 && (
          <div className="mt-4 border-t border-white/30 pt-4 flex flex-col gap-4">
            <p className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-white">$ {total.toFixed(2)}</span>
            </p>

            <Link
              href="/checkout"
              className="
                block
                w-full
                py-3
                text-center
                bg-white
                text-black
                font-bold
                rounded-xl
                hover:bg-white/80
                transition
              "
            >
              Confirmar pedido
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
