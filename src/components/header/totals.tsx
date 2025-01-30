import { useCallback, useMemo } from "react";
import { IDay, Item, IUserMeasurements } from "../../types";
import { useSelectedDayStore } from "../../store/selectedDayStore";

type TotalsProps = { userMeasurements: IUserMeasurements; day: IDay };

export default function Totals({ userMeasurements, day }: TotalsProps) {
  const { selectedDay } = useSelectedDayStore();

  const calculateTotalCalories = useCallback(
    (productsToEat: { product: Item; weight: string }[]) => {
      return productsToEat.reduce((total, item) => {
        const calories =
          (Number(item.weight) / 100) * Number(item.product.calories);
        return total + calories;
      }, 0);
    },
    []
  );

  const totalCalories = useMemo(
    () =>
      calculateTotalCalories(
        day.productsToEat.filter((el) => el.day === selectedDay)
      ),
    [day.productsToEat, selectedDay, calculateTotalCalories]
  );

  const target = useMemo(
    () =>
      88 +
      13 * Number(userMeasurements.weight) +
      4.2 * 178 -
      5.7 * Number(userMeasurements.age),
    [userMeasurements.weight, userMeasurements.age]
  );

  const remainingCalories = useMemo(
    () => Math.round(target - totalCalories),
    [target, totalCalories]
  );

  return (
    <div className="mt-2 px-1 flex justify-between items-center">
      <p className="">
        {`${totalCalories.toFixed(0)} / ${target.toFixed(0)}`} ккал
      </p>
      <p className="">
        {remainingCalories > 0 ? "Осталось " : "Превышено "}
        <span
          className={`font-medium text-lg ${
            remainingCalories < 0 && "text-red-500"
          }`}
        >
          {remainingCalories}
        </span>
      </p>
    </div>
  );
}
