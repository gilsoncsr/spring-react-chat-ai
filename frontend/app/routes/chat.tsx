import type { Route } from "./+types/chat";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { gsap } from "gsap";
import { http } from "~/lib/api";

type Message = { role: "user" | "ai"; content: string };

export const meta = () => [
  { title: "Chat" },
  { name: "description", content: "Chat com IA" },
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const { data } = await http.post<{ response: string }>("/chat", {
        message,
      });
      return data;
    },
    onSuccess: (data, variables) => {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: variables },
        { role: "ai", content: data.response },
      ]);
      setInput("");
    },
  });

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || chatMutation.isPending) return;
    chatMutation.mutate(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  useEffect(() => {
    if (!listRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-animate=msg]");
      gsap.from(items.slice(-2), {
        y: 8,
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05,
      });
    }, listRef);
    return () => ctx.revert();
  }, [messages.length]);

  return (
    <main className="mx-auto max-w-3xl p-4 pt-4 flex flex-col gap-4 min-h-[100dvh]">
      <h1 className="text-2xl font-semibold tracking-tight">
        Converse com a IA
      </h1>

      <section
        ref={listRef}
        className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 overflow-y-auto space-y-3 bg-white/60 dark:bg-gray-950/60"
      >
        {messages.length === 0 && (
          <p className="text-gray-500">Envie uma mensagem para começar.</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            data-animate="msg"
            className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-100 dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800/70"
            }`}
          >
            {m.content}
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="mr-auto bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-2xl inline-flex items-center gap-2 shadow-sm">
            <span className="size-2 animate-pulse rounded-full bg-gray-400"></span>
            <span className="size-2 animate-pulse rounded-full bg-gray-400 [animation-delay:150ms]"></span>
            <span className="size-2 animate-pulse rounded-full bg-gray-400 [animation-delay:300ms]"></span>
          </div>
        )}
        {chatMutation.isError && (
          <p className="text-red-600">
            Erro ao contatar a API. Tente novamente.
          </p>
        )}
      </section>

      <section className="flex gap-2">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-full border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-950 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          onClick={handleSend}
          disabled={chatMutation.isPending}
          className="px-5 py-2 rounded-full bg-blue-600 text-white disabled:opacity-50 shadow hover:bg-blue-700 active:scale-[0.99] transition"
        >
          Enviar
        </button>
      </section>
    </main>
  );
}
