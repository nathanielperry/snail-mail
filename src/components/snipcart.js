import React from "react";
import { Helmet } from 'react-helmet';

export default function Snipcart() {
    return (
        <>
            <Helmet>
                <link rel="preconnect" href="https://app.snipcart.com" />
                <link rel="preconnect" href="https://cdn.snipcart.com" />
                <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.css" />
            </Helmet>
            <script async src="https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.js"></script>
            <div hidden id="snipcart" data-api-key={process.env.SNIPCART_PUBLIC_KEY}></div>
        </>
    );
};