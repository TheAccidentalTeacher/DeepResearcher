// 🎨 Quick Stability AI Test - Single Coloring Page
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

async function generateSingleColoringPage() {
    const API_KEY = process.env.STABILITY_API_KEY || 'YOUR_STABILITY_API_KEY_HERE';
    
    const prompt = "Simple line drawing of a cute cat, coloring book style, black and white line art, no shading, clean outlines, suitable for children";
    
    console.log('🎨 Generating coloring page with Stability AI...');
    console.log(`📝 Prompt: "${prompt}"`);
    
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
                    }
                ],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                steps: 20,
                samples: 1
            })
        });
        
        console.log(`📡 Response status: ${response.status}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log(`❌ Error details: ${errorText}`);
            return;
        }
        
        const result = await response.json();
        console.log('✅ API call successful!');
        
        if (result.artifacts && result.artifacts.length > 0) {
            const imageBuffer = Buffer.from(result.artifacts[0].base64, 'base64');
            const filename = `cat-coloring-page-${Date.now()}.png`;
            fs.writeFileSync(filename, imageBuffer);
            console.log(`🎉 SUCCESS! Coloring page saved as: ${filename}`);
            console.log('💰 Cost: 1 credit (you have ~24 remaining)');
        } else {
            console.log('❌ No image in response');
        }
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

generateSingleColoringPage();
