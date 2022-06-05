import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Input } from "./input";
import { parse } from "./parser";
import { TrainingsTable } from "./trainings";
import { Training, Trainings } from "./types";
import { useSyncLocalStorage } from "./useSyncLocalStorage";

export const App = () => {
  const [currentTrainingInput, setCurrentTrainingInput] = useState<string>();
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const savedTrainings = localStorage.getItem("trainings");

  const [trainings, setTrainings] = useState<Trainings | undefined>(
    savedTrainings ? JSON.parse(savedTrainings) : undefined
  );

  const savedId = localStorage.getItem("id");
  const [id, setId] = useState(savedId ? parseInt(savedId) : 0);
  const currentTraining: Training = {
    date: new Date().toLocaleDateString(),
    exercises: parse(currentTrainingInput),
  };

  // sync id and trainings with local storage
  useSyncLocalStorage(id, trainings);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTrainingInput(event.currentTarget.value);
  };

  const handleAdd = (editId: number | undefined = undefined) => {
    if (currentTraining.exercises) {
      setTrainings((pastTrainings) => {
        return {
          ...pastTrainings,
          [editId ? `${editId}` : id]: currentTraining,
        };
      });
      !editId && setId((id) => ++id);
      setCurrentTrainingInput("");
    }

    editId && setEditId(undefined);
  };

  const handleEdit = (id: number) => {
    if (!trainings) {
      return;
    }

    let trainingInput: string = "";

    const exercises = trainings[id].exercises;
    const exercisesInput = exercises
      ? exercises.map(
          ({ exerciseName, weight, repetitions }) =>
            `${exerciseName ? exerciseName : ""} ${weight ? weight : ""} ${
              repetitions ? repetitions : ""
            }`
        )
      : [];

    exercisesInput.forEach((exercise) => {
      trainingInput += `${exercise}\n`;
    });

    setCurrentTrainingInput(trainingInput);
    setEditId(id);
  };

  const handleDelete = (id: number) => {
    if (!trainings) {
      return;
    }

    setTrainings(() => {
      delete trainings[id];
      return { ...trainings };
    });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Header />
        <br />
        <Input
          currentTrainingInput={currentTrainingInput}
          handleChange={handleChange}
          handleAdd={handleAdd}
          editId={editId}
          setEditId={setEditId}
          setCurrentTrainingInput={setCurrentTrainingInput}
        />
        {/* <br></br>
        <br></br>
         DEBUGG PARSER 
        <TrainingTable training={currentTraining} /> */}
      </div>
      <br />
      <br />
      <br />
      {trainings && (
        <TrainingsTable
          trainings={trainings}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
