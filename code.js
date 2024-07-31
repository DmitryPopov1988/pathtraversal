const nunjucks = require('nunjucks');
const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');

describe('vehicleLookupManualQuestion macro', () => {
  let env;

  beforeAll(() => {
    env = nunjucks.configure('path/to/your/templates', { autoescape: true });
  });

  test('non-interactive elements do not receive keyboard focus', () => {
    const config = {}; // Задайте необходимую конфигурацию для рендеринга макроса
    const rendered = env.renderString(`{% import "macro.njk" as macros %}{{ macros.vehicleLookupManualQuestion(config) }}`);

    const dom = new JSDOM(rendered);
    const document = dom.window.document;

    const highlightedContent = document.querySelector('.highlighted-content');
    expect(highlightedContent).not.toHaveAttribute('tabindex', '0');
    expect(highlightedContent).toHaveAttribute('tabindex', '-1');
  });

  test('dropdowns have the required attribute', () => {
    const config = {}; // Задайте необходимую конфигурацию для рендеринга макроса
    const rendered = env.renderString(`{% import "macro.njk" as macros %}{{ macros.vehicleLookupManualQuestion(config) }}`);

    const dom = new JSDOM(rendered);
    const document = dom.window.document;

    const dropdowns = document.querySelectorAll('select');
    dropdowns.forEach(dropdown => {
      expect(dropdown.hasAttribute('required')).toBe(true);
    });
  });

  test('error messages are displayed when there are errors', () => {
    const errors = {
      carManufacturer: { msg: 'Please select a manufacturer.' },
      carModel: { msg: 'Please select a model.' }
    };
    const config = { errors }; // Передаем ошибки в конфигурацию
    const rendered = env.renderString(`{% import "macro.njk" as macros %}{{ macros.vehicleLookupManualQuestion(config) }}`);

    const dom = new JSDOM(rendered);
    const document = dom.window.document;

    const manufacturerError = document.querySelector('#carManufacturer-error');
    const modelError = document.querySelector('#carModel-error');

    expect(manufacturerError).not.toBeNull();
    expect(manufacturerError.textContent).toBe(errors.carManufacturer.msg);

    expect(modelError).not.toBeNull();
    expect(modelError.textContent).toBe(errors.carModel.msg);
  });

  test('dropdowns have correct structure', () => {
    const config = {
      manufacturers: {
        topX: ['Brand1', 'Brand2'],
        result: ['Brand3', 'Brand4']
      },
      models: ['Model1', 'Model2']
    }; // Задайте необходимую конфигурацию для рендеринга макроса

    const rendered = env.renderString(`{% import "macro.njk" as macros %}{{ macros.vehicleLookupManualQuestion(config) }}`);

    const dom = new JSDOM(rendered);
    const document = dom.window.document;

    const manufacturerDropdown = document.querySelector('#manufacturer');
    const modelDropdown = document.querySelector('#model');

    expect(manufacturerDropdown).not.toBeNull();
    expect(manufacturerDropdown.querySelectorAll('option').length).toBe(5); // 1 disabled + 2 topX + 2 result

    expect(modelDropdown).not.toBeNull();
    expect(modelDropdown.querySelectorAll('option').length).toBe(3); // 1 disabled + 2 models
  });

  test('interactive elements correctly receive focus', () => {
    const config = {}; // Задайте необходимую конфигурацию для рендеринга макроса
    const rendered = env.renderString(`{% import "macro.njk" as macros %}{{ macros.vehicleLookupManualQuestion(config) }}`);

    const dom = new JSDOM(rendered);
    const document = dom.window.document;

    const interactiveElements = document.querySelectorAll('select, button, input');
    interactiveElements.forEach(element => {
      const tabIndex = element.getAttribute('tabindex');
      expect(tabIndex === null || tabIndex === '0' || tabIndex === '-1').toBe(true);
    });
  });
});
