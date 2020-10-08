function requireAll(r) {
  return r.keys().map(r);
}

requireAll(require.context("@components", true, /\.js|scss$/));
requireAll(require.context("@/pages/ui-kit", true, /\.js|scss$/));
requireAll(require.context("@/theme", true, /\.js|scss$/));
