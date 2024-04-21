import React, { useState } from "react";
import { Question, QuestionComponent, Rule } from "./Question";
import { SubSection, SubSectionComponent } from "./SubSection";

export interface Section {
  name: string;
  included: string | null;
  isVisible: boolean;
  questions: Question[];
  subSections?: SubSection[];
}

interface SectionProps {
  section: Section;
  sectionId: string;
  handleChange: (uniqueId: string, value: any, id: number, Rules: Rule) => void;
  formData: {
    [key: string]: {
      value: string | boolean;
      isValid: boolean;
      id: number;
      Rules: Rule;
    };
  };
  resetSectionFormData: (sectionName: string) => void;
}

export const SectionComponent: React.FC<SectionProps> = ({
  section,
  handleChange,
  formData,
  resetSectionFormData,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      resetSectionFormData(section.name);
    }
    setIsExpanded(!isExpanded);
  };

  if (!section.isVisible) return null;

  return (
    <div className="p-4 my-2 border border-gray-200 rounded shadow section">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={isExpanded}
          onChange={handleToggle}
          //className="form-checkbox h-5 w-5 text-blue-600 mr-2"
          className="form-checkbox theme-controller h-4 w-4"
        />
        &nbsp;&nbsp;
        <h2 className="text-lg font-semibold text-gray-700">{section.name}</h2>
      </div>
      {isExpanded && (
        <div>
          {section.questions &&
            section.questions.map((question) => {
              const uniqueKey = `section-${section.name}-none-row-0-question-${question.id}`;
              return (
                <QuestionComponent
                  key={uniqueKey}
                  question={question}
                  handleChange={handleChange}
                  formData={formData}
                  uniqueId={uniqueKey}
                />
              );
            })}
          {section.subSections &&
            section.subSections.map((subSection, subSectionIndex) => (
              <SubSectionComponent
                key={`section-${section.name}-subsection-${subSection.name}-${subSectionIndex}`}
                subSection={subSection}
                sectionId={`section-${section.name}`}
                handleChange={handleChange}
                formData={formData}
                parentSectionName={section.name}
              />
            ))}
        </div>
      )}
    </div>
  );
};
