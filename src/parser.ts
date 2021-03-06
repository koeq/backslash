import { Exercise } from "../db-handler/types";

// INPUT STRUCTURE  -->  Benchpress 90kg 8/8/8 92,2kg 8/8
export const parse = (
  currentInput: string | undefined
): Exercise[] | undefined => {
  if (!currentInput) {
    return;
  }

  const training: Exercise[] = [];
  let exerciseLines: string[] = [];

  if (currentInput.match(/\n/)) {
    exerciseLines = currentInput.split(/\n/);
  } else {
    exerciseLines.push(currentInput);
  }

  exerciseLines.forEach((line) => {
    // match every number of characters or signs from the start of the string, case insensitive and trim whitespace
    const exerciseNameMatch = line.match(
      /^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/a-z\s]+/i
    );

    const exerciseName = exerciseNameMatch && exerciseNameMatch[0].trim();

    // match one or more numbers optionally seperated by "," or "." and optionally with "kg" or "lbs"
    const weightMatches = line.match(/\d+((,|\.)\d+)?\s*(kg|lbs?)/g) || [];

    // match any number or number of digits seperated by a slash
    const repetitionsMatches = line.match(/\d+\/\d*(\/\d*)*/g) || [];

    weightMatches.forEach((weightMatch, index) => {
      const weight = weightMatch.replace(/\s/g, "");

      const repetitions = repetitionsMatches[index]?.trim();

      training.push({ exerciseName, weight, repetitions });
    });
  });

  return training;
};
