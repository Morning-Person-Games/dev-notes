import React, { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  SelectionState,
} from "draft-js";
import "./rich-editor.css";
import "draft-js/dist/Draft.css";
import {
  MdFormatItalic,
  MdFormatQuote,
  MdCode,
  MdList,
  MdFormatListNumbered,
  MdFormatBold,
  MdFormatUnderlined,
  MdImage,
} from "react-icons/md";
import ImageEntry from "./ImageEntry";
import Thumbnail from "../displays/Thumbnail";

export default class SolutionEntry extends Component {
  constructor(props) {
    super(props);
    this.focus = () => React.createRef();
    this.onChange = (editorState) =>
      this.props.onChange("editorState", editorState);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.openImageUpload = this.openImageUpload.bind(this);
  }
  _handleKeyCommand(command) {
    const editorState = this.props.editorState;
    let startKey = editorState.getSelection().getStartKey();
    let selectedBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(startKey)
      .getType();
    if (selectedBlockType === "atomic") {
      return true;
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  keyBindingFn = (event) => {
    const shiftTabEvent = event.shiftKey && event.key === "Tab";
    const tabEvent = event.key === "Tab";
    if (shiftTabEvent || tabEvent) {
      event.preventDefault();
      const editorState = this.props.editorState;
      let newEditorState;
      let newContentState;
      let startKey = editorState.getSelection().getStartKey();
      let selectedBlockType = editorState
        .getCurrentContent()
        .getBlockForKey(startKey)
        .getType();
      if (
        selectedBlockType === "unordered-list-item" ||
        selectedBlockType === "ordered-list-item"
      ) {
        newEditorState = RichUtils.onTab(event, editorState, 4);
      } else {
        const plainText = editorState.getCurrentContent().getPlainText();
        if (shiftTabEvent) {
          if (/^(\s)/.test(plainText)) {
            let targetRange;
            let offset =
              plainText.length > 1 && /^(\s)/.test(plainText.charAt(1)) ? 2 : 1;
            targetRange = new SelectionState({
              anchorKey: startKey,
              anchorOffset: 0,
              focusKey: startKey,
              focusOffset: offset,
            });
            newContentState = Modifier.removeRange(
              editorState.getCurrentContent(),
              targetRange,
              "backward"
            );
            newEditorState = EditorState.push(
              editorState,
              newContentState,
              "remove-range"
            );
          } else {
            return;
          }
        } else {
          const tabCharacter = "  ";
          newContentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            tabCharacter
          );
          newEditorState = EditorState.push(
            editorState,
            newContentState,
            "insert-characters"
          );
        }
      }
      if (newEditorState !== editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(event);
  };

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  }

  openImageUpload() {
    this.props.createModal(
      "Upload Image",
      <ImageEntry
        editorState={this.props.editorState}
        changeEditorState={this.onChange}
        createModal={this.props.createModal}
      />
    );
  }

  render() {
    if (!this.props) {
      return;
    }
    const { editorState } = this.props;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div>
        <div className="RichEditor-root">
          <div className="RichEditor-controls">
            <TextStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
            <span className="separator" />
            <button type="button" onClick={this.openImageUpload}>
              <MdImage />
            </button>
          </div>
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              blockRendererFn={mediaBlockRenderer}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              keyBindingFn={this.keyBindingFn}
              ref={this.focus}
              spellCheck={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function mediaBlockRenderer(block) {
  if (block.getType() === "atomic") {
    return {
      component: Thumbnail,
      editable: false,
      props: {
        inEditor: true,
      },
    };
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const TEXT_TYPES = [
  {
    label: "Normal",
    style: "unstyled",
  },
  {
    label: "H1",
    style: "header-one",
  },
  {
    label: "H2",
    style: "header-two",
  },
  {
    label: "H3",
    style: "header-three",
  },
  {
    label: "H4",
    style: "header-four",
  },
  {
    label: "H5",
    style: "header-five",
  },
  {
    label: "H6",
    style: "header-six",
  },
];
const BLOCK_TYPES = [
  {
    label: <MdFormatQuote />,
    style: "blockquote",
  },
  {
    label: <MdList />,
    style: "unordered-list-item",
  },
  {
    label: <MdFormatListNumbered />,
    style: "ordered-list-item",
  },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <span>
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      <span className="separator" />
    </span>
  );
};

const TextStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <span>
      {TEXT_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      <span className="separator" />
    </span>
  );
};

const INLINE_STYLES = [
  {
    label: <MdFormatBold />,
    style: "BOLD",
  },
  {
    label: <MdFormatItalic />,
    style: "ITALIC",
  },
  {
    label: <MdFormatUnderlined />,
    style: "UNDERLINE",
  },
  {
    label: <MdCode />,
    style: "CODE",
  },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <span>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.style}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      <span className="separator" />
    </span>
  );
};
