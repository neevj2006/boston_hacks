import { getCompletedVocab } from "@/db/queries";

type Props = {
  points: number;
};

export const Quests = async ({ points }: Props) => {
  const completedVocab = await getCompletedVocab();

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Vocabulary</h3>
      </div>
      {completedVocab.length > 0 && (
        <ul className="w-full space-y-2">
          {completedVocab.map((item: { word: string; id: number }) => {
            return <li key={item.id}>{item.word}</li>;
          })}
        </ul>
      )}
      <ul className="w-full space-y-2">
        <li>You haven't learned any words</li>
      </ul>
    </div>
  );
};
