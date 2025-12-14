import { useState } from "react";
import { useCart } from "@/Contexts/CartContext";
import ProductGallery from "./ProductGallery";

export default function ShowProduct({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.find(v => v.stock > 0) || null
  );

  const [quantity, setQuantity] = useState(
    selectedVariant ? Math.min(1, selectedVariant.stock) : 1
  );

  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  const { addToCart } = useCart();

  const multimedia = product.multimedia || [];
  const mainImage = multimedia.find(m => m.type !== "video")?.url || "https://via.placeholder.com/600x400";
  const stock = selectedVariant?.stock || 0;
  const isOutOfStock = stock === 0;
  const currentUrl = window.location.href;

  const selectedAttribute = selectedVariant?.values[0]?.attribute || "Variante";
  const selectedValue = selectedVariant?.values[0]?.value || "";

  const handleAddToCart = async () => {
    if (!selectedVariant || isOutOfStock) return;
    setAdding(true);
    await addToCart({
      id: product.id,
      nombre: product.name,
      precio: selectedVariant.price || product.price,
      cantidad: quantity,
      image: mainImage,
      sku: selectedVariant.sku,
      stock: selectedVariant.stock,
      variant: `${selectedAttribute}: ${selectedValue}`,
    });
    setAdding(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white">
      <div className="max-h-[80vh] overflow-y-auto">
        <ProductGallery multimedia={multimedia} productName={product.name} />
      </div>

      <div className="space-y-6 sticky top-0" style={{ fontFamily: "'Playfair Display', serif" }}>
        <h1 className="text-4xl font-extrabold uppercase text-black">{product.name}</h1>
        <p className="text-3xl font-bold text-black">$ {Number(product.price).toFixed(2)}</p>

        {selectedVariant && (
          <p className="text-md text-black font-semibold">
            <span className="font-bold">{selectedVariant.sku}</span>
          </p>
        )}

        <p className="text-lg text-black">{product.description}</p>

        <h3 className="text-xl font-semibold text-black">Seleccionar {selectedAttribute}:</h3>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((v) => {
            const label = v.values[0]?.value;
            return (
              <button
                key={v.id}
                onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                disabled={v.stock === 0}
                className={`min-w-[45px] h-10 flex items-center justify-center border rounded-xl text-lg font-bold transition
                  ${selectedVariant?.id === v.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-black"
                  }
                  ${v.stock === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:border-gray-700"
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {selectedVariant && (
          <div className="pt-2">
            {isOutOfStock ? (
              <p className="text-red-600 font-bold text-lg">NO DISPONIBLE</p>
            ) : (
              <>
                <p className="font-semibold text-black">Stock disponible: {stock}</p>
                <div className="w-full h-2 bg-black/10 rounded-full mt-1">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{ width: `${Math.min((stock / 20) * 100, 100)}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        )}

        {!isOutOfStock && selectedVariant && (
          <div>
            <h3 className="text-lg font-semibold text-black">Cantidad:</h3>
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 border border-black rounded-full text-2xl hover:border-gray-700 transition"
              >−</button>
              <span className="text-2xl font-bold text-black">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => (q < stock ? q + 1 : q))}
                className="w-10 h-10 border border-black rounded-full text-2xl hover:border-gray-700 transition"
              >+</button>
            </div>
          </div>
        )}

        <button
          disabled={!selectedVariant || isOutOfStock || adding}
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-xl text-lg font-bold transition
            ${!selectedVariant || isOutOfStock
              ? "bg-gray-300 text-black cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
            }`}
        >
          {adding ? "Añadiendo..." : success ? "Añadido " : "Añadir al carrito"}
        </button>

        <a
          href={`https://wa.me/56978843627?text=Hola!%20Estoy%20interesado%20en%20este%20producto:%0A${encodeURIComponent(product.name)}%0A${encodeURIComponent(currentUrl)}`}
          target="_blank"
          className="block text-center w-full py-4 rounded-xl border border-black text-black font-bold text-lg hover:bg-black hover:text-white transition"
        >
          Comprar por WhatsApp
        </a>
      </div>
    </div>
  );
}
