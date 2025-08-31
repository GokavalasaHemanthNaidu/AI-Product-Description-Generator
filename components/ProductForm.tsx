
import React from 'react';
import type { ProductDetails } from '../types';
import { TONE_OF_VOICE_OPTIONS } from '../constants';
import { ToneOfVoice } from '../types';
import Loader from './Loader';

interface ProductFormProps {
  productDetails: ProductDetails;
  setProductDetails: React.Dispatch<React.SetStateAction<ProductDetails>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productDetails,
  setProductDetails,
  onSubmit,
  isLoading,
}) => {
  const handleInputChange = <K extends keyof ProductDetails,>(
    field: K,
    value: ProductDetails[K]
  ) => {
    setProductDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-lg h-full"
    >
      <div>
        <label
          htmlFor="product-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Name
        </label>
        <input
          type="text"
          id="product-name"
          value={productDetails.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="e.g., SolarBloom Smart Garden"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
      </div>

      <div>
        <label
          htmlFor="product-category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Category
        </label>
        <input
          type="text"
          id="product-category"
          value={productDetails.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          placeholder="e.g., Home & Garden"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
      </div>

      <div>
        <label
          htmlFor="key-features"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Key Features & Benefits
        </label>
        <textarea
          id="key-features"
          rows={4}
          value={productDetails.features}
          onChange={(e) => handleInputChange('features', e.target.value)}
          placeholder="List key features, one per line.&#10;e.g., Self-watering system&#10;App-controlled lighting&#10;Organic seed pods"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
      </div>

      <div>
        <label
          htmlFor="target-audience"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Target Audience
        </label>
        <input
          type="text"
          id="target-audience"
          value={productDetails.audience}
          onChange={(e) => handleInputChange('audience', e.target.value)}
          placeholder="e.g., Urban dwellers, tech enthusiasts"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
      </div>

      <div>
        <label
          htmlFor="tone-of-voice"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tone of Voice
        </label>
        <select
          id="tone-of-voice"
          value={productDetails.tone}
          onChange={(e) =>
            handleInputChange('tone', e.target.value as ToneOfVoice)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition bg-white"
        >
          {TONE_OF_VOICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader />
            Generating...
          </>
        ) : (
          <>
          <SparklesIcon />
          Generate Description
          </>
        )}
      </button>
    </form>
  );
};

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1.586l.707-.707a1 1 0 011.414 1.414L7.414 6l.707.707a1 1 0 01-1.414 1.414L6 7.414V9a1 1 0 11-2 0V7.414l-.707.707a1 1 0 01-1.414-1.414L2.586 6l-.707-.707a1 1 0 011.414-1.414L4 4.586V3a1 1 0 011-1zM15 2a1 1 0 011 1v1.586l.707-.707a1 1 0 011.414 1.414L17.414 6l.707.707a1 1 0 01-1.414 1.414L16 7.414V9a1 1 0 11-2 0V7.414l-.707.707a1 1 0 01-1.414-1.414L12.586 6l-.707-.707a1 1 0 011.414-1.414L14 4.586V3a1 1 0 011-1zM10 10a1 1 0 011 1v1.586l.707-.707a1 1 0 111.414 1.414L12.414 14l.707.707a1 1 0 11-1.414 1.414L11 14.586V16a1 1 0 11-2 0v-1.414l-.707.707a1 1 0 11-1.414-1.414L7.586 14l-.707-.707a1 1 0 111.414-1.414L9 11.586V11a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
)


export default ProductForm;
