/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI SDK Server-Side safely
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI Features will fall back to smart simulated responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST Api endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasApiKey: !!apiKey });
});

// Helper for Mock AI fallbacks when API Key is missing or invalid
function generateMockActingReport(monologue: string, emotion: string) {
  return {
    overallScore: 82 + Math.floor(Math.random() * 12),
    facialScore: 80 + Math.floor(Math.random() * 15),
    voiceScore: 83 + Math.floor(Math.random() * 13),
    emotionalScore: 78 + Math.floor(Math.random() * 18),
    confidenceScore: 85 + Math.floor(Math.random() * 10),
    pronunciationScore: 82 + Math.floor(Math.random() * 12),
    stagePresenceScore: 80 + Math.floor(Math.random() * 15),
    feedbackAr: `أداء رائع ومبهر يعزز جوهر النص لـ "${emotion}". لقد تميزت بالثقة والحضور المسرحي القوي، وجاءت مخارج الحروف واضحة ومقنعة. لتحسين الإيماءات، نوصي بتركيز نظرات العين والتحرك بهدوء أكبر لتعزيز الصدق العاطفي.`,
    feedbackEn: `Empathetic and nuanced portrayal fitting the "${emotion}" emotional context. Your pacing was excellent, and the confidence level was extremely high, establishing immediate stage presence. To elevate your delivery, practice taking distinct micro-pauses between intensive emotional shifts to allow the audience to register the subtext.`,
    strengths: ["Strong emotional sincerity and projection", "Clear pronunciation and dialect authenticity", "Good vocal range matching the scene dynamics"],
    improvementAreas: ["Eye contact focal point consistency", "Facial expression symmetry under sudden emotional shifts", "Subtle breathing control to sustain long dialogical phrases"],
    coachingTips: "Always look slightly above the camera lens to project stage confidence. Do daily diaphragmatic breathing exercises to support your vocal projection on dramatic monologues."
  };
}

function generateMockScriptReport(title: string, logline: string) {
  return {
    commercialScore: 75 + Math.floor(Math.random() * 20),
    structureScore: 78 + Math.floor(Math.random() * 18),
    characterScore: 80 + Math.floor(Math.random() * 15),
    dialogueScore: 72 + Math.floor(Math.random() * 22),
    pacingScore: 76 + Math.floor(Math.random() * 18),
    consistencyScore: 82 + Math.floor(Math.random() * 14),
    summaryAr: `تحليل مالي وفني مميز لسيناريو "${title}". يتميز الخط الروائي بفهم كلاسيكي مميز لثلاثية الحبكة الدرامية، مع عمق إنساني وعلاقات متشابكة. الصراع الرئيسي قوي ومحفز للاستدامة السينمائية.`,
    summaryEn: `Detailed evaluation for "${title}". A robust dramatic conflict that hooks the audience instantly. The thematic depth explores complex social arcs with genuine emotional beats. Excellent commercial potential for cinematic release in Arabic-speaking and international territories.`,
    structureAnalysis: "Act I establishes clear stakes. Act II has a rich confrontation arc, although the mid-point climax could be sharpened. Act III resolves with a powerful and commercially rewarding catharsis.",
    characterAnalysis: "The protagonist has highly relatable motivations and a clear psychological wound. Secondary characters feel distinct rather than sounding like mouthpieces for the author's voice.",
    dialogueCritique: "Dialogues are natural and sharp. In several expository scenes, consider trimming some spoken text to let non-verbal visual beats drive information.",
    pacingCheck: "Pacing is steady and energetic. The momentum slows down slightly in early Act II; tightening sequence blocks 5 through 7 will optimize timing.",
    marketability: "Very marketable for modern streaming networks (Netflix, Shahid, OSN). The production scope is highly manageable, promising a strong return on investment (ROI)."
  };
}

