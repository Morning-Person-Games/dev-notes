/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { theme } from "../../globalStyles";

function SolutionMd(props) {
  const { type, name, handleChange, handleBlur, value } = props;
  //styling
  const { colors } = theme;
  const editor = css`
    --color-canvas-default: ${colors.secondary};
    --color-border-default: transparent;
    --color-fg-default: ${colors.white};
    --color-accent-fg: ${colors.highlight};
    --color-neutral-muted: ${colors.primary};
    width: 100%;
    border-radius: 0;
    border: 0;

    div {
      --color-border-default: ${colors.primary};
    }
    .wmde-markdown {
      --color-canvas-default: ${colors.dark};
      --color-border-default: ${colors.secondary};
      --color-accent-fg: ${colors.highlight};
      --color-neutral-muted: ${colors.primary};
      border-radius: 0;
    }
    textarea,
    pre {
      border: 0;
      &::placeholder {
        color: ${colors.placeholder};
      }
    }
  `;

  const commandList = [
    // Custom Toolbars
    commands.title2,
    commands.title3,
    commands.bold,
    commands.italic,
    commands.strikethrough,
    commands.divider,
    commands.code,
    commands.codeBlock,
    commands.divider,
    commands.unorderedListCommand,
    commands.orderedListCommand,
  ];

  const extraCommands = [
    commands.codeEdit,
    commands.codePreview,
    commands.divider,
    commands.fullscreen,
  ];

  return (
    <MDEditor
      css={editor}
      preview={"edit"}
      minHeight={"6em"}
      textareaProps={{
        id: "SolutionEditor",
        placeholder: "Describe a solution to the topic...",
        onChange: handleChange,
        onBlur: handleBlur,
        type: type,
        name: name,
        tabIndex: "2",
      }}
      value={value}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
      commands={commandList}
      extraCommands={extraCommands}
    />
  );
}

export default SolutionMd;
