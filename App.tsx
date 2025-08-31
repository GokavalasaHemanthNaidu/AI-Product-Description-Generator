
import React, { useState, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import DescriptionDisplay from './components/DescriptionDisplay';
import { generateProductDescription } from './services/geminiService';
import { ToneOfVoice } from './types';
import type { ProductDescription, ProductDetails } from './types';

const App: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: '',
    category: '',
    features: '',
    audience: '',
    tone: ToneOfVoice.FRIENDLY,
  });
  const [generatedDescription, setGeneratedDescription] = useState<ProductDescription | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedDescription(null);

    try {
      const result = await generateProductDescription(productDetails);
      setGeneratedDescription(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [productDetails]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            AI Product Description Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Craft compelling product descriptions in seconds. Fill in the details below and let AI do the writing.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:pr-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Details</h2>
            <ProductForm
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:pl-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Output</h2>
            <DescriptionDisplay
              description={generatedDescription}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
