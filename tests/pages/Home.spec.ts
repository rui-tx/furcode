import { test, expect } from '@playwright/test';
import { URLS, ELEMENTS } from '../Constants';

test.beforeEach(async ({ page }) => {
    await page.goto(URLS.home);
});

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('PetHub');
});

///////////////////////////////// Header links /////////////////////////////////

test('logo link in header', async ({ page }) => {
    await ELEMENTS.getNavigation(page).getByRole('link').first().click();
    await expect(page).toHaveURL(URLS.home);
});

test('home link in header', async ({ page }) => {
    await ELEMENTS.getNavigation(page).getByRole('link', { name: 'INÍCIO' }).click();
    await expect(page).toHaveURL(URLS.home);
});

test('animais link in header', async ({ page }) => {
    await ELEMENTS.getNavigation(page).getByRole('link', { name: 'ANIMAIS' }).click();
    await expect(page).toHaveURL(URLS.pets);
});

/* test('associações link in header', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'ASSOCIAÇÕES' }).click();
    await expect(page).toHaveURL('https://furcode.vercel.app/shelter');
}); */

test('doações link in header', async ({ page }) => {
    await ELEMENTS.getNavigation(page).getByRole('link', { name: 'DOAÇÕES' }).click();
    await expect(page).toHaveURL(URLS.donate);
});

test('login link in header', async ({ page }) => {
    await ELEMENTS.getNavigation(page).getByRole('link', { name: 'ENTRAR' }).click();
    await expect(page).toHaveURL(URLS.userLogin);
});

///////////////////////////////// Main content links /////////////////////////////////

/* test('donate link in first section', async ({ page }) => {
    await page.getByRole('link', { name: 'Donate' }).click();
    await expect(page).toHaveURL('https://furcode.vercel.app/donation');
}); */

// TODO: Paralell test
/* test('what we do link in first section', async ({ page }) => {
    await page.getByRole('link', { name: 'Pets' }).click({ timeout: 30000 });
    await expect(page).toHaveURL('https://furcode.vercel.app/pets');
});

test('volunteers link in main content', async ({ page }) => {
    await page.getByRole('link', { name: 'Help' }).click({ timeout: 30000 });
    await expect(page).toHaveURL('https://furcode.vercel.app/wannaHelp');
}); */

///////////////////////////////// Footer links /////////////////////////////////

test('facebook link in footer', async ({ page }) => {
    await page.locator('.footer-social-icons > ul > li > a').first().click();
    await expect(page).toHaveURL('https://www.facebook.com/Meta');
});

test('instagram link in footer', async ({ page }) => {
    await page.locator('.footer-social-icons > ul > li:nth-child(2) > a').click();
    await expect(page).toHaveURL('https://www.instagram.com/meta/');
});

test('whatsapp link in footer', async ({ page }) => {
    await page.locator('.footer-social-icons > ul > li:nth-child(3) > a').click();
    await expect(page).toHaveURL('https://www.whatsapp.com/');
});

test('X link in footer', async ({ page }) => {
    await page.locator('.footer-social-icons > ul > li:nth-child(4) > a').click();
    await expect(page).toHaveURL('https://x.com/Meta');
});

test('mindera link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'mindera icon' }).click();
    await expect(page).toHaveURL('https://mindera.com/');
});

test('github link in footer', async ({ page }) => {
    await page.locator('li:nth-child(6) > a').first().click();
    await expect(page).toHaveURL('https://github.com/rui-tx/furcode');
});

test('sobre PetHub link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'Sobre PetHub' }).click();
    await expect(page).toHaveURL(URLS.about);
});

/* test('ajude a ajudar link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'Ajude a Ajudar' }).click();
    await expect(page).toHaveURL('https://furcode.vercel.app/wannaHelp');
}); */

test('política de privacidade link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'Política de Privacidade' }).click();
    await expect(page).toHaveURL(URLS.privacy);
});

test('termos e condições link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'Termos e Condições' }).click();
    await expect(page).toHaveURL(URLS.terms);
});

/* test('registe a sua associação link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'Registe a sua Associação' }).click();
    await expect(page).toHaveURL('https://furcode.vercel.app/shelterRegister');
}); */

test('política de cookies link in footer', async ({ page }) => {
    await page.getByRole('link', { name: 'Política de Cookies' }).click();
    await expect(page).toHaveURL(URLS.cookie);
});
