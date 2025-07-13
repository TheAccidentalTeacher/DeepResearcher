// 🎨 Stability AI Coloring Page Generator Test
// Let's create your first AI-generated coloring page!

async function generateColoringPage() {
    const API_KEY = 'YOUR_STABILITY_API_KEY_HERE'; // Replace with your actual Stability AI API key
    
    // 🎯 PROVEN COLORING PAGE PROMPTS
    const prompts = [
        "Simple line drawing of a cute elephant, coloring book style, black and white line art, no shading, no fills, clean bold outlines, suitable for children ages 4-8",
        "Line art drawing of a beautiful butterfly with detailed wings, coloring book page style, simple outlines, no shading, black lines on white background, child-friendly design",
        "Simple line drawing of a magical unicorn, coloring book style, clean outlines, no shading, suitable for coloring, fantasy theme for kids",
        "Line art of a flower garden with roses and daisies, coloring book style, no shading, black outlines only, perfect for children to color"
    ];
    
    console.log('🎨 Starting Stability AI Coloring Page Generation...\n');
    
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        console.log(`📝 Testing Prompt ${i + 1}:`);
        console.log(`"${prompt}"\n`);
        
        try {
            const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    text_prompts: [
                        {
                            text: prompt,
                            weight: 1
                        },
                        {
                            text: "blurry, photorealistic, 3d render, photograph, shading, shadows, gradients, colors, filled shapes",
                            weight: -1  // Negative prompt to avoid unwanted elements
                        }
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
                const error = await response.text();
                console.log(`❌ Error: ${response.status} - ${error}\n`);
                continue;
            }
            
            const result = await response.json();
            
            if (result.artifacts && result.artifacts.length > 0) {
                console.log(`✅ SUCCESS! Generated coloring page ${i + 1}`);
                console.log(`💾 Image data received (${result.artifacts[0].base64.length} characters)`);
                console.log(`💰 Credits used: 1 (you have ~${24 - i} left)\n`);
                
                // Save the image (base64 to file)
                const fs = require('fs');
                const imageBuffer = Buffer.from(result.artifacts[0].base64, 'base64');
                const filename = `coloring-page-${i + 1}-${Date.now()}.png`;
                fs.writeFileSync(filename, imageBuffer);
                console.log(`💾 Saved as: ${filename}\n`);
                
            } else {
                console.log(`❌ No image generated for prompt ${i + 1}\n`);
            }
            
            // Wait 2 seconds between requests to be respectful
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            console.log(`❌ Error generating image ${i + 1}:`, error.message, '\n');
        }
    }
    
    console.log('🎉 Coloring page generation test complete!');
    console.log('📁 Check your current directory for the generated PNG files');
    console.log('🎨 Each file is a coloring page ready for kids to color!');
}

// 🚀 Let's make some coloring pages!
generateColoringPage().catch(console.error);
