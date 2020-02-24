import { GlobalWithFetchMock } from 'jest-fetch-mock';

import MockMutationObserver from './__mocks__/MutationObserver';

// Setup mocking of fetch
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;

// mock MutationObserver
(global as any).MutationObserver = MockMutationObserver;
