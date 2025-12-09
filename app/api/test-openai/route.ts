import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    checks: {},
  };

  try {
    // Check 1: API Key Present
    diagnostics.checks.apiKeyPresent = !!process.env.OPENAI_API_KEY;
    diagnostics.checks.apiKeyFormat = process.env.OPENAI_API_KEY?.slice(0, 10) || 'NOT_FOUND';

    if (!process.env.OPENAI_API_KEY) {
      diagnostics.error = 'OPENAI_API_KEY not found in environment variables';
      diagnostics.solution = 'Add OPENAI_API_KEY=your-key to .env.local and restart server';
      return NextResponse.json(diagnostics, { status: 500 });
    }

    // Check 2: Initialize OpenAI Client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    diagnostics.checks.clientInitialized = true;

    // Check 3: Test API Connection with Free Model
    diagnostics.checks.testingModel = 'gpt-4o-mini';
    const startTime = Date.now();
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say "OK"' }],
      max_tokens: 5,
    });

    const responseTime = Date.now() - startTime;
    diagnostics.checks.apiConnection = 'SUCCESS';
    diagnostics.checks.responseTime = `${responseTime}ms`;
    diagnostics.checks.response = completion.choices[0]?.message?.content;
    diagnostics.checks.modelUsed = completion.model;

    // Check 4: Test GPT-4 Access (paid tier)
    try {
      await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 5,
      });
      diagnostics.checks.gpt4Access = 'AVAILABLE (Paid Account)';
    } catch (gpt4Error: any) {
      if (gpt4Error.code === 'model_not_found' || gpt4Error.status === 404) {
        diagnostics.checks.gpt4Access = 'NOT_AVAILABLE (Free Account)';
        diagnostics.recommendation = 'Update counselling and mentorship routes to use gpt-4o-mini';
      } else {
        diagnostics.checks.gpt4Access = `ERROR: ${gpt4Error.message}`;
      }
    }

    // Check 5: List Available Models
    try {
      const models = await openai.models.list();
      const gptModels = models.data
        .filter((m: any) => m.id.includes('gpt'))
        .map((m: any) => m.id)
        .slice(0, 10);
      diagnostics.checks.availableModels = gptModels;
    } catch (modelError: any) {
      diagnostics.checks.availableModels = `Error: ${modelError.message}`;
    }

    // Overall Status
    diagnostics.status = 'HEALTHY ✅';
    diagnostics.message = 'OpenAI API is working correctly!';

    if (diagnostics.checks.gpt4Access?.includes('NOT_AVAILABLE')) {
      diagnostics.warning = '⚠️ GPT-4 not available. Using free-tier models (gpt-4o-mini) is recommended.';
    }

    return NextResponse.json(diagnostics, { status: 200 });

  } catch (error: any) {
    diagnostics.status = 'ERROR ❌';
    diagnostics.error = {
      message: error.message,
      type: error.type,
      code: error.code,
      status: error.status,
    };

    // Provide specific solutions
    if (error.code === 'invalid_api_key') {
      diagnostics.solution = 'Invalid API key. Get a new one from https://platform.openai.com/api-keys';
    } else if (error.code === 'insufficient_quota') {
      diagnostics.solution = 'Out of credits. Add payment method at https://platform.openai.com/account/billing';
    } else if (error.status === 429) {
      diagnostics.solution = 'Rate limit exceeded. Wait 1 minute or upgrade account.';
    } else {
      diagnostics.solution = 'Check error details above and OpenAI status at https://status.openai.com';
    }

    return NextResponse.json(diagnostics, { status: 500 });
  }
}
