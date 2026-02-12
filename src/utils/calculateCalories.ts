export const calculateCalories = (
  weight: string,
  calories: string | undefined
) => {
  return ((Number(weight) / 100) * Number(calories)).toFixed(0);
};
