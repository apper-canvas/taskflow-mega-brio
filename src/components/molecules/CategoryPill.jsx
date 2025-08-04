import React from "react";
import ApperIcon from "@/components/ApperIcon";

const CategoryPill = ({ category, onClick, isSelected = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200 transform hover:scale-105
        ${isSelected 
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      <ApperIcon name={category.icon} size={14} />
      <span>{category.name}</span>
      <span className={`
        text-xs px-1.5 py-0.5 rounded-full
        ${isSelected ? "bg-white/20" : "bg-gray-200"}
      `}>
        {category.taskCount}
      </span>
    </button>
  );
};

export default CategoryPill;