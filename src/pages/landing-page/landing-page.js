function requireAll(r) {
  return r.keys().map(r);
}

requireAll(require.context("@components", true, /\.js|scss$/));
requireAll(require.context("@/pages/landing-page", true, /\.js|scss$/));
requireAll(require.context("@/theme", true, /\.js|scss$/));

import Head from "../../pages/template/head";

Head.init();
