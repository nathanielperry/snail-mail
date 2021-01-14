import React from "react";

export default function SnipButton({ product, url }) {
    return (
        <button className="snipcart-add-item"
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url={url || product.url}
            data-item-description={product.description}
            data-item-image={product.img.src}
            data-item-name={product.title}
            data-item-max-quantity={1}
        >
            Add to cart
        </button>
    )
}