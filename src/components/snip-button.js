import React from "react";

export default function SnipButton({ bug, url }) {
    return (
        <button class="snipcart-add-item"
            data-item-id={bug.id}
            data-item-price={bug.price}
            data-item-url={url || bug.url}
            data-item-description={bug.description}
            data-item-image={bug.img.src}
            data-item-name={bug.title}
        >
            Add to cart
        </button>
    )
}