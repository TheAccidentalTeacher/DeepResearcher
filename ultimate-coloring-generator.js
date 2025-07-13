// 🎨 ULTIMATE COLORING PAGE GENERATOR
// Combines DALL-E 3 + Stability AI for maximum coloring page power!

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

// 🔑 Your API Keys
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';
const STABILITY_API_KEY = process.env.STABILITY_API_KEY || 'YOUR_STABILITY_API_KEY_HERE';

// 🎯 AMAZING COLORING PAGE PROMPTS
const coloringPrompts = [
    // Animals
    "Simple black and white line drawing of a friendly dragon, coloring book style, clean outlines, no shading, perfect for kids",
    "Line art of a cute penguin family, coloring book page style, simple outlines, no fills, child-friendly design",
    "Black and white drawing of a majestic lion, coloring book style, bold outlines, no shading, suitable for children",
    
    // Fantasy & Magic
    "Simple line drawing of a fairy house with mushrooms, coloring book style, whimsical design, no shading, perfect for coloring",
    "Black and white line art of a wizard's castle, coloring book page style, simple outlines, magical theme for kids",
    "Line drawing of a mermaid with flowing hair, coloring book style, clean outlines, no fills, child-friendly",
    
    // Nature & Flowers
    "Beautiful mandala flower design, coloring book style, intricate but simple patterns, black lines on white background",
    "Line art of a garden scene with butterflies, coloring book page style, simple outlines, perfect for children to color",
    "Black and white drawing of a rainbow over mountains, coloring book style, clean outlines, no shading",
    
    // Vehicles & Adventure
    "Simple line drawing of a pirate ship, coloring book style, bold outlines, adventure theme, perfect for kids",
    "Black and white rocket ship in space, coloring book page style, simple design, no shading, child-friendly"
];

// 🚀 DALL-E 3 Generator (PROVEN WORKING!)
async function generateWithDALLE(prompt, filename) {
    console.log(`🎨 Generating with DALL-E 3: "${prompt}"`);
    
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
                quality: "standard",
                style: "natural"
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
            const imageUrl = result.data[0].url;
            const imageResponse = await fetch(imageUrl);
            const imageBuffer = await imageResponse.arrayBuffer();
            fs.writeFileSync(filename, Buffer.from(imageBuffer));
            console.log(`✅ DALL-E SUCCESS: ${filename} ($0.04)`);
            return true;
        }
        
    } catch (error) {
        console.log(`❌ DALL-E Error: ${error.message}`);
        return false;
    }
}

// ⚡ Stability AI Generator 
async function generateWithStability(prompt, filename) {
    console.log(`⚡ Generating with Stability AI: "${prompt}"`);
    
    try {
        const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STABILITY_API_KEY}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                text_prompts: [
                    { text: prompt, weight: 1 },
                    { text: "photorealistic, 3d render, shading, shadows, gradients, colors, filled shapes", weight: -1 }
                ],
                cfg_scale: 8,
                height: 1024,
                width: 1024,
                steps: 25,
                samples: 1,
                style_preset: "line-art"
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        
        const result = await response.json();
        
        if (result.artifacts && result.artifacts.length > 0) {
            const imageBuffer = Buffer.from(result.artifacts[0].base64, 'base64');
            fs.writeFileSync(filename, imageBuffer);
            console.log(`✅ Stability SUCCESS: ${filename} (~$0.01)`);
            return true;
        }
        
    } catch (error) {
        console.log(`❌ Stability Error: ${error.message}`);
        return false;
    }
}

// 🎯 ULTIMATE COLORING PAGE GENERATOR
async function generateUltimateColoringPages() {
    console.log('🚀 ULTIMATE COLORING PAGE GENERATOR STARTING!');
    console.log(`📝 Will generate ${coloringPrompts.length} amazing coloring pages\n`);
    
    let dalleCount = 0;
    let stabilityCount = 0;
    
    for (let i = 0; i < coloringPrompts.length; i++) {
        const prompt = coloringPrompts[i];
        const timestamp = Date.now();
        
        console.log(`\n📋 Prompt ${i + 1}/${coloringPrompts.length}:`);
        console.log(`"${prompt}"\n`);
        
        // Try Stability AI first (cheaper)
        const stabilityFilename = `stability-coloring-${i + 1}-${timestamp}.png`;
        const stabilitySuccess = await generateWithStability(prompt, stabilityFilename);
        
        if (stabilitySuccess) {
            stabilityCount++;
        } else {
            // Fallback to DALL-E 3 (more expensive but reliable)
            console.log('🔄 Falling back to DALL-E 3...');
            const dalleFilename = `dalle-coloring-${i + 1}-${timestamp}.png`;
            const dalleSuccess = await generateWithDALLE(prompt, dalleFilename);
            
            if (dalleSuccess) {
                dalleCount++;
            }
        }
        
        // Wait between requests
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log('\n🎉 ULTIMATE COLORING PAGE GENERATION COMPLETE!');
    console.log(`📊 Results:`);
    console.log(`   ⚡ Stability AI: ${stabilityCount} images (~$${(stabilityCount * 0.01).toFixed(2)})`);
    console.log(`   🎨 DALL-E 3: ${dalleCount} images (~$${(dalleCount * 0.04).toFixed(2)})`);
    console.log(`   💰 Total Cost: ~$${(stabilityCount * 0.01 + dalleCount * 0.04).toFixed(2)}`);
    console.log(`   📁 Total Images: ${stabilityCount + dalleCount}`);
    console.log('\n🎨 Perfect coloring pages ready for kids to enjoy!');
}

// 🚀 START THE ULTIMATE GENERATOR!
generateUltimateColoringPages().catch(console.error);
