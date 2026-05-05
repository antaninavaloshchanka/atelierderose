export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { name, phone, date, eventType, message } = body;

  if (!name || !phone) {
    return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = [
    '\u{1F338} Новая заявка с сайта!',
    '',
    `\u{1F464} Имя: ${name}`,
    `\u{1F4F1} Контакт: ${phone}`,
    `\u{1F4C5} Дата: ${date || 'Не указана'}`,
    `\u{1F389} Тип: ${eventType || 'Не указан'}`,
    `\u{1F4AC} Сообщение: ${message || 'Без сообщения'}`,
  ].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
