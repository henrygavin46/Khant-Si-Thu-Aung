
export type QuestionType = 'single' | 'multiple' | 'text' | 'scale';

export interface Question {
  id: string;
  section: string;
  text: string;
  type: QuestionType;
  options?: string[];
  placeholder?: string;
  optional?: boolean;
  hasOther?: boolean;
}

export type SurveyResponses = Record<string, string | string[]>;

export interface SurveyState {
  currentStep: number;
  responses: SurveyResponses;
  isCompleted: boolean;
  declarationAgreed: boolean;
}
