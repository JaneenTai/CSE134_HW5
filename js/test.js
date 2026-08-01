class SunriseWidget extends HTMLElement {
    static observedAttributes = ["lat", "lng", "date"];

    constructor() {
        super();
    
        // this.controller = null;
        function render(sunrise) {
            const template = document.getElementById("sunrise-template");
            const clone = template.content.cloneNode(true);

            clone.querySelector().textContent = sunrise.lat;
        }

        /*
        const template = document.querySelector("sunrise-template");
        this.attachShadow({ mode: "open" })
          .append(template.content.cloneNode(true));
          */

        this.innerHTML = `
            <h2>Today's Sunrise & Sunset</h2>
            <p class="status"></p>
            <p>Sunrise: <span class="sunrise">--</span></p>
            <p>Sunset: <span class="sunset">--</span></p>
        `;
    }

    connectedCallback() {
        this.loadData();
    }

    disconnectedCallback() {
        // Cancel any request if the element is removed
        if (this.controller) {
            this.controller.abort();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.loadData();
        }
    }

    async loadData() {
        // Cancel previous request
        if (this.controller) {
            this.controller.abort();
        }

        this.controller = new AbortController();

        this.dataset.state = "loading";
        this.querySelector(".status").textContent = "Loading...";

        const lat = this.getAttribute("lat");
        const lng = this.getAttribute("lng");
        const date = this.getAttribute("date") || "today";

        try {
            const timeout = setTimeout(() => {
                this.controller.abort();
            }, 5000);

            clearTimeout(timeout);

            const response = await fetch(
                `https://api.sunrise-sunset.org/v2?lat=${lat}&lng=${lng}&date=${date}`,
                { signal: this.controller.signal }
            );

            const data = await response.json();

            this.querySelector(".sunrise").textContent =
                new Date(data.sunrise).toLocaleTimeString();

            this.querySelector(".sunset").textContent =
                new Date(data.sunset).toLocaleTimeString();

            this.querySelector(".status").textContent = "";

            this.dataset.state = "ready";
        } catch (error) {
            clearTimeout(timeout);
            if (error.name === "AbortError") return;

            this.dataset.state = "error";
            this.querySelector(".status").textContent =
                "Unable to load data.";
        }
    }
}

customElements.define("sunrise-widget", SunriseWidget);