const { Telegraf } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN);

// Start message
bot.start((ctx) =>
  ctx.reply("👋 Welcome to TheVoiceMakerBot!\n\nSend me any text and I will convert it into audio.")
);

// Convert text to audio
bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  try {
    // Free TTS API
    const apiURL = `https://api.streamelements.com/kappa/v2/speech?voice=Brian&text=${encodeURIComponent(
      text
    )}`;

    const response = await axios.get(apiURL, { responseType: "arraybuffer" });

    await ctx.replyWithVoice(
      { source: Buffer.from(response.data) },
      { caption: "🎧 Your Voice Message is Ready!" }
    );
  } catch (error) {
    console.error(error);
    ctx.reply("❌ Error generating audio. Try again.");
  }
});

bot.launch();
