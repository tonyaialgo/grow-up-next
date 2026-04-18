-- AI platform: prompts, LLM settings, usage logs
-- Run in Supabase SQL Editor after deployment.

-- Active LLM configuration (single row)
CREATE TABLE IF NOT EXISTS ai_llm_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  provider TEXT NOT NULL DEFAULT 'openrouter',
  model TEXT NOT NULL DEFAULT 'google/gemini-2.0-flash-001',
  openai_base_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO ai_llm_config (id, provider, model)
VALUES ('default', 'openrouter', 'google/gemini-2.0-flash-001')
ON CONFLICT (id) DO NOTHING;

-- Prompt templates (current active content per feature key)
CREATE TABLE IF NOT EXISTS ai_prompts (
  feature_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  user_template TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Version history for prompts
CREATE TABLE IF NOT EXISTS ai_prompt_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key TEXT NOT NULL REFERENCES ai_prompts(feature_key) ON DELETE CASCADE,
  system_prompt TEXT NOT NULL,
  user_template TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Usage / token logging (service role writes)
CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  feature TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_tokens INT,
  completion_tokens INT,
  total_tokens INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_usage_user_time ON ai_usage_logs (user_identifier, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_usage_feature_time ON ai_usage_logs (feature, created_at DESC);

-- RLS: block direct client access; backend uses service role only
ALTER TABLE ai_llm_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompt_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Seed default prompts (Traditional Chinese)
INSERT INTO ai_prompts (feature_key, name, system_prompt, user_template) VALUES
(
  'academic_advisor',
  'AI 升學顧問',
  '你是 GrowUp 平台的資深香港升學顧問。只根據提供的平台資料與用戶輸入作答。輸出必須使用繁體中文。禁止虛構學校名稱；若資料不足請說明。請以 Markdown 結構化輸出，包含：學校推薦（3-5 所，附理由）、課程建議、課外活動、學業策略、面試準備提示、後續行動。不可提供醫療診斷。',
  '【用戶提供的子女與家庭資訊】\n{{user_context}}\n\n【平台學校摘要（JSON）】\n{{school_context}}\n\n請根據以上內容給出個性化升學建議。'
),
(
  'growth_interpreter',
  'AI 成長報告解讀',
  '你是 GrowUp 平台的兒童成長與健康教育助理。根據提供的量表數據作通俗解讀與可行建議。使用繁體中文、Markdown。不可取代醫生；若指標可能異常，必須提醒家長諮詢兒科或相關專業人士。避免恐嚇式語氣。',
  '【健康與情緒數據 JSON】\n{{payload}}\n\n請輸出：數據解讀、個性化行動計劃（飲食/運動/睡眠/心理）、警示與建議（如有）、可參考的平台資源方向。'
),
(
  'parent_support',
  'AI 家長情緒樹洞',
  '你是具同理心的育兒支援助理（非治療師）。以繁體中文回覆。先簡短承認家長感受，再提供實用建議。若涉及自殘、虐待兒童、緊急危機，必須明確建議立即尋求專業協助或緊急服務。不可提供醫療診斷或處方。',
  '【家長訊息】\n{{message}}\n\n【可選：對話摘要】\n{{summary}}'
),
(
  'site_assistant',
  'AI 全站導航助手',
  '你是 GrowUp 平台導航助手。只根據提供的平台內容摘要回答。若資訊不足請誠實說明。使用繁體中文與 Markdown，並在適當處附上相關內部路徑建議（相對路徑）。',
  '【使用者問題】\n{{message}}\n\n【平台內容檢索摘要】\n{{rag_context}}'
)
ON CONFLICT (feature_key) DO NOTHING;
