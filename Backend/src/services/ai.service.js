const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {
    const prompt = `
You are an expert technical interviewer and career coach.

Analyze the candidate's Resume, Self Description, and Job Description.

Return ONLY valid JSON.
Do NOT include markdown.
Do NOT wrap the JSON inside \`\`\`.
Do NOT add any explanation before or after the JSON.

The JSON MUST exactly follow this structure:

{
  "title": "",
  "matchScore": 0,
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGaps": [
    {
      "skill": "",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": [
        ""
      ]
    }
  ]
}

Instructions:

- title should contain the Job Title. Examples:
  - "MERN Stack Developer"
  - "Software Engineer"
  - "Frontend Developer"
  - "Java Backend Developer"

- Generate a matchScore between 0 and 100.
- Generate exactly 10 technical interview questions.
- Generate exactly 5 behavioral interview questions.
- Identify exactly 5 skill gaps with severity (low, medium, or high).
- Generate a detailed 7-day preparation plan.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.candidates[0].content.parts[0].text;

        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const report = JSON.parse(cleanedText);

        // Fallback if Gemini doesn't return title
        if (!report.title || report.title.trim() === "") {
            report.title = "Interview Report";
        }

        return report;
    } catch (error) {
        console.error("Gemini Error:");
        console.error(error);
        throw error;
    }
}

module.exports = generateInterviewReport;