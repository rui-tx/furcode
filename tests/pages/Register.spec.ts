import { test, expect } from '@playwright/test';
import { URLS, ELEMENTS } from '../Constants';

test.beforeEach(async ({ page }) => {
    await page.goto(URLS.userRegister);
});

test('successful register', async ({ page }) => {
    const formContainer = page.locator('form');

    await formContainer.getByPlaceholder('Nome').fill('Teste');
    await formContainer.getByPlaceholder('Apelido').fill('Teste');
    await formContainer.getByPlaceholder('NIF').fill('1234567890');
    await formContainer.getByPlaceholder('Email').fill('teste@teste.com');
    await formContainer.getByPlaceholder('Password', { exact: true }).fill('Test12345678!');
    await formContainer.getByPlaceholder('Confirme sua password').fill('Test12345678!');
    await formContainer.getByPlaceholder('Morada 1').fill('Rua Teste');
    await formContainer.getByPlaceholder('Morada 2').fill('Casa Teste');
    await formContainer.getByPlaceholder('Código Postal').fill('12345678');
    await formContainer.getByPlaceholder('Telemóvel').fill('1234567890');

    await formContainer.getByRole('button', { name: 'Registar' }).click();

    //const successMessage = page.getByText('Registado com sucesso!');
    //await expect(successMessage).toBeVisible();

});
