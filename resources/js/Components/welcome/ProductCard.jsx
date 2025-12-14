import { Link } from "@inertiajs/react";

export default function ProductCard({ product }) {
  const totalStock =
    product.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;

  const isOutOfStock = totalStock === 0;

  const imageUrl =
    product.multimedia?.[0]?.url ||
    "https://via.placeholder.com/600x800";

  return (
    <Link
      href={`/products/${product.name.replace(/\s+/g, '-').toLowerCase()}/${product.id}`}
      className={`
        w-full
        h-full
        relative
        overflow-hidden
        rounded-3xl
        shadow-xl
        border
        bg-white
        transition-all
        duration-500
        hover:scale-105
        hover:shadow-2xl
        ${isOutOfStock
          ? "border-black/50 opacity-80"
          : "border-black hover:border-black/80"}
      `}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      <div className="w-full aspect-[4/5] p-4 bg-white border-b border-black/30 rounded-t-3xl overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105 hover:rotate-1"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-extrabold uppercase tracking-wide text-black">
          {product.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {product.variants?.map(v => (
            <span
              key={v.id}
              className={`
                px-3
                py-1
                text-sm
                font-semibold
                rounded-full
                border
                transition
                ${v.stock === 0
                  ? "bg-black/10 text-black border-black/30"
                  : "bg-black text-white border-black hover:bg-black/80 hover:text-white"}
              `}
            >
              {v.values[0]?.value}
            </span>
          ))}
        </div>

        <p className="text-2xl font-extrabold tracking-wide text-black">
          $ {Number(product.price).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
