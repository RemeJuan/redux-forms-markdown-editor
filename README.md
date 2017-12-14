<!-- TITLE/ -->

<h1>React Markdown Editor</h1>

<!-- /TITLE -->


<!-- DESCRIPTION/ -->

Markdown editor built in react

<!-- /DESCRIPTION -->


<!-- BADGES/ -->

<span class="badge-nodeico"><a href="https://www.npmjs.com/package/react-mde" title="Nodei.co badge"><img src="https://nodei.co/npm/react-mde.png" alt="Nodei.co badge" /></a></span>
<br class="badge-separator" />
<span class="badge-travisci"><a href="http://travis-ci.org/RemeJuan/react-mde" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/RemeJuan/react-mde/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/react-mde" title="View this project on NPM"><img src="https://img.shields.io/npm/v/react-mde.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/react-mde" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/react-mde.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/RemeJuan/react-mde" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/RemeJuan/react-mde.svg" alt="Dependency Status" /></a></span>

<!-- /BADGES -->


## Instalation
```
yarn add react-mde

or

npm install react-mde
```

## Features

* Zero dependencies on other css frameworks or icon libraries.
* Supports React 16.
* Bold, italics, header, ordered/unordered lists, code block, link, image, and YouTube buttons.
* Quote block HTML button.
* Clicking an editor button with no text selected will position the cursor where you can start typing with formatted Markdown.
* Preview mode rendered with [react-markdown](https://github.com/rexxars/react-markdown).
* Configurable icon displays.

## Usage

```javascript
import ReactMDE from 'react-mde';

const Editor = ({ details, onChangeHandler }) => (
  <div>
    <ReactMDE
      value={details}
      onChange={onChangeHandler}
    />
  </div>
);
```

## Available Props

* `value` the initial value to pass to the Editor. **Required**
* `onChange` fired when input has changed **Required**
* `textAreaStyle` Text area styling **Optional**
* `buttonStyle` Styles for the buttons **Optional**
* `buttonContainerStyle` Styled for the buttons container **Optional**
* `iconSize` Define the size for all the Icons **Optional**
* `buttonConfig` An object to control which buttons to display **Optional**

### Button config keys
```javascript
buttonConfig: {
  bold: true,
  italic: true,
  heading: true,
  orderedList: true,
  unorderedList: true,
  blockQuote: true,
  html: true,
  url: true,
  image: true,
  youtube: true,
  canPreview: true,
}
```

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/RemeJuan/react-mde/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; 2017+ <a href="reme.lehane@gmail.com) (https://www.remelehane.me">Reme Le Hane</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->


## Credits

[jaszhix](https://github.com/jaszhix/react-markdown-editor-hybrid)

[react-markdown](https://github.com/rexxars/react-markdown)
