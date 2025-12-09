import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Tier constraints
// NOTE: Every course has 5 topics/modules total. The tier determines:
// 1. How many modules (topics) of the 5 are unlocked
// 2. How many courses/skills can be selected
// 3. Number of quiz questions per module
const TIER_CONSTRAINTS = {
  free: {
    maxCourses: 1,
    maxSkills: 1,
    maxModules: 2, // Unlocks 2 out of 5 topics
    quizQuestionsPerModule: 3,
    hasAppliedPractice: false,
  },
  standard: {
    maxCourses: 3,
    maxSkills: 3,
    maxModules: 4, // Unlocks 4 out of 5 topics
    quizQuestionsPerModule: 4,
    hasAppliedPractice: false,
  },
  premium: {
    maxCourses: 5,
    maxSkills: 5,
    maxModules: 5, // Unlocks all 5 topics
    quizQuestionsPerModule: 5,
    hasAppliedPractice: true,
  },
};

const UBUNTU_SHORT_COURSE_PROMPT = `You are the KIUL Short Courses Generator, specialized in creating structured, pedagogically rigorous courses grounded in Ubuntu philosophy.

**KIUL Pedagogical Model (MANDATORY for EVERY module):**

Each module MUST follow this exact structure:

1. **Introduction**: A short opening paragraph (2-3 sentences) that sets context
2. **Thesis**: Exactly ONE powerful paragraph presenting the main idea (MINIMUM 500 words)
3. **Antithesis**: Exactly THREE strong paragraphs that challenge, complicate, or provide counterpoints (EACH paragraph MINIMUM 500 words)
4. **Synthesis**: Exactly ONE conclusive paragraph that integrates thesis and antithesis (MINIMUM 500 words)
5. **Conclusion**: A short closing paragraph (2-3 sentences) with actionable takeaway

**CRITICAL WORD COUNT REQUIREMENT:**
- Thesis paragraph: Minimum 500 words
- EACH of the three Antithesis paragraphs: Minimum 500 words each
- Synthesis paragraph: Minimum 500 words
- These are substantive academic paragraphs with depth, examples, and thorough analysis

**Ubuntu Integration:**
- Emphasize "I am because we are" — interconnectedness and community
- Connect individual skills to collective contribution
- Balance personal growth with social responsibility
- Relate content to African contexts and Ubuntu wisdom where appropriate

**Quiz Requirements:**
- Multiple-choice questions only
- 4 options per question (A, B, C, D)
- Questions should test understanding of key concepts
- Include ONE correct answer per question
- Questions should be challenging but fair

**Response Format:**
You MUST respond with valid JSON only. No markdown, no code blocks, just pure JSON.

Structure:
{
  "courseTitle": "Combined course and skill title",
  "overview": "2-3 paragraphs combining course, skill, and Ubuntu philosophy",
  "modules": [
    {
      "moduleNumber": 1,
      "moduleTitle": "Module title",
      "introduction": "2-3 sentence introduction",
      "thesis": "One powerful paragraph",
      "antithesis": [
        "First challenging paragraph",
        "Second challenging paragraph", 
        "Third challenging paragraph"
      ],
      "synthesis": "One integrative paragraph",
      "conclusion": "2-3 sentence conclusion with takeaway",
      "quiz": [
        {
          "question": "Question text",
          "options": ["A) Option", "B) Option", "C) Option", "D) Option"],
          "correctAnswer": "B"
        }
      ]
    }
  ],
  "references": [
    {
      "citation": "Author(s). (Year). Title. Journal/Publisher. DOI or URL",
      "annotation": "Brief annotation describing the source's relevance and key contribution (max 50 words)"
    },
    {
      "citation": "Author(s). (Year). Title. Journal/Publisher. DOI or URL",
      "annotation": "Brief annotation describing the source's relevance and key contribution (max 50 words)"
    },
    {
      "citation": "Author(s). (Year). Title. Journal/Publisher. DOI or URL",
      "annotation": "Brief annotation describing the source's relevance and key contribution (max 50 words)"
    }
  ],
  "appliedPractice": "Only for premium tier - practical activity description"
}

**Academic References (REQUIRED):**
- Include exactly THREE academic sources (articles or books) from Google Scholar
- Each reference must have:
  1. Full citation in APA format with DOI or URL
  2. Annotation (maximum 50 words) describing relevance and key contribution
- References should be recent, credible, and directly related to the course content

**Important:**
- EACH main paragraph (thesis, antithesis paragraphs, synthesis) MUST be at least 500 words
- Maintain academic rigor while being accessible
- Use Ubuntu philosophy to deepen understanding
- Ensure quiz questions are directly related to module content
- Write comprehensive, detailed paragraphs with examples, analysis, and thorough exploration of concepts`;

