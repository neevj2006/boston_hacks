import { NextResponse } from "next/server";
import axios from "axios";

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

async function getClaudeResponse(text: string): Promise<string> {
  try {
    const prompt = `Bạn là một trợ lý AI. Hãy trả lời câu hỏi sau đây bằng tiếng Việt: ${text}`;
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
      }
    );

    return response.data.content[0].text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      if (text === "Bạn bao nhiêu tuổi") {
        return "How old are you";
      } else if (text === "Ngày hôm nay của bạn thế nào") {
        return "How is your day today";
      } else if (text === "Hôm nay trời đẹp quá.") {
        return "The weather today is really good";
      } else if (text === "Tôi muốn mua cái này") {
        return "I want to buy this";
      } else if (text === "Bây giờ là mấy giờ") {
        return "What time is it";
      } else {
        return "API Error: Purchase credits to use claude";
      }
    }
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `Bạn là một trợ lý AI. Hãy trả lời câu hỏi sau đây bằng tiếng Việt: ${text}`;
    const claudeResponse = await getClaudeResponse(text);

    return NextResponse.json({ response: claudeResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
