import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-error to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name="AlertTriangle" size={40} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}. Don't worry, we're here to help you get back on track with your tasks.
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2 shadow-lg"
        >
          <ApperIcon name="RotateCcw" size={18} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default Error;