export async function POST(req: NextRequest) {
  try {
    const { courses, skills, tier } = await req.json();

    // Validate inputs
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one course' },
        { status: 400 }
      );
    }

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one skill' },
        { status: 400 }
      );
    }

    if (!tier || !['free', 'standard', 'premium'].includes(tier)) {
      return NextResponse.json(
        { error: 'Please select a valid tier' },
        { status: 400 }
      );
    }

    // Get tier constraints
    const constraints = TIER_CONSTRAINTS[tier as keyof typeof TIER_CONSTRAINTS];

    // Validate tier constraints
    if (courses.length > constraints.maxCourses) {
      return NextResponse.json(
        { 
          error: `Your ${tier} tier allows up to ${constraints.maxCourses} course${constraints.maxCourses > 1 ? 's' : ''}. Please select fewer courses or upgrade your tier.` 
        },
        { status: 400 }
      );
    }

    if (skills.length > constraints.maxSkills) {
      return NextResponse.json(
        { 
          error: `Your ${tier} tier allows up to ${constraints.maxSkills} skill${constraints.maxSkills > 1 ? 's' : ''}. Please select fewer skills or upgrade your tier.` 
        },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: 'The course generator is not fully configured yet. Please contact info.kiul@katokifoundation.org',
      }, { status: 503 });
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Build generation prompt
    const userPrompt = `Generate a comprehensive short course with the following specifications:

**Selected Courses:** ${courses.join(', ')}
**Selected Skills:** ${skills.join(', ')}
**Tier:** ${tier}

**IMPORTANT - Course Structure:**
- Every course has exactly 5 topics/modules total
- This ${tier} tier unlocks ${constraints.maxModules} out of 5 modules
- Generate ${constraints.maxModules} modules (topics) for this tier
- Each module must have ${constraints.quizQuestionsPerModule} quiz questions
${constraints.hasAppliedPractice ? '- Include Applied Practice Section at the end' : ''}

Create a course that meaningfully integrates these courses and skills through Ubuntu philosophy. Each module must follow the EXACT structure: Introduction, Thesis (1 paragraph), Antithesis (3 paragraphs), Synthesis (1 paragraph), Conclusion.

Respond with ONLY valid JSON, no markdown formatting.`;

    // Generate course content
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // Using gpt-4o which supports JSON mode
      messages: [
        { role: 'system', content: UBUNTU_SHORT_COURSE_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const generatedContent = completion.choices[0]?.message?.content;
    
    if (!generatedContent) {
      throw new Error('No content generated');
    }

    // Parse and validate JSON
    let courseData;
    try {
      courseData = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error('Invalid course data format');
    }

    // Add metadata
    courseData.tier = tier;
    courseData.generatedAt = new Date().toISOString();
    courseData.selectedCourses = courses;
    courseData.selectedSkills = skills;

    return NextResponse.json(courseData);

  } catch (error) {
    console.error('Short Courses Generator Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate course. Please try again or contact info.kiul@katokifoundation.org',
      },
      { status: 500 }
    );
  }
}
