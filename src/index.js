import CSSselect from 'css-select';
import ReactDom from 'react-dom/server';
import { calculate as computeSpecificity } from 'specificity';
import css from 'css';
import { parseDOM as makeDom } from 'htmlparser2';
import merge from 'lodash.merge';
import orderBy from 'lodash.orderby';

export default function grumpkin(element, stylesheet) {
  const elementMarkup = ReactDom.renderToString(element);
  const dom = makeDom(elementMarkup)[0];
  const parsedCss = css.parse(stylesheet);

  const CSSrules = parsedCss.stylesheet.rules.map((rule) => {
    const score = parseInt(
      computeSpecificity(rule.selectors[0])[0].specificity.split(',').join(''),
      10
    );
    return {
      selector: rule.selectors[0],
      properties: rule.declarations
        .reduce((result, declaration) => {
          result[declaration.property] = declaration.value;
          return result;
        }, {}),
      specificity: score,
    };
  });

  const sortedCSSrules = orderBy(CSSrules, [ 'specificity' ], [ 'asc' ]);
  const matchingRules = sortedCSSrules.filter((rule) => CSSselect.is(dom, rule.selector));
  return Reflect.apply(
    merge,
    null,
    matchingRules.map((matchingRule) => matchingRule.properties)
  );
}
