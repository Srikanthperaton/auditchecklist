import React, { useState } from "react";
import { Question, QuestionComponent, Rule } from "./Question";

interface RowSection {
  name: string;
  included: string | null;
  isVisible: boolean;
  questions: Question[];
}

export interface SubSection {
  name: string;
  included: string | null;
  isVisible: boolean;
  questions: Question[];
  [rowKey: string]: RowSection | unknown;
}

interface SubSectionProps {
  subSection: SubSection;
  sectionId: string;
}

export const SubSectionComponent: React.FC<
  SubSectionProps & {
    handleChange: (
      uniqueId: string,
      value: any,
      id: number,
      Rules: Rule
    ) => void;
    formData: any;
    parentSectionName: string;
  }
> = ({ subSection, handleChange, formData, parentSectionName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleRow = (rowKey) => {
    setExpandedRows((prevState) => {
      const newState = {
        ...prevState,
        [rowKey]: !prevState[rowKey],
      };
      return newState;
    });
  };

  type GroupQuestionByRow = (questions: Question[]) => {
    [key: string]: Question[];
  };

  const groupQuestionsByRow: GroupQuestionByRow = (questions: Question[]) => {
    if (!Array.isArray(questions)) {
      return {} as {
        [key: string]: Question[];
      };
    }

    return questions.reduce(
      (groupedQuestions, question) => {
        const { row } = question;
        if (!groupedQuestions[row]) {
          groupedQuestions[row] = [];
        }
        groupedQuestions[row].push(question);
        return groupedQuestions;
      },
      {} as {
        [key: string]: Question[];
      }
    );
  };
  const questionGroupStyle =
    "bg-gray-100 p-2 mt-3 border border-gray-300 rounded-lg";
  const renderDirectQuestions = () => {
    const groupedQuestions = groupQuestionsByRow(subSection.questions);
    return Object.entries(groupedQuestions).map(([rowNumber, questions]) => (
      <div
        key={`row-${rowNumber}`}
        className={`question-group ${questionGroupStyle}`}
      >
        {questions.map((question, questionIndex) => {
          const uniqueKey = `section-${parentSectionName}-subsection-${subSection.name}-row-${rowNumber}-question-${question.id}-${questionIndex}`;
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
      </div>
    ));
  };

  const renderSubSectionRows = () => {
    return Object.entries(subSection as SubSection)
      .filter(
        ([key, value]) =>
          key.startsWith("row") && (value as RowSection).questions
      )
      .map(([rowKey, rowValue], rowIndex) => {
        const groupedQuestions = groupQuestionsByRow(
          (rowValue as RowSection).questions
        );
        return (
          <div
            key={`section-${parentSectionName}-subsection-${subSection.name}-${rowKey}-${rowIndex}`}
            className="row-section mt-2 p-3 bg-white rounded-md shadow-sm"
          >
            <div className="flex items-center mb-2">
              <h4 className="text-md font-semibold text-gray-800">
                {(rowValue as RowSection).name}
              </h4>
              &nbsp;&nbsp;
              <input
                type="checkbox"
                checked={expandedRows[rowKey] || false}
                onChange={() => toggleRow(rowKey)}
                className="form-checkbox  theme-controller h-4 w-4"
              />
            </div>
            {expandedRows[rowKey] &&
              Object.entries(
                groupedQuestions as {
                  [key: string]: Question[];
                }
              ).map(([rowNumber, questions]) => (
                <div key={rowNumber} className="question-group">
                  {questions.map((question, questionIndex) => {
                    const uniqueKey = `section-${parentSectionName}-subsection-${subSection.name}-${rowKey}-question-${question.id}-${questionIndex}`;
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
                </div>
              ))}
          </div>
        );
      });
  };

  if (!subSection.isVisible) return null;

  return (
    <div className="subsection mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <div className="flex items-center mb-2">
        <h3 className="text-md font-semibold text-blue-700">
          {subSection.name}
        </h3>
        &nbsp;&nbsp;
        <input
          type="checkbox"
          checked={isExpanded}
          onChange={handleToggle}
          className="form-checkbox theme-controller h-4 w-4"
        />
      </div>
      {isExpanded && (
        <div>
          {renderDirectQuestions()}
          {renderSubSectionRows()}
        </div>
      )}
    </div>
  );
};
