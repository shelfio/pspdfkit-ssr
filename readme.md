# pspdfkit-ssr [![CircleCI](https://circleci.com/gh/shelfio/pspdfkit-ssr/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/pspdfkit-ssr/tree/master) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg) [![npm (scoped)](https://img.shields.io/npm/v/@shelf/pspdfkit-ssr.svg)](https://www.npmjs.com/package/@shelf/pspdfkit-ssr)

> Transform JSON into AWS SNS message attributes format. See [1](https://docs.aws.amazon.com/sns/latest/dg/sns-message-attributes.html), [2](https://docs.aws.amazon.com/sns/latest/dg/sns-subscription-filter-policies.html)

## Install

```
$ yarn add @shelf/pspdfkit-ssr
```

## Usage

```js
const {createReadStream} = require('fs');
const {uploadPDF, getJWTForDocumentPreview} = require('@shelf/pspdfkit-ssr');

const documentId = await uploadPDF('some-custom-document-id', createReadStream('./file.pdf'));

const jwt = getJWTForDocumentPreview(documentId);
```

**Note:** this library relies upon following environment variables:

- `PSPDFKIT_SERVER_URL`
- `PSPDFKIT_SERVER_AUTH_TOKEN`
- `PSPDFKIT_SERVER_JWT_KEY`
- `PSPDFKIT_SERVER_JWT_PASSPHRASE`

**Note:** this library tries to be idempotent.
Unlike PSPDFKit server, it catches errors when document with provided ID was already uploaded.

See [Client Authentication](https://pspdfkit.com/guides/server/current/pspdfkit-server/client-authentication/)
section of PSPDFKit documentation for details.

## License

MIT © [Shelf](https://shelf.io)
