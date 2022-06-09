import React from "react";
import { Mode } from "./types";

interface InputProps {
  readonly handleInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  readonly currentInput: string | undefined;
  readonly handleAdd: (editId: number | undefined) => void;
  readonly mode: Mode;
  readonly setMode: React.Dispatch<React.SetStateAction<Mode>>;
  readonly setCurrentInput: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  readonly editId: number | undefined;
  readonly setEditId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const Input = ({
  handleInputChange,
  currentInput,
  handleAdd,
  mode,
  setMode,
  setCurrentInput,
  editId,
  setEditId,
}: InputProps): JSX.Element => {
  const handleStopEdit = (
    setMode: React.Dispatch<React.SetStateAction<Mode>>,
    setEditId: React.Dispatch<React.SetStateAction<number | undefined>>
  ) => {
    setMode("add");
    setEditId(undefined);
    setCurrentInput("");
  };

  return (
    <>
      <textarea
        onChange={handleInputChange}
        value={currentInput}
        name="training"
        id="training"
        cols={30}
        rows={10}
      ></textarea>
      <br />

      <div style={{ display: "flex" }}>
        <button onClick={() => handleAdd(editId)}>{mode}</button>
        {mode === "edit" && (
          <button onClick={() => handleStopEdit(setMode, setEditId)}>
            stop edit
          </button>
        )}
      </div>
    </>
  );
};
