import { test, expect } from '@playwright/test';
import { URLS, ELEMENTS } from '../Constants';

test.beforeEach(async ({ page }) => {
    await page.goto(URLS.userLogin);
});

test('login form validation messages', async ({ page }) => {
    const formContainer = page.locator('form');

    await formContainer.getByRole('button', { name: 'Entrar' }).click();

    const emailField = formContainer.getByPlaceholder('Email');
    await expect(emailField).toBeVisible();
    await expect(emailField).toHaveAttribute('required', '');

    await emailField.fill('email@exemplo.com');
    await formContainer.getByRole('button', { name: 'Entrar' }).click();

    const passwordField = formContainer.getByPlaceholder('Password');
    await expect(passwordField).toBeVisible();
    await expect(passwordField).toHaveAttribute('required', '');
});

test('login with non-existent account', async ({ page }) => {
    const formContainer = page.locator('form');

    await formContainer.getByPlaceholder('Email').fill('test@test.com');
    await formContainer.getByPlaceholder('Password').fill('123456');
    await formContainer.getByRole('button', { name: 'Entrar' }).click();

    const errorMessage = page.getByText('An unexpected error occurred');
    await expect(errorMessage).toBeVisible();
});
