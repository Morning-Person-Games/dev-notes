/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import gfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
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
  BsFullscreen,
  BsFullscreenExit,
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
  commands.divider,
  commands.fullscreen,
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
commands.fullscreen.icon = <BsFullscreen />;

commands.fullscreen.execute = function execute(
  state,
  api,
  dispatch,
  executeCommandState
) {
  api.textArea.focus();
  if (api.textArea.form[14]) {
    const classN = api.textArea.form[14].className;
    // awful way of toggling but here we are:
    if (classN === "full") {
      commands.fullscreen.buttonProps = { className: "" };
      commands.fullscreen.icon = <BsFullscreen />;
    } else {
      commands.fullscreen.buttonProps = { className: "full" };
      commands.fullscreen.icon = <BsFullscreenExit />;
    }
  }
  if (dispatch && executeCommandState && executeCommandState.fullscreen) {
    dispatch({
      fullscreen: false,
    });
  }
};

//styling
const editor = (theme) => css`
  --color-canvas-default: ${theme.colors.secondary};
  --color-border-default: transparent;
  --color-fg-default: ${theme.colors.white};
  --color-accent-fg: ${theme.colors.link};
  --color-neutral-muted: ${theme.colors.secondary};
  width: 100%;
  border-radius: 0;
  border: 0;
  font-size: 1rem;
  font-family: inherit;
  div {
    --color-border-default: ${theme.colors.primary};
  }
  .wmde-markdown {
    --color-canvas-default: ${theme.colors.shadow};
    --color-border-default: transparent;
    --color-accent-fg: ${theme.colors.link};
    --color-neutral-muted: ${theme.colors.secondary};
    border-radius: 0;
  }
  .w-md-editor-input {
    ${mixins.transition("background-color", 150)};
    border-radius: 0;
    &:hover {
      background-color: ${theme.colors.fieldHover};
    }
    &:hover:focus-within {
      background-color: ${theme.colors.secondary};
    }
  }
  .w-md-editor-show-edit {
    .w-md-editor-toolbar-divider {
      background-color: ${theme.colors.secondary};
    }
  }
  .w-md-editor-toolbar {
    padding: 7px 5px 5px 10px;
    border-radius: 0;
    border: 0;
    background-color: ${theme.colors.primary};
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
        color: ${theme.colors.placeholder};
        background-color: transparent;
        &:hover {
          cursor: default;
          background-color: transparent;
        }
      }
    }
    .w-md-editor-toolbar-divider {
      background-color: ${theme.colors.inactiveColor};
      margin-top: -1px !important;
    }
    ul:last-child {
      display: none;
      margin-bottom: 2px;
      button {
        padding: 0 3px;
        margin: 0;
        background-color: transparent;
        color: ${theme.colors.white};
        &:hover {
          background-color: transparent;
          color: ${theme.colors.link};
        }
      }
      li {
        &.active {
          button {
            color: ${theme.colors.linkHover};
            background-color: transparent;
            &:hover {
              background-color: transparent;
            }
          }
        }
        &:last-child {
          button {
            font-size: ${staticSizes.font.sm};
            color: ${theme.colors.white};
            &:hover {
              color: ${theme.colors.link};
            }
            svg {
              font-size: ${staticSizes.font.xl};
            }
          }
          &.active {
            button {
              background-color: transparent;
              color: ${theme.colors.white};
              &:hover {
                color: ${theme.colors.link};
              }
            }
          }
        }
      }

      @media screen and (min-width: ${theme.sizes.screenMd}) {
        display: block;
      }
    }
  }
  textarea,
  pre {
    border: 0;
    &::placeholder {
      color: ${theme.colors.placeholder};
    }
  }
  .w-md-editor-text {
    padding-left: 12px;
  }
`;

function SolutionMd(props) {
  const { type, name, handleChange, handleBlur, value } = props;
  const theme = useTheme();
  const mainHeight = theme.sizes.baseFontSize * 1.5 * 8;
  const toolbarHeight = theme.sizes.baseFontSize * 2;
  return (
    <MDEditor
      css={(theme) => editor(theme)}
      preview={"edit"}
      visibleDragbar={false}
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
    />
  );
}

export default SolutionMd;
