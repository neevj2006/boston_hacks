import Link from "next/link";
import Image from "next/image";

import { quests } from "@/constants";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
      <ul className="w-full space-y-2">
        {completedVocab.map((item: { word: string; id: number }) => {
          return <li key={item.id}>{item.word}</li>;
        })}
      </ul>
    </div>
  );
};