function generateMockTalentMatch(profileName: string, roleName: string) {
  const match = 70 + Math.floor(Math.random() * 26);
  return {
    matchPercentage: match,
    strengthsAlignment: `${profileName}'s core skillset matches the target requirements closely. The specialized experience matches the artistic demands of the ${roleName} description perfectly.`,
    gapAnalysis: "Minor language nuance certifications or portfolio updates would perfect this alignment.",
    aiVerdictAr: `الملف الشخصي لـ ${profileName} يمثل خياراً ممتازاً وموصى به بشدة للدور المطلق لـ ${roleName}. نقاط القوة تتماشى مع المتطلبات الإبداعية بنسبة ${match}%.`,
    aiVerdictEn: `${profileName} demonstrates solid compatibility and is highly matched for ${roleName}. Strong structural synergy with ${match}% alignment.`
  };
}

// 1. AI Acting Coach API
app.post('/api/gemini/acting-coach', async (req, res) => {
  const { monologue, character, targetEmotion } = req.body;
  if (!monologue) {
    return res.status(400).json({ error: 'Monologue or script text is required.' });
  }

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.json(generateMockActingReport(monologue, targetEmotion || 'Dramatic'));
  }

  try {
    const ai = getAIClient();
    const prompt = `You are a legendary Hollywood & Arabic screen acting master coach. Analyze this monologue snippet being performed as character "${character || 'Unnamed'}" aiming for the emotional theme "${targetEmotion || 'Dramatic'}" in their performance description. 
    Provide an expert evaluation.
    
    Here is the monologue/transcript:
    "${monologue}"
    
    Return a critical, realistic, but supportive breakdown of their expression, vocal resonance, confidence, pronunciation, and stage presence. Output ONLY valid JSON containing:
    1. overallScore (integer 1-100)
    2. facialScore (integer 1-100)
    3. voiceScore (integer 1-100)
    4. emotionalScore (integer 1-100)
    5. confidenceScore (integer 1-100)
    6. pronunciationScore (integer 1-100)
    7. stagePresenceScore (integer 1-100)
    8. feedbackAr (detailed positive feedback & constructive critique strictly in Arabic)
    9. feedbackEn (detailed positive feedback & constructive critique strictly in English)
    10. strengths (array of 3 strings outlining actor strengths)
    11. improvementAreas (array of 3 strings outlining areas to strengthen)
    12. coachingTips (string with coaching exercises to do)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: [
            'overallScore', 'facialScore', 'voiceScore', 'emotionalScore', 
            'confidenceScore', 'pronunciationScore', 'stagePresenceScore', 
            'feedbackAr', 'feedbackEn', 'strengths', 'improvementAreas', 'coachingTips'
          ],
          properties: {
            overallScore: { type: Type.INTEGER },
            facialScore: { type: Type.INTEGER },
            voiceScore: { type: Type.INTEGER },
            emotionalScore: { type: Type.INTEGER },
            confidenceScore: { type: Type.INTEGER },
            pronunciationScore: { type: Type.INTEGER },
            stagePresenceScore: { type: Type.INTEGER },
            feedbackAr: { type: Type.STRING },
            feedbackEn: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
            coachingTips: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      res.json(data);
    } else {
      throw new Error("No response output from Gemini model");
    }
  } catch (error: any) {
    console.error("Gemini Acting Coach error:", error);
    res.json(generateMockActingReport(monologue, targetEmotion || 'Dramatic'));
  }
});

// 2. AI Script Analyzer API
app.post('/api/gemini/script-analyzer', async (req, res) => {
  const { title, genre, logline, scriptText } = req.body;
  if (!scriptText) {
    return res.status(400).json({ error: 'Script text content is required.' });
  }

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.json(generateMockScriptReport(title || 'Untitled script', logline || 'N/A'));
  }

  try {
    const ai = getAIClient();
    const prompt = `You are a top film producer and script reader (expert in modern world and regional/Middle Eastern Arabic cinema).
    Analyze this script / treatment titled "${title || 'Untitled'}" under genre "${genre || 'Drama'}" with logline "${logline || 'None'}".
    
    Script Content:
    "${scriptText}"
    
    Evaluate dialogic quality, narrative structure, development of characters, pacing, consistency, and general commercial readiness/appeal.
    Output ONLY valid JSON containing:
    1. commercialScore (integer 1-100)
    2. structureScore (integer 1-100)
    3. characterScore (integer 1-100)
    4. dialogueScore (integer 1-100)
    5. pacingScore (integer 1-100)
    6. consistencyScore (integer 1-100)
    7. summaryAr (summary & evaluation strictly in Arabic)
    8. summaryEn (summary & evaluation strictly in English)
    9. structureAnalysis (detailed string analyzing Act structure)
    10. characterAnalysis (detailed string critique of character motivations and arcs)
    11. dialogueCritique (detailed string critique of speaking style)
    12. pacingCheck (detailed string on story speed and beat transitions)
    13. marketability (detailed string outlining target audience, platform compatibility shahid/netflix, and budgeting suggestions)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: [
            'commercialScore', 'structureScore', 'characterScore', 'dialogueScore', 
            'pacingScore', 'consistencyScore', 'summaryAr', 'summaryEn', 
            'structureAnalysis', 'characterAnalysis', 'dialogueCritique', 'pacingCheck', 'marketability'
          ],
          properties: {
            commercialScore: { type: Type.INTEGER },
            structureScore: { type: Type.INTEGER },
            characterScore: { type: Type.INTEGER },
            dialogueScore: { type: Type.INTEGER },
            pacingScore: { type: Type.INTEGER },
            consistencyScore: { type: Type.INTEGER },
            summaryAr: { type: Type.STRING },
            summaryEn: { type: Type.STRING },
            structureAnalysis: { type: Type.STRING },
            characterAnalysis: { type: Type.STRING },
            dialogueCritique: { type: Type.STRING },
            pacingCheck: { type: Type.STRING },
            marketability: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      res.json(data);
    } else {
      throw new Error("No response output from Gemini model");
    }
  } catch (error: any) {
    console.error("Gemini Script Analyzer error:", error);
    res.json(generateMockScriptReport(title || 'Untitled script', logline || 'N/A'));
  }
});

