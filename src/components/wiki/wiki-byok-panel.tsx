"use client";

// Bring-your-own-key settings for the companion chat — only rendered on the
// public site (no backend configured). See src/lib/wiki-byok.ts.
import { useState } from "react";
import { KeyRound } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { BYOK_DEFAULT_MODEL, saveByok, useByok, type ByokRegion } from "@/lib/wiki-byok";

const UI = {
  zh: {
    open: "用你自己的百炼 Key 接入真实模型",
    active: "已用你的 Key · {model}",
    edit: "修改",
    region: "地域",
    cn: "中国内地（dashscope）",
    intl: "国际（dashscope-intl）",
    model: "模型",
    key: "API Key",
    remember: "在此浏览器记住（默认关闭浏览器即清除）",
    save: "保存",
    clear: "清除",
    cancel: "收起",
    note: "Key 只保存在你的浏览器里，只发送给阿里云百炼，不经过本站服务器；费用记在你自己的账户上。建议使用单独的子账号 Key 并设置费用上限。",
  },
  en: {
    open: "Use your own Bailian key for real answers",
    active: "Using your key · {model}",
    edit: "Edit",
    region: "Region",
    cn: "Mainland China (dashscope)",
    intl: "International (dashscope-intl)",
    model: "Model",
    key: "API key",
    remember: "Remember in this browser (cleared when the browser closes by default)",
    save: "Save",
    clear: "Clear",
    cancel: "Close",
    note: "Your key stays in your browser and is sent only to Alibaba Cloud Bailian — never to this site. Usage is billed to your own account; a dedicated sub-account key with a spending cap is recommended.",
  },
};

export default function WikiByokPanel() {
  const { language } = useLanguage();
  const t = UI[language];
  const cfg = useByok();
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState<ByokRegion>("cn");
  const [model, setModel] = useState(BYOK_DEFAULT_MODEL);
  const [key, setKey] = useState("");
  const [remember, setRemember] = useState(false);

  // Prefill from the saved config each time the form opens.
  const openForm = () => {
    setRegion(cfg?.region ?? "cn");
    setModel(cfg?.model ?? BYOK_DEFAULT_MODEL);
    setKey(cfg?.key ?? "");
    setRemember(cfg?.remember ?? false);
    setOpen(true);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={openForm}
        className="mx-4 mb-1 inline-flex items-center gap-1.5 self-start text-xs text-accent hover:underline"
      >
        <KeyRound className="size-3.5" />
        {cfg ? (
          <>
            {t.active.replace("{model}", cfg.model)} · {t.edit}
          </>
        ) : (
          t.open
        )}
      </button>
    );
  }

  const field = "w-full rounded-md border bg-background px-2 py-1 text-sm";
  return (
    <form
      className="mx-4 mb-2 flex flex-col gap-2 rounded-lg border bg-muted/30 p-3 text-xs"
      onSubmit={(e) => {
        e.preventDefault();
        if (!key.trim()) return;
        saveByok({ region, model: model.trim() || BYOK_DEFAULT_MODEL, key: key.trim(), remember });
        setOpen(false);
      }}
    >
      <label className="flex flex-col gap-1">
        {t.region}
        <select value={region} onChange={(e) => setRegion(e.target.value as ByokRegion)} className={field}>
          <option value="cn">{t.cn}</option>
          <option value="intl">{t.intl}</option>
        </select>
      </label>
      <label className="flex flex-col gap-1">
        {t.model}
        <input value={model} onChange={(e) => setModel(e.target.value)} className={field} spellCheck={false} />
      </label>
      <label className="flex flex-col gap-1">
        {t.key}
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className={field}
          autoComplete="off"
          spellCheck={false}
          placeholder="sk-…"
        />
      </label>
      <label className="flex items-center gap-1.5">
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        {t.remember}
      </label>
      <p className="leading-5 text-muted-foreground">{t.note}</p>
      <div className="flex gap-2">
        <button type="submit" disabled={!key.trim()} className="rounded-md bg-accent px-3 py-1 font-semibold text-accent-foreground disabled:opacity-40">
          {t.save}
        </button>
        {cfg ? (
          <button
            type="button"
            onClick={() => {
              saveByok(null);
              setOpen(false);
            }}
            className="rounded-md border px-3 py-1"
          >
            {t.clear}
          </button>
        ) : null}
        <button type="button" onClick={() => setOpen(false)} className="ml-auto rounded-md border px-3 py-1">
          {t.cancel}
        </button>
      </div>
    </form>
  );
}
