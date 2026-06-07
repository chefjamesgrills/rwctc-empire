import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const accounts = [
  { handle: "kitchenbishery", voice: "chaotic kitchen energy, unhinged culinary humor", tags: ["#kitchenhumor", "#cheflife", "#foodmemes", "#kitchenvibes"] },
  { handle: "highlybakedgame", voice: "stoner gamer meets food culture, chill and absurd", tags: ["#gamingmemes", "#foodgaming", "#chillvibes", "#munchies"] },
  { handle: "itsbaltimoredummy", voice: "proud Baltimore local, city pride, hon energy", tags: ["#Baltimore", "#Bmore", "#BaltimoreLife", "#410"] },
  { handle: "baltimoreshyte", voice: "Baltimore observations, blunt and funny", tags: ["#Baltimore", "#BmoreMemes", "#410Life", "#Bmore"] },
  { handle: "bbljudge", voice: "judging everything with authority, no context given", tags: ["#Judgement", "#NoContext", "#Guilty", "#JudgeVibes"] },
  { handle: "officerpatchouli", voice: "beat cop who only cares about food crimes, deadpan", tags: ["#FoodCrimes", "#OfficerPat", "#FoodPolice", "#Deadpan"] },
  { handle: "pottychef", voice: "chef humor, bathroom jokes meet fine dining", tags: ["#ChefHumor", "#FineDining", "#KitchenLife", "#FoodMemes"] },
  { handle: "intelliscales", voice: "overthinking everything with fake precision", tags: ["#Overthinking", "#FakeScience", "#FoodMath", "#BigBrainMoves"] },
  { handle: "obeyhov", voice: "street philosopher, deep thoughts about nothing", tags: ["#Philosophy", "#DeepThoughts", "#StreetWisdom", "#Vibes"] },
  { handle: "phlybirdy", voice: "Philadelphia Birds fan trapped in Baltimore", tags: ["#PhillyInBaltimore", "#FlyEaglesFly", "#NFLMemes", "#BirdGang"] }
];

const CTA = `\n\n👨‍🍳 Follow @chefjamesgrills\n🎬 YouTube: @chefjamesgrills\n📱 TikTok LIVE: @chefjamesgrills`;

async function generateMeme(account) {
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are a social media meme writer for Instagram account @${account.handle}.
Voice: ${account.voice}
Write ONE meme caption or post idea. Max 3 sentences. No hashtags. Make it funny, specific, and shareable.
Output only the caption text, nothing else.`
      }
    ],
    max_tokens: 150
  });
  return response.choices[0].message.content.trim();
}

async function run() {
  const today = new Date().toISOString().split("T")[0];
  const queue = [];

  console.log(`\n🔥 RWCTC Meme Pipeline — ${today}\n`);

  for (const account of accounts) {
    const caption = await generateMeme(account);
    const hashtags = account.tags.join(" ");
    const fullPost = `${caption}${CTA}\n\n${hashtags}`;
    queue.push({ handle: account.handle, caption, fullPost, hashtags, date: today });
    console.log(`@${account.handle}:\n${fullPost}\n\n---\n`);
    await new Promise(r => setTimeout(r, 1000));
  }

  const outputPath = path.join(__dirname, `queue-${today}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(queue, null, 2));
  console.log(`✅ Queue saved to queue-${today}.json`);
}

run().catch(console.error);
