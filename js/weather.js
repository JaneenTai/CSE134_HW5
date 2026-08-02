class WeatherWidget extends HTMLElement {
    static get observedAttributes() {
        return ["lat", "lon"];
    }

    constructor() {
        super();

        const template = document.getElementById("weather-template");

        this.appendChild(template.content.cloneNode(true));

        this.abortController = null;

        this.status = this.querySelector(".status");
        this.list = this.querySelector(".weather-data");

        this.temp = this.querySelector(".temp");
        this.wind = this.querySelector(".wind");
        this.code = this.querySelector(".code");

        this.retry = this.querySelector(".retry");

        this.retry.addEventListener("click", () => {
            this.loadWeather();
        });

        this.setState("idle");
    }

    connectedCallback() {
        this.loadWeather();
    }

    disconnectedCallback() {
        if (this.abortController) {
            this.abortController.abort();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.loadWeather();
        }
    }

    setState(state, message = "") {
        this.dataset.state = state;

        this.status.textContent = message;

        switch (state) {
            case "idle":
                this.status.textContent = "No weather loaded.";
                this.list.hidden = true;
                this.retry.hidden = true;
                break;

            case "loading":
                this.status.textContent = "Loading weather...";
                this.list.hidden = true;
                this.retry.hidden = true;
                break;

            case "ready":
                this.status.textContent = "";
                this.list.hidden = false;
                this.retry.hidden = true;
                break;

            case "error":
                this.list.hidden = true;
                this.retry.hidden = false;
                break;
        }
    }

    async loadWeather() {
        const lat = this.getAttribute("lat");
        const lon = this.getAttribute("lon");

        if (!lat || !lon) {
            this.setState("idle");
            return;
        }

        if (this.abortController) {
            this.abortController.abort();
        }

        const cached = this.getCachedWeather();
        if(cached){
            this.renderWeather(cached);
            this.setState("ready");
            return;
        }

        this.abortController = new AbortController();

        const timeout = setTimeout(() => {
            this.abortController.abort();
        }, 8000);

        this.setState("loading");

        try {
            const url =
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;

            const response = await fetch(url, {
                signal: this.abortController.signal
            });

            clearTimeout(timeout);

            if (!response.ok) {
                throw new Error("Unable to retrieve weather.");
            }

            const data = await response.json();

            this.saveCachedWeather(data);
            this.renderWeather(data);
            this.setState("ready");

            //this.temp.textContent = data.current.temperature_2m;
            //this.wind.textContent = data.current.wind_speed_10m;
            //this.code.textContent = data.current.weather_code;
            //this.setState("ready");

        }
        catch (err) {

            clearTimeout(timeout);

            if (err.name === "AbortError") {
                this.setState(
                    "error",
                    "Request timed out. Please try again."
                );
            }
            else {
                this.setState(
                    "error",
                    "Unable to load weather data."
                );
            }
        }
    }

    // Cache expires after 10 minutes
static CACHE_TTL = 10 * 60 * 1000;

getCacheKey() {
    return `weather-${this.getAttribute("lat")}-${this.getAttribute("lon")}`;
}

getCachedWeather() {
    const cached = sessionStorage.getItem(this.getCacheKey());

    if (!cached) return null;

    const parsed = JSON.parse(cached);

    if (Date.now() > parsed.expires) {
        sessionStorage.removeItem(this.getCacheKey());
        return null;
    }

    return parsed.data;
}

saveCachedWeather(data) {
    sessionStorage.setItem(
        this.getCacheKey(),
        JSON.stringify({
            expires: Date.now() + WeatherWidget.CACHE_TTL,
            data
        })
    );
}

renderWeather(data) {

    this.temp.textContent =
        data.current.temperature_2m;

    this.wind.textContent =
        data.current.wind_speed_10m;

    this.code.textContent =
        data.current.weather_code;
}
}

customElements.define("weather-widget", WeatherWidget);