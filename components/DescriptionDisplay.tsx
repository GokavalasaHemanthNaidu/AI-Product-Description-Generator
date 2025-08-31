
import React from 'react';
import type { ProductDescription } from '../types';

interface DescriptionDisplayProps {
  description: ProductDescription | null;
  isLoading: boolean;
  error: string | null;
}

const DescriptionDisplay: React.FC<DescriptionDisplayProps> = ({
  description,
  isLoading,
  error,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full text-red-500">
           <ErrorIcon />
          <h3 className="text-xl font-semibold mt-4">Generation Failed</h3>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      );
    }

    if (!description) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full text-gray-500">
            <InitialIcon />
            <h3 className="text-xl font-semibold mt-4">Ready to Inspire</h3>
            <p className="mt-2 text-gray-400">Your generated product description will appear here.</p>
        </div>
      );
    }

    return (
      <div className="animate-fade-in space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{description.product_name}</h2>
          <p className="text-xl text-indigo-600 font-medium mt-1">{description.tagline}</p>
        </div>
        <div className="prose prose-lg max-w-none text-gray-600">
          <p>{description.description}</p>
        </div>
        <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Key Features:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
                {description.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg h-full overflow-y-auto">
      {renderContent()}
    </div>
  );
};

const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-full"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
      </div>
       <div className="space-y-3 pt-4">
        <div className="h-5 bg-gray-200 rounded-md w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded-md w-3/5"></div>
      </div>
    </div>
)

const InitialIcon = () => (
    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    </div>
)

const ErrorIcon = () => (
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
)

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
)

export default DescriptionDisplay;
