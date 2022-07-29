import React from "react";
import { useTheme } from "@emotion/react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import gfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import styled from "@emotion/styled";
import { mixins, staticSizes } from "../../styles/globalStyles";
import {
  BsTypeH3,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCodeSlash,
  BsCodeSquare,
  BsArrowsExpand,
  BsLink45Deg,
} from "react-icons/bs";

const commandList = [
  // Custom Toolbars
  commands.title3,
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.code,
  commands.codeBlock,
  commands.link,
];
const extraCommands = [
  commands.codeEdit,
  commands.divider,
  commands.codeLive,
  commands.divider,
  commands.codePreview,
];

//icons and size adjustments
commands.title3.icon = <BsTypeH3 />;
commands.bold.icon = <BsTypeBold />;
commands.italic.icon = <BsTypeItalic />;
commands.strikethrough.icon = <BsTypeStrikethrough />;
commands.code.icon = <BsCodeSlash />;
commands.link.icon = <BsLink45Deg />;
commands.codeBlock.icon = <BsCodeSquare />;
commands.codeEdit.icon = "Edit";
commands.codeLive.icon = "Compare";
commands.codePreview.icon = "Preview";

// #region styling
const EditorInit = ({ ...props }) => <MDEditor {...props} />;

const Editor = styled(EditorInit)`
  --color-canvas-default: ${(props) => props.theme.colors.secondary};
  --color-border-default: transparent;
  --color-fg-default: ${(props) => props.theme.colors.white};
  --color-accent-fg: ${(props) => props.theme.colors.link};
  --color-neutral-muted: ${(props) => props.theme.colors.secondary};
  width: 100%;
  border-radius: 0;
  border: 0;
  font-size: ${(props) => props.theme.sizes.baseFontSize}px;
  font-family: inherit;
  padding-bottom: 10px;
  border-top: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 0;
  background: none;
  div {
    --color-border-default: ${(props) => props.theme.colors.primary};
  }
  .w-md-editor-content {
    padding-right: 6px;
  }
  .wmde-markdown {
    --color-canvas-default: ${(props) => props.theme.colors.shadow};
    --color-border-default: transparent;
    --color-accent-fg: ${(props) => props.theme.colors.link};
    --color-neutral-muted: ${(props) => props.theme.colors.secondary};
    border-radius: 0;
  }
  .w-md-editor-show-edit {
    .w-md-editor-toolbar-divider {
      background-color: ${(props) => props.theme.colors.secondary};
    }
  }
  .w-md-editor-toolbar {
    li {
      font-size: 1em;
    }
    margin: 5px;
    border-radius: 3.5px;
    border: 0;
    background-color: ${(props) => props.theme.colors.primary};
    svg {
      font-size: 1.3rem;
      margin-bottom: -4px;
    }
    button {
      font-weight: 700;
      ${mixins.transition()};
      font-size: ${staticSizes.font.h5n}rem;
      padding: 0 3px;
      height: auto;
      line-height: inherit;
      background-color: transparent;
      color: ${(props) => props.theme.colors.link};
      &:hover {
        color: ${(props) => props.theme.colors.linkHover};
        background-color: transparent;
      }
    }
    .active {
      button {
        color: ${(props) => props.theme.colors.placeholder};
        background-color: transparent;
        &:hover {
          cursor: default;
          background-color: transparent;
        }
      }
    }
    .w-md-editor-toolbar-divider {
      background-color: ${(props) => props.theme.colors.inactiveColor};
      margin-top: -1px !important;
    }
    ul:last-child {
      display: none;
      margin-bottom: 2px;
      button {
        padding: 0 3px;
        margin: 0;
      }
      li {
        &.active button {
          cursor: pointer;
          color: ${(props) => props.theme.colors.highlight};
          background-color: transparent;
          &:hover {
            background-color: transparent;
          }
        }
      }
      @media screen and (min-width: ${(props) => props.theme.sizes.screenMd}) {
        display: block;
      }
    }
  }
  textarea,
  pre {
    border: 0;
    &::placeholder {
      color: ${(props) => props.theme.colors.placeholder};
    }
  }
  .w-md-editor-text {
    padding-top: 0;
    padding-left: 12px;
    font-size: ${staticSizes.font.h3n}rem;
    line-height: 1.5;
    .w-md-editor-text-pre,
    .w-md-editor-text-input,
    .w-md-editor-text > .w-md-editor-text-pre {
      font-size: ${staticSizes.font.h3n}rem;
    }
    .w-md-editor-text-pre > code {
      font-size: ${staticSizes.font.h3n}rem !important;
    }
  }
  .w-md-editor-bar {
    bottom: -37px;
    right: 9px;
    width: 25px;
    height: 25px;
    svg {
      color: transparent;
    }
  }
`;
const ExpandInit = ({ ...props }) => <BsArrowsExpand {...props} />;
const ExpandIcon = styled(ExpandInit)`
  position: absolute;
  color: ${(props) => props.theme.colors.link};
  font-size: 1.3em;
  right: 10px;
  bottom: -36px;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
// #endregion

function SolutionMd({
  type,
  name,
  defaultTabEnable,
  tabIndex,
  onChange,
  onBlur,
  placeholder,
  value,
  ...props
}) {
  const theme = useTheme();
  const mainHeight = theme.sizes.baseFontSize * 1.5 * 7;
  const toolbarHeight = theme.sizes.baseFontSize * 2;

  return (
    <Wrapper>
      <Editor
        preview={"edit"}
        visibleDragbar={true}
        height={mainHeight}
        onChange={onChange}
        toolbarHeight={toolbarHeight}
        textareaProps={{
          id: "SolutionEditor",
          placeholder: placeholder,
          onChange: onChange,
          onBlur: onBlur,
          type: type,
          name: name,
          tabIndex: tabIndex,
        }}
        value={value}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[gfm]],
        }}
        commands={commandList}
        extraCommands={extraCommands}
        defaultTabEnable={defaultTabEnable}
        {...props}
      />
      <ExpandIcon />
    </Wrapper>
  );
}

export default SolutionMd;
