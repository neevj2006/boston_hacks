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
    ]);

    //LISTENING challange 1
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Q1
        type: "SELECT",
        order: 1,
        question: "Choose the correct option?",
      },
      {
        id: 2,
        lessonId: 1, // Q2
        type: "SELECT",
        order: 2,
        question: "Choose the correct option?",
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

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};
main();
