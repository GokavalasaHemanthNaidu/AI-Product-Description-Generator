
import { GoogleGenAI, Type } from "@google/genai";
import type { ProductDetails, ProductDescription } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateProductDescription(
  details: ProductDetails
): Promise<ProductDescription> {
  const prompt = `
    Generate a compelling product description based on the following details.

    Product Name: ${details.name}
    Product Category: ${details.category}
    Key Features/Benefits:
    ${details.features}
    Target Audience: ${details.audience}
    Tone of Voice: ${details.tone}

    Return the result as a JSON object with the specified schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            product_name: { 
              type: Type.STRING,
              description: "The name of the product." 
            },
            tagline: { 
              type: Type.STRING,
              description: "A catchy tagline for the product."
            },
            description: {
              type: Type.STRING,
              description: "A detailed and engaging description of the product."
            },
            key_features: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description: "A list of 3-5 key features or benefits."
            },
          },
          required: ["product_name", "tagline", "description", "key_features"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    return parsedJson as ProductDescription;
  } catch (error) {
    console.error("Error generating product description:", error);
    throw new Error(
      "Failed to generate product description. Please check your input or API key and try again."
    );
  }
}
