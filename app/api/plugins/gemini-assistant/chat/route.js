import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

// POST /api/plugins/gemini-assistant/chat
// — API key được đọc từ D1 của website (không lộ ra frontend)
// — Sau khi cài plugin, website hoàn toàn độc lập với website-manager
export async function POST(request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json({ error: 'Thiếu tham số message' }, { status: 400 });
    }

    // Đọc config của plugin từ D1 của chính website này
    const rows = await query(
      "SELECT config FROM installed_plugins WHERE id = 'gemini-assistant' AND active = 1"
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'Plugin Gemini chưa được cài đặt trên website này.' }, { status: 404 });
    }

    const config = typeof rows[0].config === 'string'
      ? JSON.parse(rows[0].config)
      : (rows[0].config || {});

    const apiKey = config.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chưa cấu hình GEMINI_API_KEY. Vào Admin → Plugins → Cấu hình.' }, { status: 400 });
    }

    // Gọi Gemini API — hoàn toàn server-side, API key an toàn
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await geminiRes.json();
    if (!geminiRes.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Lỗi gọi Gemini API' },
        { status: geminiRes.status }
      );
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Không nhận được câu trả lời từ AI.';

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
