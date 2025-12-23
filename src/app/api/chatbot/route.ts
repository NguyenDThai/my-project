import OpenAI from "openai";
import { NextResponse } from "next/server";
import Product from "@/models/Products";
import { connectDB } from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY,
});

const CATEGORY_MAP: Record<string, string> = {
  chickenfried: "🍗 Gà rán",
  pizza: "🍕 Pizza",
  drink: "🥤 Nước uống",
  dessert: "Tráng miệng",
  combo: "🎁 Combo",
};

function detectIntent(message: string) {
  const text = message.toLowerCase();

  if (text.includes("menu")) return "MENU";
  if (text.includes("pizza")) return "pizza";
  if (text.includes("gà") || text.includes("chicken")) return "chickenfried";
  if (text.includes("nước") || text.includes("drink")) return "drink";
  if (text.includes("tráng miệng") || text.includes("dessert"))
    return "dessert";
  if (text.includes("combo")) return "combo";

  return "UNKNOWN";
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ message: "Thiếu nội dung" }, { status: 400 });
    }

    const intent = detectIntent(message);

    if (intent !== "UNKNOWN") {
      const products = await Product.find(
        intent === "MENU" ? {} : { category: intent }
      )
        .limit(10)
        .select("name price category")
        .lean();

      if (products.length === 0) {
        return NextResponse.json({
          reply: "Hiện tại chưa có món phù hợp 😢",
        });
      }

      const reply = products
        .map(
          (p, index) =>
            `${index + 1}. ${p.name} - ${Number(p.price).toLocaleString(
              "vi-VN"
            )}đ`
        )
        .join("\n");

      return NextResponse.json({
        reply: `📋 ${
          intent === "MENU" ? "Menu Food Dev" : CATEGORY_MAP[intent]
        }\n\n${reply}`,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là chatbot bán đồ ăn nhanh Food Dev.
Chỉ hỗ trợ menu, giá, khuyến mãi, giao hàng.
Nếu ngoài phạm vi → từ chối lịch sự.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 200,
    });

    return NextResponse.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi chatbot" }, { status: 500 });
  }
}
