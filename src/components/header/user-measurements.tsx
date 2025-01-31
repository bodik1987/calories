import { IUserMeasurements } from "../../types";

type UserMeasurementsProps = {
  userMeasurements: IUserMeasurements;
  handleUserMeasurementsChange: (
    field: keyof IUserMeasurements,
    value: string
  ) => void;
};

export default function UserMeasurements({
  userMeasurements,
  handleUserMeasurementsChange,
}: UserMeasurementsProps) {
  return (
    <div className="p-4">
      <h2>Возраст и вес</h2>

      <div className="mt-4 w-full flex gap-3">
        <input
          type="number"
          value={userMeasurements.age}
          onChange={(e) => handleUserMeasurementsChange("age", e.target.value)}
          placeholder="Возраст"
          className="text-center"
        />
        <input
          type="number"
          value={userMeasurements.weight}
          onChange={(e) =>
            handleUserMeasurementsChange("weight", e.target.value)
          }
          placeholder="Вес (кг)"
          className="text-center"
          autoFocus
        />
      </div>
    </div>
  );
}
