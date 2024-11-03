import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

// To Do: Change Question audios

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Vietnamese",
        imageSrc: "/vi.png",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 5,
        title: "Italian",
        imageSrc: "/it.svg",
      },
    ]);

    // REAL

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 2, //Vietnamese
        title: "Unit 1",
        description: "Listening phrases",
        order: 1,
      },
      {
        id: 2,
        courseId: 2, //Vietnamese
        title: "Unit 2",
        description: "Vocabulary",
        order: 2,
      },
    ]);

    //LISTENING lessons
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 Important phrases 1
        order: 1,
        title: "one",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 Important phrases 2
        order: 2,
        title: "two",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 Important phrases 3
        order: 3,
        title: "three",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 Important phrases 4
        order: 4,
        title: "four",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 Important phrases 5
        order: 5,
        title: "five",
      },
      {
        id: 6,
        unitId: 2, // Unit 2 Vocab
        order: 1,
        title: "one",
      },
      {
        id: 7,
        unitId: 2, // Unit 2 Vocab
        order: 2,
        title: "two",
      },
      {
        id: 8,
        unitId: 2, // Unit 2 Vocab
        order: 3,
        title: "three",
      },
      {
        id: 9,
        unitId: 2, // Unit 2 Vocab
        order: 4,
        title: "four",
      },
      {
        id: 10,
        unitId: 2, // Unit 2 Vocab
        order: 5,
        title: "five",
      },
    ]);

    //LISTENING challange 1
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Q1
        type: "SELECT",
        order: 1,
        question: "Choose the correct option",
      },
      {
        id: 2,
        lessonId: 1, // Q2
        type: "SELECT",
        order: 2,
        question: "Choose the correct option",
      },
    ]);

    //LISTENING challange 1 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Q1: Cái này là cái gì (what is this)
        correct: true,
        text: "What is this?",
        audioSrc: "/Q1.mp3",
      },
      {
        challengeId: 1, //Q2
        correct: false,
        text: "Can you help me?",
        audioSrc: "/Q2.mp3",
      },
      {
        challengeId: 1, //Q5
        correct: false,
        text: "The restaurant is in front of the school.",
        audioSrc: "Q6.mp3",
      },
    ]);

    //LISTENING challange 1 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, //Q4
        correct: false,
        text: "I want to order.",
        audioSrc: "Q4.mp3",
      },
      {
        challengeId: 2, //Q6
        correct: false,
        text: "Turn right then go straight.",
        audioSrc: "/Q6.mp3",
      },
      {
        challengeId: 2, // Q2: Bạn giúp tôi được không (can you help me)
        correct: true,
        text: "Can you help me?",
        audioSrc: "/Q2.mp3",
      },
    ]);

    //LISTENING challange 2
    await db.insert(schema.challenges).values([
      {
        id: 3,
        lessonId: 2, // Q1
        type: "SELECT",
        order: 1,
        question: 'Choose the correct option"?',
      },
      {
        id: 4,
        lessonId: 2, // Q2
        type: "SELECT",
        order: 2,
        question: '"Choose the correct option"',
      },
    ]);

    //LISTENING challange 2 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Q10
        correct: false,
        text: "Give me a bowl of noodle.",
        audioSrc: "/Q10.mp3",
      },
      {
        challengeId: 3, //Q3: nhà hàng (restaurant) ở đâu (where)
        correct: true,
        text: "Where is the restaurant??",
        audioSrc: "/Q3.mp3",
      },
      {
        challengeId: 3, // Q5
        correct: false,
        text: "The restaurant is in front of the school.",
        audioSrc: "/Q5.mp3",
      },
    ]);

    //LISTENING challange 2 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4, // Q9
        correct: false,
        text: "Can I have a cup of water.",
        audioSrc: "/Q9.mp3",
      },
      {
        challengeId: 4, // Q7
        correct: false,
        text: "Make it less spicy.",
        audioSrc: "/Q7.mp3",
      },
      {
        challengeId: 4, // Q4: Cho tôi gọi món (I want to order)
        correct: true,
        text: "I want to order.",
        audioSrc: "/Q4.mp3",
      },
    ]);

    //LISTENING challange 3
    await db.insert(schema.challenges).values([
      {
        id: 5,
        lessonId: 3, // Q1
        type: "SELECT",
        order: 1,
        question: 'Choose the correct option"?',
      },
      {
        id: 6,
        lessonId: 3, // Q2
        type: "SELECT",
        order: 2,
        question: '"Choose the correct option"',
      },
    ]);

    //LISTENING challange 3 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5, // Q1
        correct: false,
        text: "What is this?",
        audioSrc: "/Q1.mp3",
      },
      {
        challengeId: 5, //Q8
        correct: false,
        text: "Less sweet.",
        audioSrc: "/Q8.mp3",
      },
      {
        challengeId: 5, // Q5 Nhà hàng (restaurant) nằm ‘o/ phía trước (in front of )  trường học (School)
        correct: true,
        text: "The restaurant is in front of the school.",
        audioSrc: "/Q5.mp3",
      },
    ]);

    //LISTENING challange 3 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6, // Q6 quẹo phải (turn right) rồi đi thẳng (go straight)
        correct: true,
        text: "Turn right then go straight.",
        audioSrc: "/Q6.mp3",
      },
      {
        challengeId: 6, // Q2
        correct: false,
        text: "Can you help me?",
        audioSrc: "/Q2.mp3",
      },
      {
        challengeId: 6, // Q10
        correct: false,
        text: "Give me a bowl of noodle.",
        audioSrc: "/Q10.mp3",
      },
    ]);

    //LISTENING challange 4
    await db.insert(schema.challenges).values([
      {
        id: 7,
        lessonId: 4, // Q1
        type: "SELECT",
        order: 1,
        question: 'Choose the correct option"?',
      },
      {
        id: 8,
        lessonId: 4, // Q2
        type: "SELECT",
        order: 2,
        question: '"Choose the correct option"',
      },
    ]);

    //LISTENING challange 4 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 7, // Q7: Cho ít (less)  cay (spicy)
        correct: true,
        text: "Make it less spicy.",
        audioSrc: "/Q7.mp3",
      },
      {
        challengeId: 7, //Q8
        correct: false,
        text: "Less sweet.",
        audioSrc: "/Q8.mp3",
      },
      {
        challengeId: 7, // Q4
        correct: false,
        text: "I want to order.",
        audioSrc: "/Q4.mp3",
      },
    ]);

    //LISTENING challange 4 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 8, // Q3
        correct: false,
        text: "Where is the restaurant?",
        audioSrc: "/Q3.mp3",
      },
      {
        challengeId: 8, // Q5
        correct: false,
        text: "The restaurant is in front of the school.",
        audioSrc: "/Q5.mp3",
      },
      {
        challengeId: 8, // Q8: Ít (less) ngọt (Sweet)
        correct: true,
        text: "Less sweet.",
        audioSrc: "/Q8.mp3",
      },
    ]);

    //LISTENING challange 5
    await db.insert(schema.challenges).values([
      {
        id: 9,
        lessonId: 5, // Q1
        type: "SELECT",
        order: 1,
        question: 'Choose the correct option"?',
      },
      {
        id: 10,
        lessonId: 5, // Q2
        type: "SELECT",
        order: 2,
        question: '"Choose the correct option"',
      },
    ]);

    //LISTENING challange 5 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 9, // Q2
        correct: false,
        text: "Can you help me?",
        audioSrc: "/Q2.mp3",
      },
      {
        challengeId: 9, // Q1
        correct: false,
        text: "What is this?",
        audioSrc: "/Q1.mp3",
      },
      {
        challengeId: 9, // Q9: Cho tui một ly (cup) nước (Water)
        correct: true,
        text: "Can I have a cup of water?",
        audioSrc: "/Q9.mp3",
      },
    ]);

    //LISTENING challange 5 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 10, // Q4
        correct: false,
        text: "I want to order.",
        audioSrc: "/Q4.mp3",
      },
      {
        challengeId: 10, // Q10: Cho tôi một tô mì

        correct: true,
        text: "Give me a bowl of noodle.",
        audioSrc: "/Q10.mp3",
      },
      {
        challengeId: 10, // Q8
        correct: false,
        text: "Less sweet.",
        audioSrc: "/Q8.mp3",
      },
    ]);

    //VOCAB challenge 6
    await db.insert(schema.challenges).values([
      {
        id: 11,
        lessonId: 6, // Q1
        type: "ASSIST",
        order: 1,
        question: "Translate cái gì",
      },
      {
        id: 12,
        lessonId: 6, // Q2
        type: "ASSIST",
        order: 2,
        question: "Translate giúp",
      },
    ]);

    //LISTENING challenge 6 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 11,
        correct: true,
        text: "What",
      },
      {
        challengeId: 11,
        correct: false,
        text: "When",
      },
      {
        challengeId: 11,
        correct: false,
        text: "Where",
      },
    ]);

    //LISTENING challenge 6 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 12,
        correct: false,
        text: "Call",
      },
      {
        challengeId: 12,
        correct: false,
        text: "Give",
      },
      {
        challengeId: 12,
        correct: true,
        text: "Help",
      },
    ]);

    //VOCAB challenge 7
    await db.insert(schema.challenges).values([
      {
        id: 13,
        lessonId: 7, // Q1
        type: "ASSIST",
        order: 1,
        question: "Translate nhà hàng",
      },
      {
        id: 14,
        lessonId: 7, // Q2
        type: "ASSIST",
        order: 2,
        question: "Translate mì",
      },
    ]);

    //LISTENING challenge 7 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 13,
        correct: false,
        text: "office",
      },
      {
        challengeId: 13,
        correct: true,
        text: "restaurant",
      },
      {
        challengeId: 13,
        correct: false,
        text: "hospital",
      },
    ]);

    //LISTENING challenge 7 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 14,
        correct: false,
        text: "Rice",
      },
      {
        challengeId: 14,
        correct: false,
        text: "Bread",
      },
      {
        challengeId: 14,
        correct: true,
        text: "Noodle",
      },
    ]);

    //VOCAB challenge 8
    await db.insert(schema.challenges).values([
      {
        id: 15,
        lessonId: 8, // Q1
        type: "ASSIST",
        order: 1,
        question: "Translate trường học",
      },
      {
        id: 16,
        lessonId: 8, // Q2
        type: "ASSIST",
        order: 2,
        question: "Translate đi thẳng",
      },
    ]);

    //LISTENING challenge 8 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 15,
        correct: false,
        text: "House",
      },
      {
        challengeId: 15,
        correct: false,
        text: "Church",
      },
      {
        challengeId: 15,
        correct: true,
        text: "School",
      },
    ]);

    //LISTENING challenge 8 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 16,
        correct: false,
        text: "Go left",
      },
      {
        challengeId: 16,
        correct: true,
        text: "Go straight",
      },
      {
        challengeId: 16,
        correct: false,
        text: "Go right",
      },
    ]);

    //VOCAB challenge 9
    await db.insert(schema.challenges).values([
      {
        id: 17,
        lessonId: 9, // Q1
        type: "ASSIST",
        order: 1,
        question: "Translate Ít",
      },
      {
        id: 18,
        lessonId: 9, // Q2
        type: "ASSIST",
        order: 2,
        question: "Translate ly",
      },
    ]);

    //LISTENING challenge 9 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 17,
        correct: true,
        text: "Little",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Average",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Many",
      },
    ]);

    //LISTENING challenge 9 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 18,
        correct: false,
        text: "Bottle",
      },
      {
        challengeId: 18,
        correct: true,
        text: "Cup",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Bowl",
      },
    ]);

    //VOCAB challenge 10
    await db.insert(schema.challenges).values([
      {
        id: 19,
        lessonId: 10, // Q1
        type: "ASSIST",
        order: 1,
        question: "Translate nước",
      },
      {
        id: 20,
        lessonId: 10, // Q2
        type: "ASSIST",
        order: 2,
        question: "Translate cay",
      },
    ]);

    //LISTENING challenge 10 options 1
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 19,
        correct: false,
        text: "Fire",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Tree",
      },
      {
        challengeId: 19,
        correct: true,
        text: "Water",
      },
    ]);

    //LISTENING challenge 10 options 2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        correct: true,
        text: "Spicy",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Sour",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Sweet",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};
main();
