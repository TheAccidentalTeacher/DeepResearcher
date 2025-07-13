// 🎨 OpenAI DALL-E 3 Coloring Page Generator
// Using your existing API key for immediate coloring page generation!

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

async function generateColoringPageWithDALLE() {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';
    
    // 🎯 Coloring page prompts optimized for DALL-E 3
    const prompts = [
        "A simple black and white line drawing of a cute elephant in coloring book style. Clean outlines, no shading, no fills, perfect for children to color. White background, black lines only.",
        "Black and white line art of a magical unicorn, coloring book page style. Simple outlines, no shading or gradients, designed for kids to color in.",
        "A simple line drawing of a beautiful butterfly with detailed wing patterns, coloring book style. Black outlines on white background, no shading, suitable for children."
    ];
    
    console.log('🎨 Generating coloring pages with OpenAI DALL-E 3...\n');
    
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        console.log(`📝 Testing Prompt ${i + 1}:`);
        console.log(`"${prompt}"\n`);
        
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
                    style: "natural"  // More realistic than vivid for line art
                })
            });
            
            if (!response.ok) {
                const error = await response.text();
                console.log(`❌ Error: ${response.status} - ${error}\n`);
                continue;
            }
            
            const result = await response.json();
            
            if (result.data && result.data.length > 0) {
                const imageUrl = result.data[0].url;
                console.log(`✅ SUCCESS! Generated coloring page ${i + 1}`);
                console.log(`🔗 Image URL: ${imageUrl}`);
                console.log(`💰 Cost: $0.04 (4 cents per image)\n`);
                
                // Download the image
                const imageResponse = await fetch(imageUrl);
                const imageBuffer = await imageResponse.buffer();
                const filename = `dalle-coloring-page-${i + 1}-${Date.now()}.png`;
                fs.writeFileSync(filename, imageBuffer);
                console.log(`💾 Saved as: ${filename}\n`);
                
            } else {
                console.log(`❌ No image generated for prompt ${i + 1}\n`);
            }
            
            // Wait 5 seconds between requests (DALL-E has rate limits)
            await new Promise(resolve => setTimeout(resolve, 5000));
            
        } catch (error) {
            console.log(`❌ Error generating image ${i + 1}:`, error.message, '\n');
        }
    }
    
    console.log('🎉 DALL-E 3 coloring page generation complete!');
    console.log('📁 Check your current directory for the generated PNG files');
    console.log('🎨 Each file is a professional-quality coloring page!');
    console.log('💡 While we fix Stability AI, you can use DALL-E 3 for amazing results!');
}

// 🚀 Generate coloring pages with DALL-E 3!
generateColoringPageWithDALLE().catch(console.error);
