import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import { useDebouncedCallback } from "use-debounce";
import { BoldIcon, H1Icon, RedoIcon, UndoIcon } from "../ui/icons";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Toolbars() {
  const [_, setNote] = useLocalStorage(
    "note",
    `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`
  );
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  // const [isItalic, setIsItalic] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      // setIsItalic(selection.hasFormat("italic"));
    }
  }, []);

  const handleSave = useDebouncedCallback((content) => {
    // console.log(content);
    setNote(content);
  }, 500);

  useEffect(() => {
    mergeRegister(
      editor.registerUpdateListener(
        ({ editorState, dirtyElements, dirtyLeaves }) => {
          editorState.read(() => {
            $updateToolbar();
          });
          if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
            return;
          }
          handleSave(JSON.stringify(editorState));
        }
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, $updateToolbar]);

  const handleHeading = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode("h1"));
      }
    });
  };

  return (
    <div className="flex gap-4 pb-5 items-center">
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={`rounded-md p-1 ${isBold ? "bg-gray-200" : ""}`}
      >
        <BoldIcon />
      </button>
      <button onClick={handleHeading} className={`rounded-md`}>
        <H1Icon />
      </button>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced disabled:opacity-50"
        aria-label="Undo"
      >
        <UndoIcon />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced disabled:opacity-50"
        aria-label="Redo"
      >
        <RedoIcon />
      </button>
    </div>
  );
}
