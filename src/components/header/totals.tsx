import { IDay, Item, IUserMeasurements } from "../../types";

type TotalsProps = {
  userMeasurements: IUserMeasurements;
  day: IDay;
  selectedDay: number;
};

export default function Totals({
  userMeasurements,
  day,
  selectedDay,
}: TotalsProps) {
  // Расчет общего количества калорий для выбранного дня
  const calculateTotalCalories = (
    productsToEat: { product: Item; weight: string }[]
  ) => {
    return productsToEat.reduce((total, item) => {
      const calories =
        (Number(item.weight) / 100) * Number(item.product.calories);
      return total + calories;
    }, 0);
  };

  // Фильтрация продуктов по выбранному дню
  const filteredProducts = day.productsToEat.filter(
    (el) => el.day === selectedDay
  );

  // Расчет общего количества калорий
  const totalCalories = calculateTotalCalories(filteredProducts);

  // Расчет целевого количества калорий
  const target =
    88 +
    13 * Number(userMeasurements.weight) +
    4.2 * 178 -
    5.7 * Number(userMeasurements.age);

  // Расчет оставшихся калорий
  const remainingCalories = Math.round(target - totalCalories);

  // Форматирование текста в зависимости от оставшихся калорий
  const caloriesText = remainingCalories > 0 ? "Осталось " : "Превышено ";
  const caloriesClassName = remainingCalories < 0 && "text-warning";

  return (
    <div className="px-1 mt-3 flex justify-between items-center dark:text-neutral-100">
      <span className="opacity-70">
        {`${totalCalories.toFixed(0)} / ${target.toFixed(0)}`} ккал
      </span>
      <p>
        {caloriesText}
        <span className={`text-lg font-medium ${caloriesClassName}`}>
          {remainingCalories}
        </span>
      </p>
    </div>
  );
}
