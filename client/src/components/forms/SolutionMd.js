import React from "react";
import { useTheme } from "@emotion/react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import gfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import styled from "@emotion/styled";
import { mixins, staticSizes } from "../../styles/globalStyles";
import {
  BsTypeH2,
  BsTypeH3,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCodeSlash,
  BsCodeSquare,
  BsListUl,
  BsListOl,
  BsArrowsExpand,
} from "react-icons/bs";

const commandList = [
  // Custom Toolbars
  commands.title2,
  commands.title3,
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.code,
  commands.codeBlock,
  commands.unorderedListCommand,
  commands.orderedListCommand,
];
const extraCommands = [
  commands.codeEdit,
  commands.divider,
  commands.codeLive,
  commands.divider,
  commands.codePreview,
  // commands.divider,
  // commands.fullscreen,
];

//icons and size adjustments
commands.title2.icon = <BsTypeH2 />;
commands.title3.icon = <BsTypeH3 />;
commands.bold.icon = <BsTypeBold />;
commands.italic.icon = <BsTypeItalic />;
commands.strikethrough.icon = <BsTypeStrikethrough />;
commands.code.icon = <BsCodeSlash />;
commands.codeBlock.icon = <BsCodeSquare />;
commands.unorderedListCommand.icon = <BsListUl />;
commands.orderedListCommand.icon = <BsListOl />;
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
  background-color: ${(props) => props.theme.colors.secondary};
  width: 100%;
  border-radius: 0;
  border: 0;
  font-size: 1rem;
  font-family: inherit;
  padding-bottom: 10px;
  border-top: 2px solid ${(props) => props.theme.colors.primary};
  ${mixins.transition("background-color", 200)};
  border-radius: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.fieldHover};
  }
  &:hover:focus-within {
    background-color: ${(props) => props.theme.colors.secondary};
  }
  div {
    --color-border-default: ${(props) => props.theme.colors.primary};
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
    margin: 5px;
    border-radius: 3.5px;
    border: 0;
    background-color: ${(props) => props.theme.colors.primary};
    svg {
      font-size: ${staticSizes.font.h3n}rem;
      margin-bottom: -4px;
    }
    button {
      font-weight: 600;
      ${mixins.transition()};
      font-size: ${staticSizes.font.h5n}rem;
      padding: 0 3px;
      height: auto;
      line-height: inherit;
      &:hover {
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
        background-color: transparent;
        color: ${(props) => props.theme.colors.white};
        &:hover {
          background-color: transparent;
          color: ${(props) => props.theme.colors.link};
        }
      }
      li {
        &.active button {
          cursor: pointer;
          color: ${(props) => props.theme.colors.linkHover};
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
    margin-top: -25px;
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
  color: ${(props) => props.theme.colors.placeholder};
  font-size: ${staticSizes.font.lg};
  right: 3px;
  bottom: 4px;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;
// #endregion

function SolutionMd(props) {
  const { type, name, handleChange, handleBlur, value, defaultTabEnable } =
    props;
  const theme = useTheme();
  const mainHeight = theme.sizes.baseFontSize * 1.5 * 7;
  const toolbarHeight = theme.sizes.baseFontSize * 2;

  return (
    <Wrapper>
      <Editor
        preview={"edit"}
        visibleDragbar={true}
        height={mainHeight}
        onChange={handleChange}
        toolbarHeight={toolbarHeight}
        textareaProps={{
          id: "SolutionEditor",
          placeholder: "Describe a solution to the topic...",
          onChange: handleChange,
          onBlur: handleBlur,
          type: type,
          name: name,
          tabIndex: "3",
        }}
        value={value}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[gfm]],
        }}
        commands={commandList}
        extraCommands={extraCommands}
        defaultTabEnable={defaultTabEnable}
      />
      <ExpandIcon />
    </Wrapper>
  );
}

export default SolutionMd;