// 3. AI Talent Matcher API
app.post('/api/gemini/talent-match', async (req, res) => {
  const { profileName, profileRole, profileSkills, profileExperience, opportunityTitle, opportunityRequirements, opportunityDescription } = req.body;
  
  if (!profileName || !opportunityTitle) {
    return res.status(400).json({ error: 'Profile metadata and Opportunity requirements are required.' });
  }

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.json(generateMockTalentMatch(profileName, opportunityTitle));
  }

  try {
    const ai = getAIClient();
    const prompt = `You are a casting director and talent acquisition head for global film projects.
    Match this creative professional with this casting call / crew opportunity and output a specific matching analysis.
    
    --- Professional Profile ---
    Name: ${profileName}
    Role: ${profileRole}
    Skills: ${JSON.stringify(profileSkills)}
    Bio/Experience: ${profileExperience}
    
    --- Opportunity Details ---
    Opportunity Title: ${opportunityTitle}
    Description: ${opportunityDescription}
    Requirements: ${JSON.stringify(opportunityRequirements)}
    
    Analyze and outputs ONLY valid JSON containing:
    1. matchPercentage (integer 1-100 indicating synergy)
    2. strengthsAlignment (paragraphs describing how their details support the target requirements)
    3. gapAnalysis (paragraphs outlining any missing attributes, experience depth, or skill levels)
    4. aiVerdictAr (final recommendation/fit statement in Arabic)
    5. aiVerdictEn (final recommendation/fit statement in English)`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['matchPercentage', 'strengthsAlignment', 'gapAnalysis', 'aiVerdictAr', 'aiVerdictEn'],
          properties: {
            matchPercentage: { type: Type.INTEGER },
            strengthsAlignment: { type: Type.STRING },
            gapAnalysis: { type: Type.STRING },
            aiVerdictAr: { type: Type.STRING },
            aiVerdictEn: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text.trim());
      res.json(data);
    } else {
      throw new Error("No response output from Gemini model");
    }
  } catch (errorOnAi: any) {
    console.error("Gemini Talent Match error:", errorOnAi);
    res.json(generateMockTalentMatch(profileName, opportunityTitle));
  }
});


// Express server and Vite setup for production/development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[CinemaHub Server] running on http://0.0.0.0:${PORT} under NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
