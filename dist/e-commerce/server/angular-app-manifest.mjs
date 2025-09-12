
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-J5VL4MHZ.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-J5VL4MHZ.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-J5VL4MHZ.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/forgot-password"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/products"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/wishlist"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/cart"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/checkout/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/allorders"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/order-details"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/categories"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/sub-categories/*/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/brands"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/details/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-UQQ5NCIN.js",
      "chunk-KMUECNAW.js",
      "chunk-MGYB2XQA.js",
      "chunk-PG6YDBKM.js"
    ],
    "route": "/details/*/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-M3ETVYMO.js"
    ],
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 30918, hash: 'a3c24cf53aa56b746b84ad7192908b8878e8f50adc7c4ebe87a1a497fba8faf5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 20955, hash: 'e696ed68c54b521e9180a7d296ec5ecd237bacdc094471444b8e08056b18bf50', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-G5RXYPTM.css': {size: 193264, hash: 'TioQqPEa5RE', text: () => import('./assets-chunks/styles-G5RXYPTM_css.mjs').then(m => m.default)}
  },
};
