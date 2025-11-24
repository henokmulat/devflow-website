"use client";
import { basicDark } from "cm6-theme-basic-dark";

import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  defaultCodeBlockLanguage$,
  codeMirrorPlugin,
  diffSourcePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./dark-editor.css";
import { useTheme } from "next-themes";
import { resolve } from "path";

interface Props {
  value: string;
  fieldChange: (value: string) => void;
  editorRef: ForwardedRef<MDXEditorMethods> | null;
}

const Editor = ({ value, editorRef, fieldChange, ...props }: Props) => {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? [basicDark] : [];
  return (
    <MDXEditor
      key={resolvedTheme}
      markdown={value}
      ref={editorRef}
      onChange={fieldChange}
      className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        imagePlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            css: "css",
            txt: "text",
            sql: "sql",
            js: "javascript",
            html: "html",
            saas: "sass",
            scss: "scss",
            bash: "bash",
            json: "json",
            ts: "typescript",
            "": "unspecified",
            jsx: "javascript (React)",
            tsx: "typescript (React)",
          },
          autoLoadLanguageSupport: true,
          codeMirrorExtensions: theme,
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),

        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: (editor) => editor?.editorType === "codeblock",
                  contents: () => <ChangeCodeMirrorLanguage />,
                },
                {
                  fallback: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <CreateLink />
                      <InsertImage />
                      <Separator />
                      <InsertTable />
                      <InsertThematicBreak />
                      <InsertCodeBlock />
                      <Separator />
                    </>
                  ),
                },
              ]}
            />
          ),
        }),
      ]}
      {...props}
    />
  );
};
export default Editor;
