import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import {
  Bold,
  Italic,
  Heading,
  UnOrderedList,
  OrderedList,
  Blockquote,
  HTML,
  URL,
  Image,
  YouTube,
  Preview,
  Edit,
} from './icons';

export default class ReactMDE extends React.Component {
  static defaultProps = {
    textAreaStyle: {},
    buttonStyle: {},
    buttonContainerStyle: {},
    iconSize: 15,
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
    },
  }
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    textAreaStyle: PropTypes.shape(),
    buttonStyle: PropTypes.shape(),
    buttonContainerStyle: PropTypes.shape(),
    iconSize: PropTypes.number,
    input: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      preview: false,
    };
  }

  setCaretPosition = (caretPos) => {
    const { textArea } = this;

    if (textArea !== null) {
      if (textArea.createTextRange) {
        const range = textArea.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else if (textArea.selectionStart) {
        textArea.focus();
        textArea.setSelectionRange(caretPos, caretPos);
      } else {
        textArea.focus();
      }
    }
  }

  getSelection = (value) => {
    const { selectionStart, selectionEnd } = this.textArea;
    const cursorIndexStart = selectionStart;
    const cursorIndexEnd = selectionEnd;
    const selection = value.substring(cursorIndexStart, cursorIndexEnd);

    return {
      cursorIndexStart,
      cursorIndexEnd,
      selection,
    };
  }

  insertAtCursor = (e, markdownLeftOrLR, right, _selection, markdownRight, cursorPosOffset) => {
    if (e) {
      e.preventDefault();
    }
    const { input } = this.props;
    let { value } = input;

    const selectionProps = this.getSelection(value);
    const cursorIndexStart = selectionProps.cursorIndexStart;
    const cursorIndexEnd = selectionProps.cursorIndexEnd;
    const selection = _selection || selectionProps.selection;

    value = `${value.substring(0, cursorIndexStart)
    }${markdownLeftOrLR}${selection.length > 0 ? selection : ''}${right ? markdownRight || markdownLeftOrLR : ''}${
      value.substring(cursorIndexEnd, value.length)}`;

    input.onChange(value);

    if (selection.length === 0) {
      setTimeout(() => {
        this.setCaretPosition(
          cursorIndexStart + markdownRight ?
            cursorIndexEnd + cursorPosOffset : markdownLeftOrLR.length,
        );
      }, 0);
    }
  }

  handleList = (e, ordered) => {
    e.preventDefault();
    const { value } = this.props;
    const list = this.getSelection(value).selection.split(/\r?\n/);
    let newList = [];

    for (let i = 0; i < list.length; i + 1) {
      if (list[i].length > 0) {
        newList.push(`${ordered ? `${i + 1}.` : '-'} ${list[i]}`);
      }
    }

    newList = newList.join('\n');

    this.insertAtCursor(null, '', false, newList);
  }

  handleYoutube = (e) => {
    e.preventDefault();
    const url = prompt('Enter a YouTube URL.');
    const videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId === null) {
      return;
    }
    this.insertAtCursor(null, `[![](https://img.youtube.com/vi/${videoId[1]}/0.jpg)](https://www.youtube.com/watch?v=${videoId[1]}`, true, null, ')', 4);
  }

  handleTogglePreview = (e) => {
    e.preventDefault();
    this.setState({ preview: !this.state.preview });
  }

  render() {
    const p = this.props;
    const { preview } = this.state;
    const {
      iconSize,
      buttonConfig: {
        bold,
        italic,
        heading,
        orderedList,
        unorderedList,
        blockQuote,
        html,
        url,
        image,
        youtube,
        canPreview,
      },
      meta: { touched, error, warning },
      input,
    } = p;

    const textAreaStyle = Object.assign({}, {
      width: '100%',
      outline: '0',
      border: '1px solid #cccccc',
      height: '500px',
      padding: '4px 8px',
    }, p.textAreaStyle);

    const buttonStyle = Object.assign({}, {
      outline: '0',
      border: '1px solid #cccccc',
      margin: '0px 2px',
      padding: '4px 8px',
      cursor: 'pointer',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      marginLeft: '4px',
      lineHeight: '1',
    }, p.buttonStyle);

    const buttonContainerStyle = Object.assign({}, {
      marginLeft: '-4px',
      marginBottom: '4px',
    }, p.buttonContainerStyle);

    return (
      <div>
        <div style={buttonContainerStyle}>
          {bold &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '**', true)}
            >
              <Bold size={iconSize} />
            </button>
          }
          {italic &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '_', true)}
            >
              <Italic size={iconSize} />
            </button>
          }
          {heading &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '### ', false)}
            >
              <Heading size={iconSize} />
            </button>
          }
          {unorderedList &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.handleList(e, false)}
            >
              <UnOrderedList size={iconSize} />
            </button>
          }
          {orderedList &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.handleList(e, true)}
            >
              <OrderedList size={iconSize} />
            </button>
          }
          {blockQuote &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '<blockquote>', true, null, '</blockquote>', 12)}
            >
              <Blockquote size={iconSize} />
            </button>
          }
          {html &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '```', true, null, '```', 3)}
            >
              <HTML size={iconSize} />
            </button>
          }
          {url &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '[', true, null, ']()', 3)}
            >
              <URL size={iconSize} />
            </button>
          }
          {image &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={e => this.insertAtCursor(e, '![](', true, null, ')', 4)}
            >
              <Image size={iconSize} />
            </button>
          }
          {youtube &&
            <button
              disabled={preview}
              style={buttonStyle}
              onClick={this.handleYoutube}
            >
              <YouTube size={iconSize} />
            </button>
          }
          {canPreview &&
            <button
              style={buttonStyle}
              onClick={this.handleTogglePreview}
            >
              {preview && <Edit size={iconSize} />}
              {!preview && <Preview size={iconSize} />}
              <span style={{ marginLeft: '6px' }}>
                {preview ? 'Editor' : 'Preview'}
              </span>
            </button>
          }
        </div>

        <div>
          {preview &&
            <ReactMarkdown
              source={input.value}
              escapeHtml={!html}
            />
          }

          {!preview &&
            <textarea
              ref={t => this.textArea = t} // eslint-disable-line
              style={textAreaStyle}
              placeholder={`Use Markdown ${html ? 'or HTML ' : ''}for formatting...`}
              {...input}
            />
          }
        </div>
        <span>
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </span>
      </div>
    );
  }
}
