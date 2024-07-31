const nunjucks = require('nunjucks');
const { expect } = require('@jest/globals');

describe('vehicleLookupManualQuestion macro', () => {
  let env;

  beforeAll(() => {
    env = nunjucks.configure('path/to/your/templates', { autoescape: true });
  });

  test('non-interactive elements do not receive keyboard focus', () => {
    const config = {}; // Задайте необходимую конфигурацию для рендеринга макроса
    const rendered = env.renderString(`{% import "macro.njk" as macros %}{{ macros.vehicleLookupManualQuestion(config) }}`);

    // Проверьте, что у элементов под заголовком "We found this car" нет tabindex="0"
    // и добавлен tabindex="-1" для нужных элементов.
    const parser = new DOMParser();
    const doc = parser.parseFromString(rendered, 'text/html');

    const highlightedContent = doc.querySelector('.highlighted-content');
    expect(highlightedContent).not.toHaveAttribute('tabindex', '0');
    expect(highlightedContent).toHaveAttribute('tabindex', '-1');
  });
});
