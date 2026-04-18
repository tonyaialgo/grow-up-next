-- Multi-turn AI chat sessions (server-side; service role only)
-- Run after 002_ai_platform.sql

CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  feature TEXT NOT NULL,
  last_growth_payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE ai_chat_sessions
  ADD COLUMN IF NOT EXISTS last_growth_payload JSONB;

CREATE INDEX IF NOT EXISTS idx_ai_chat_sessions_user_feature
  ON ai_chat_sessions (user_identifier, feature, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_chat_messages_session_time
  ON ai_chat_messages (session_id, created_at ASC);

ALTER TABLE ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_messages ENABLE ROW LEVEL SECURITY;

-- Refresh default prompt templates to include RAG / multi-turn placeholders (idempotent for new installs)
UPDATE ai_prompts SET user_template =
  '【家長訊息】\n{{message}}\n\n【可選：對話摘要】\n{{summary}}\n\n【平台內容檢索摘要（學業小貼士、升學指南、心靈成長等）】\n{{rag_context}}'
WHERE feature_key = 'parent_support';

UPDATE ai_prompts SET user_template =
  '【使用者問題】\n{{message}}\n\n【先前對話摘要（最近一輪，如有）】\n{{conversation_summary}}\n\n【平台內容檢索摘要】\n{{rag_context}}'
WHERE feature_key = 'site_assistant';

UPDATE ai_prompts SET user_template =
  '【用戶提供的子女與家庭資訊】\n{{user_context}}\n\n【平台學校摘要（JSON）】\n{{school_context}}\n\n【升學日曆與學業小貼士摘要】\n{{academic_context}}\n\n請根據以上內容給出個性化升學建議。'
WHERE feature_key = 'academic_advisor';

UPDATE ai_prompts SET user_template =
  '【健康與情緒數據 JSON】\n{{payload}}\n\n【平台健康與心靈成長相關內容摘要】\n{{rag_context}}\n\n請輸出：數據解讀、個性化行動計劃（飲食/運動/睡眠/心理）、警示與建議（如有）、可參考的平台資源方向（可附上相對路徑連結建議）。'
WHERE feature_key = 'growth_interpreter';
