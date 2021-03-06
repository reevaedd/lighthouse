/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';
const BASE_URL = 'http://localhost:10200/seo/';

function headersParam(headers) {
  return headers
    .map(({name, value}) => `extra_header=${name}:${encodeURI(value)}`)
    .join('&');
}

const failureHeaders = headersParam([{
  name: 'x-robots-tag',
  value: 'none',
}, {
  name: 'link',
  value: '<http://example.com>;rel="alternate";hreflang="xx"',
}]);

/**
 * Expected Lighthouse audit values for seo tests
 */
module.exports = [
  {
    initialUrl: BASE_URL + 'seo-tester.html',
    url: BASE_URL + 'seo-tester.html',
    audits: {
      'viewport': {
        score: true,
      },
      'document-title': {
        score: true,
      },
      'meta-description': {
        score: true,
      },
      'http-status-code': {
        score: true,
      },
      'link-text': {
        score: true,
      },
      'is-crawlable': {
        score: true,
      },
      'hreflang': {
        score: true,
      },
    },
  },
  {
    initialUrl: BASE_URL + 'seo-failure-cases.html?status_code=403&' + failureHeaders,
    url: BASE_URL + 'seo-failure-cases.html?status_code=403&' + failureHeaders,
    audits: {
      'viewport': {
        score: false,
      },
      'document-title': {
        score: false,
        extendedInfo: {
          value: {
            id: 'document-title',
          },
        },
      },
      'meta-description': {
        score: false,
      },
      'http-status-code': {
        score: false,
        displayValue: '403',
      },
      'link-text': {
        score: false,
        displayValue: '3 links found',
        details: {
          items: {
            length: 3,
          },
        },
      },
      'is-crawlable': {
        score: false,
        details: {
          items: {
            length: 2,
          },
        },
      },
      'hreflang': {
        score: false,
        details: {
          items: {
            length: 3,
          },
        },
      },
    },
  },
];
