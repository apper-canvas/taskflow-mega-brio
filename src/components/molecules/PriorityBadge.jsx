import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    high: {
      variant: "high",
      icon: "AlertCircle",
      label: "High"
    },
    medium: {
      variant: "medium",
      icon: "Clock",
      label: "Medium"
    },
    low: {
      variant: "low",
      icon: "Minus",
      label: "Low"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <Badge variant={config.variant} className="flex items-center space-x-1">
      <ApperIcon name={config.icon} size={12} />
      <span>{config.label}</span>
    </Badge>
  );
};

export default PriorityBadge;