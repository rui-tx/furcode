import { Page } from '@playwright/test';

// base url for all tests
export const BASE_URL = 'http://localhost:3000/';

// urls for all tests
export const URLS = {
    home: BASE_URL,
    donate: BASE_URL + 'donation',
    pets: BASE_URL + 'pets',
    shelter: BASE_URL + 'shelter',
    shelterRegister: BASE_URL + 'shelter/register',
    wannaHelp: BASE_URL + 'wannaHelp',
    userLogin: BASE_URL + 'login',
    userRegister: BASE_URL + 'register',
    about: BASE_URL + 'about',
    terms: BASE_URL + 'terms',
    privacy: BASE_URL + 'privacy',
    cookie: BASE_URL + 'cookie',
};

// functions to get common elements
export const ELEMENTS = {
    // Header
    getNavigation: (page: Page) => page.getByRole('navigation'),
    // Main content
    getMainContent: (page: Page) => page.getByRole('main'),
    // Footer
    // getFooter: (page: Page) => page.getByRole('contentinfo')
};
