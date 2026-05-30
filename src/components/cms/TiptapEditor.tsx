"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import { useEffect, useCallback } from "react";

const lowlight = createLowlight();
lowlight.register({ javascript: js, typescript: ts, css, bash });

//Toolbar button
function ToolbarBtn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // prevent editor blur
        onClick();
      }}
      title={title}
      className={`rounded px-2 py-1 text-xs transition-colors ${
        active
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

//Editor component
export default function TiptapEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // replaced by CodeBlockLowlight
      }),
      Placeholder.configure({ placeholder: "Write your post here…" }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-5 py-4 text-sm text-gray-800 leading-relaxed outline-none prose prose-gray max-w-none prose-sm",
      },
    },
  });

  // Sync external value changes (e.g. when form resets)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL");
    if (url && editor) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const setLink = useCallback(() => {
    const prev = editor?.getAttributes("link").href ?? "";
    const url = window.prompt("URL", prev);
    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rounded-sm border border-gray-200 bg-white overflow-hidden focus-within:border-gray-400 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-100 bg-gray-50 px-2 py-1.5">
        {/* Text style */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <s>S</s>
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline code"
        >
          {"<>"}
        </ToolbarBtn>

        <span className="mx-1 h-4 w-px bg-gray-200" />

        {/* Headings */}
        {([1, 2, 3] as const).map((level) => (
          <ToolbarBtn
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            active={editor.isActive("heading", { level })}
            title={`Heading ${level}`}
          >
            H{level}
          </ToolbarBtn>
        ))}

        <span className="mx-1 h-4 w-px bg-gray-200" />

        {/* Lists */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          • List
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered list"
        >
          1. List
        </ToolbarBtn>

        <span className="mx-1 h-4 w-px bg-gray-200" />

        {/* Blocks */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          " "
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code block"
        >
          {"{ }"}
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
          active={false}
        >
          —
        </ToolbarBtn>

        <span className="mx-1 h-4 w-px bg-gray-200" />

        {/* Media / link */}
        <ToolbarBtn onClick={setLink} active={editor.isActive("link")} title="Link">
          Link
        </ToolbarBtn>
        <ToolbarBtn onClick={addImage} title="Image" active={false}>
          Img
        </ToolbarBtn>

        <span className="mx-1 h-4 w-px bg-gray-200" />

        {/* History */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
          active={false}
        >
          ↩
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
          active={false}
        >
          ↪
        </ToolbarBtn>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
}
