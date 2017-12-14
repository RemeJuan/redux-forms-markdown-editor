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
    }
  }
  static propTypes = {
    value: PropTypes.string.isRequired,
    enableHTML: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    textAreaStyle: PropTypes.object,
    buttonStyle: PropTypes.object,
    buttonContainerStyle: PropTypes.object,
    iconSize: PropTypes.number,
  }

  constructor(props){
    super(props);

    this.state = {
      preview: false
    };
  }

  setCaretPosition = (caretPos) => {
    let { textarea } = this;

    if (textarea !== null) {
      if (textarea.createTextRange) {
        let range = textarea.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        if (textarea.selectionStart) {
          textarea.focus();
          textarea.setSelectionRange(caretPos, caretPos);
        } else {
          textarea.focus();
        }
      }
    }
  }

  getSelection = (value) => {
    const { text: { selectionStart, selectionEnd } } = this.refs;
    const cursorIndexStart = selectionStart;
    const cursorIndexEnd = selectionEnd;
    const selection = value.substring(cursorIndexStart, cursorIndexEnd);

    return {
      cursorIndexStart: cursorIndexStart,
      cursorIndexEnd: cursorIndexEnd,
      selection: selection
    };
  }

  insertAtCursor = (e, markdownLeftOrLR, right, _selection, markdownRight, cursorPosOffset) => {
    if (e) {
      e.preventDefault();
    }
    let {value} = this.props;
    let selectionProps = this.getSelection(value);
    let cursorIndexStart = selectionProps.cursorIndexStart;
    let cursorIndexEnd = selectionProps.cursorIndexEnd;
    let selection = _selection ? _selection : selectionProps.selection;

    value = value.substring(0, cursorIndexStart)
      + `${markdownLeftOrLR}${selection.length > 0 ? selection : ''}${right ? markdownRight ? markdownRight :  markdownLeftOrLR : ''}`
      + value.substring(cursorIndexEnd, value.length);

    this.props.onChange(value);

    if (selection.length === 0) {
      setTimeout(()=>{
        this.setCaretPosition(cursorIndexStart + markdownRight ? cursorIndexEnd + cursorPosOffset : markdownLeftOrLR.length);
      }, 0);
    }
  }

  handleList = (e, ordered) => {
    e.preventDefault();
    const { value } = this.props;
    const list = this.getSelection(value).selection.split(/\r?\n/);
    let newList = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].length > 0) {
        newList.push(`${ordered ? i + 1 + '.' : '-'} ${list[i]}`);
      }
    }

    newList = newList.join('\n');

    this.insertAtCursor(null, '', false, newList);
  }

  handleYoutube = (e) => {
    e.preventDefault();
    let url = prompt('Enter a YouTube URL.');
    let videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoId === null) {
      return;
    }
    this.insertAtCursor(null, `[![](https://img.youtube.com/vi/${videoId[1]}/0.jpg)](https://www.youtube.com/watch?v=${videoId[1]}`, true, null, ')', 4);
  }

  handleTogglePreview = (e) => {
    e.preventDefault();
    this.setState({preview: !this.state.preview});
  }

  handleTextChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const p = this.props;
    const s = this.state;
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
      }
    } = p;

    const textAreaStyle = Object.assign({}, {
      width: '100%',
      outline: '0',
      border: '1px solid #cccccc',
      height: '500px',
      padding: '4px 8px'
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
      lineHeight: '1'
    }, p.buttonStyle);

    const buttonContainerStyle = Object.assign({}, {
      marginLeft: '-4px',
      marginBottom: '4px'
    }, p.buttonContainerStyle);

    return (
      <div>
        <div style={buttonContainerStyle}>
          {bold &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '**', true)}>
              <Bold size={iconSize} />
            </button>
          }
          {italic &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '_', true)}>
              <Italic size={iconSize} />
            </button>
          }
          {heading &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '### ', false)}>
              <Heading size={iconSize}/>
            </button>
          }
          {unorderedList &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.handleList(e, false)}>
              <UnOrderedList size={iconSize} />
            </button>
          }
          {orderedList &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.handleList(e, true)}>
              <OrderedList size={iconSize} />
            </button>
          }
          {blockQuote &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '<blockquote>', true, null, '</blockquote>', 12)}>
              <Blockquote size={iconSize} />
            </button>
          }
          {html &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '```', true, null, '```', 3)}>
              <HTML size={iconSize} />
            </button>
          }
          {url &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '[', true, null, ']()', 3)}>
              <URL size={iconSize} />
            </button>
          }
          {image &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={(e) => this.insertAtCursor(e, '![](', true, null, ')', 4)}>
              <Image size={iconSize} />
            </button>
          }
          {youtube &&
            <button
              disabled={s.preview}
              style={buttonStyle}
              onClick={this.handleYoutube}>
              <YouTube size={iconSize} />
            </button>
          }
          {canPreview &&
            <button
              style={buttonStyle}
              onClick={this.handleTogglePreview}>
              {s.preview && <Edit size={iconSize} />}
              {!s.preview && <Preview size={iconSize} />}
              <span style={{ marginLeft: '6px' }}>
                {s.preview ? 'Editor' : 'Preview'}
              </span>
            </button>
          }
        </div>

        <div>
          {s.preview &&
            <ReactMarkdown
              source={p.value}
              escapeHtml={!p.enableHTML} />
          }

          {!s.preview &&
            <textarea
              ref={t => this.textArea = t}
              style={textAreaStyle}
              value={p.value}
              onChange={this.handleTextChange}
              placeholder={`Use Markdown ${p.enableHTML ? 'or HTML ' : ''}for formatting...`}
            />
          }
        </div>
      </div>
    );
  }
};
