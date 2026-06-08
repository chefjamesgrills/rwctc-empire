import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const accounts = [
  { handle: "chefjamesgrills", voice: "CIA-trained pastry chef, fine dining meets real Baltimore life, warm but sharp", tags: ["#ChefLife", "#Chocolatier", "#Baltimore", "#PastryChef"] },
  { handle: "chefjamesgrill", voice: "Behind the chef coat, personal and craft-focused", tags: ["#ChefLife", "#FineDining", "#Baltimore"] },
  { handle: "mr.jamesgrill", voice: "Distinguished opinionated gentleman chef", tags: ["#ChefHumor", "#Culinary", "#Opinions"] },
  { handle: "officerpatchouli", voice: "Food police issuing citations for culinary crimes, deadpan serious", tags: ["#FoodPolice", "#OfficerPat", "#FoodCrimes"] },
  { handle: "urmomsfavchef", voice: "Charming flirtatious chef energy, mom jokes and cooking flex", tags: ["#ChefHumor", "#MomApproved", "#KitchenVibes"] },
  { handle: "pottychef", voice: "Bathroom humor meets fine dining, sophisticated filth", tags: ["#ChefHumor", "#FoodCrimes", "#Deadpan"] },
  { handle: "kitchenbishery", voice: "Unfiltered back-of-house kitchen chaos", tags: ["#KitchenLife", "#BOH", "#ChefProblems"] },
  { handle: "urkitchenbish", voice: "Savage kitchen commentary, zero patience for bad cooking", tags: ["#KitchenBish", "#CookingFails", "#BOH"] },
  { handle: "intelliscales", voice: "Overthinking food with fake scientific precision", tags: ["#FoodScience", "#Overthinking", "#BigBrainMoves"] },
  { handle: "bbljudge", voice: "Judge of all things BBL-adjacent, body positivity meets food chaos", tags: ["#BBLJudge", "#FoodMemes", "#Unhinged"] },
  { handle: "gettdipped", voice: "Everything gets dipped, chocolate sauces vibes", tags: ["#GettDipped", "#Chocolate", "#FoodPorn"] },
  { handle: "obeyhov", voice: "Street philosopher, deep thoughts about absolutely nothing", tags: ["#Philosophy", "#DeepThoughts", "#StreetWisdom"] },
  { handle: "phlybirdy", voice: "Philly Eagles fan trapped in Baltimore, sports suffering and pride", tags: ["#PhillyInBaltimore", "#FlyEaglesFly", "#BirdGang"] },
  { handle: "thesharpersharpiekit", voice: "Artsy and precise, finds beauty in culinary details", tags: ["#FoodArt", "#Aesthetic", "#Culinary"] },
  { handle: "fittymcfly", voice: "Fitness bro who loves food too much, constant internal conflict", tags: ["#FitFoodie", "#GainzVsGains", "#FoodFitness"] },
  { handle: "highlybakedgame", voice: "Elevated munchie culture, gourmet stoner energy", tags: ["#HighlyBaked", "#MunchieGourmet", "#Baked"] },
  { handle: "itsbaltimoredummy", voice: "Proud Baltimore local explaining the city to outsiders", tags: ["#Baltimore", "#ItsBaltimore", "#BmoreProud"] },
  { handle: "baltimoreshyte", voice: "Only-in-Baltimore absurdity, local chaos and pride", tags: ["#BaltimoreShyte", "#CharmCity", "#OnlyInBmore"] },
  { handle: "mdswagggg", voice: "Maryland pride, Old Bay everything, crab cake supremacy", tags: ["#Maryland", "#OldBay", "#CrabCakes"] },
  { handle: "thebaltimorewishtrees", voice: "Poetic hopeful and gritty Baltimore, wishful thinking for the city", tags: ["#Baltimore", "#BmoreHope", "#WishTrees"] }
];

const CTA = "\n\n🍽️ Follow @chefjamesgrills\n🎥 YouTube: @chefjamesgrills\n📱 TikTok LIVE: @chefjamesgrills";

async function generateMeme(account) {
  const result = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 150,
    messages: [{ role: "user", content: "You are a social media meme writer for Instagram account @" + account.handle + ". Voice: " + account.voice + "\nWrite ONE meme caption. Max 3 sentences. No hashtags. Funny, specific, shareable. Output only the caption, nothing else." }]
  });
  return result.choices[0].message.content.trim();
}

async function run() {
  const today = new Date().toISOString().split("T")[0];
  const queue = [];
  console.log("\n🔥 RWCTC Meme Pipeline — " + today + "\n");
  for (const account of accounts) {
    const caption = await generateMeme(account);
    const hashtags = account.tags.join(" ");
    const fullPost = caption + CTA + "\n\n" + hashtags;
    queue.push({ handle: account.handle, caption, fullPost, hashtags, date: today });
    console.log("@" + account.handle + ":\n" + fullPost + "\n\n---\n");
    await new Promise(r => setTimeout(r, 500));
  }
  const outputPath = path.join(__dirname, "queue-" + today + ".json");
  fs.writeFileSync(outputPath, JSON.stringify(queue, null, 2));
  console.log("✅ Queue saved to queue-" + today + ".json");
}

run().catch(console.error);
