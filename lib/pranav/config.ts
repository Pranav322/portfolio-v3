const requireEnv = (name: string) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const getAzureAgentConfig = () => ({
  endpoint: requireEnv('AZURE_AI_PROJECT_ENDPOINT').replace(/\/$/, ''),
  agentName: requireEnv('AZURE_AI_AGENT_NAME'),
  agentVersion: requireEnv('AZURE_AI_AGENT_VERSION'),
  apiKey: requireEnv('AZURE_OPENAI_API_KEY'),
});

export const getChatSecurityConfig = () => ({
  sessionSecret: requireEnv('CHAT_SESSION_SECRET'),
  turnstileSecret: requireEnv('TURNSTILE_SECRET_KEY'),
});
