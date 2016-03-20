[![Travis](https://img.shields.io/travis/gcedo/grumpkin.svg)]()
[![David](https://img.shields.io/david/gcedo/grumpkin.svg)]()
[![David](https://img.shields.io/david/dev/gcedo/grumpkin.svg)]()
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/gcedo/grumpkin/master/LICENSE)
# grumpkin
grumpkin computes the CSS properties applied to a React component, given a CSS file.

## Installation
`npm install grumpkin`

## Usage
```css
/* test/style.css */
div { cursor: pointer; }

div.foo {
  width: 46px;
  color: #fff;
}

.foo {
  width: 100px;
  height: 300px;
}

#bar { height: 50px; }
```

```javascript
describe('grumpkin', () => {
  let stylesheet = null;
  before((done) => {
    fileSystem.readFile('./test/style.css', 'utf8', (exception, readData) => {
      stylesheet = readData;
      done();
    });
  });

  it('simple render', () => {
    const element = <div className="foo" id="bar">Hello World!</div>;
    const computedStyle = grumpkin(element, stylesheet);
    computedStyle.should.have.property('width').and.equal('46px');
    computedStyle.should.have.property('height').and.equal('50px');
    computedStyle.should.have.property('color').and.equal('#fff');
    computedStyle.should.have.property('cursor').and.equal('pointer');
  });
});
```
