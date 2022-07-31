/* eslint-disable no-undef */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/main.pcss";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://ec3b26e7303f4f83991c31af652180a1@o197501.ingest.sentry.io/6614570",
  logErrors: true,
  release: __SENTRY_RELEASE__,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(router);
app.mount("#app");
