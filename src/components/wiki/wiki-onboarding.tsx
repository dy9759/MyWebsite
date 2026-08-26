"use client";

// 学习地图 onboarding (original Se component): name + role pills + product
// anchor → stored as the learner profile that personalizes every lesson.
import { useState } from "react";
import { setProfile, type WikiProfile } from "@/lib/wiki-profile";

const ROLES = ["产品经理", "AI 产品经理", "创业者", "FDE / 解决方案", "运营 / 增长", "其他"];
const EXAMPLES = [
  "一个帮宠物主约上门喂养的小程序",
  "给中小商家的 AI 客服工作台",
  "面向留学生的二手教材交易平台",
];

export default function WikiOnboarding({ onDone }: { onDone: (p: WikiProfile) => void }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [project, setProject] = useState("");
  const [example] = useState(() => EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]);
  const ok = name.trim().length > 0 && project.trim().length >= 4;

  const submit = () => {
    if (!ok) return;
    const p: WikiProfile = { name: name.trim(), role, project: project.trim() };
    setProfile(p);
    onDone(p);
  };

  return (
    <div className="loop-onboard-card">
      <div className="loop-onboard-eyebrow">LOOP ACADEMY · 闭环学院</div>
      <h1 className="loop-onboard-title">生成你的学习地图</h1>
      <p className="loop-onboard-lede">
        课程会围绕你的产品展开——模拟器、案例、判断题都会发生在这个产品里。
      </p>
      <div className="loop-field">
        <label htmlFor="ob-name">你的名字或昵称</label>
        <input
          id="ob-name"
          value={name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的名字或昵称"
        />
      </div>
      <div className="loop-field">
        <label>你的角色</label>
        <div className="loop-role-row">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              className={`loop-role-pill${role === r ? " on" : ""}`}
              onClick={() => setRole(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="loop-field">
        <label htmlFor="ob-project">你想做（或正在做）的产品</label>
        <textarea
          id="ob-project"
          value={project}
          maxLength={60}
          rows={2}
          onChange={(e) => setProject(e.target.value)}
          placeholder={`一句话描述，比如：${example}`}
        />
        <div className="loop-field-hint">
          这是整套课程的锚点：模拟器、案例、判断题都会发生在这个产品里。写真实的想法，学习效果最好。
        </div>
      </div>
      <button type="button" className="loop-btn-primary" disabled={!ok} onClick={submit}>
        生成我的学习地图 →
      </button>
    </div>
  );
}
