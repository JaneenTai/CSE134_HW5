---
layout: base.njk
title: Home
description: The home page
---

<main>
<template id="weather-template">
        <section class="weather">
            <h2>My Current Weather</h2>

            <p class="status"></p>

            <ul class="weather-data" hidden>
                <li>Temperature: <span class="temp"></span>°C</li>
                <li>Wind Speed: <span class="wind"></span> km/h</li>
                <li>Weather Code: <span class="code"></span></li>
            </ul>

            <button class="retry" hidden>Retry</button>
        </section>
    </template>

    <noscript>
        <p>
            Weather information could not be loaded. Please enable JavaScript
            or try refreshing the page.
        </p>
    </noscript>

    <weather-widget lat="32.7157" lon="-117.1611"></weather-widget>

    <h2>I'm Janeen, nice to meet you!</h2>
    <picture>
        <img src="./images/selfie1.JPG" alt="a young adult woman with shoulder 
        length hair and black thick rimmed glasses" width="240" height="300">
    </picture>
</main>