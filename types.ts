
import { ReactNode } from 'react';

export enum TestType {
  D2Attention = 'd2_attention',
  SpatialCubes = 'spatial_cubes',
  PersonalityQuestionnaire = 'personality_questionnaire',
  VerbalAnalogy = 'verbal_analogy',
  VisualMemory = 'visual_memory',
  Stroop = 'stroop_test',
  SentenceCompletion = 'sentence_completion',
  Generalization = 'generalization',
  MathematicalEquation = 'mathematical_equation',
  NumberSequence = 'number_sequence',
  OperatorPlacement = 'operator_placement',
  RavenMatrices = 'raven_matrices',
  WechslerIntelligence = 'wechsler_intelligence',
  SixteenPF = '16pf_personality',
  NeoBigFive = 'neo_big_five',
  MBTI = 'mbti_personality',
  LuscherColor = 'luscher_color',
  BeckDepression = 'beck_depression',
  ClockDrawing = 'clock_drawing',
  BentonVisual = 'benton_visual',
  GenericQuestionnaire = 'questionnaire',
}

export interface BaseTest {
  id: string;
  type: TestType;
  name: string;
  timeLimitMinutes: number;
  description: string;
}

export interface D2Test extends BaseTest {
  type: TestType.D2Attention;
  gridSize: { rows: number; cols: number };
  targetChar: string;
  distractors: string[];
  targetPercentage: number;
}

export interface SpatialCubesTest extends BaseTest {
  type: TestType.SpatialCubes;
  questions: {
    id: number;
    unfolded: { t: string; l: string; c: string; r: string; b: string };
    options: { t: string; f: string; r: string }[];
    correct: number;
  }[];
}

export interface QuestionnaireTest extends BaseTest {
  type: TestType.PersonalityQuestionnaire | TestType.SixteenPF | TestType.NeoBigFive | TestType.MBTI | TestType.GenericQuestionnaire;
  questions: {
    id: number;
    statement: string;
    category?: string;
    factor?: string;
    dimension?: string;
  }[];
}

export interface VerbalAnalogyTest extends BaseTest {
  type: TestType.VerbalAnalogy;
  questions: {
    id: number;
    analogy_part1: string;
    analogy_part2_stem: string;
    options: string[];
    correct_option: string;
  }[];
}

export interface VisualMemoryTest extends BaseTest {
  type: TestType.VisualMemory;
  memorizeTimeSeconds: number;
  questions: {
    id: number;
    pattern: number[];
    options: number[][];
    correct: number;
  }[];
}

export interface StroopTest extends BaseTest {
  type: TestType.Stroop;
  questions: {
    id: number;
    word: string;
    color: string;
  }[];
}

export interface SentenceCompletionTest extends BaseTest {
    type: TestType.SentenceCompletion;
    questions: {
        id: number;
        sentence_template: string;
        options: string[];
        correct_option: string;
    }[];
}

export interface GeneralizationTest extends BaseTest {
    type: TestType.Generalization;
    questions: {
        id: number;
        words: string[];
        options: string[];
        correct_concept: string;
        correct_pair_indices: number[];
    }[];
}

export interface MathematicalEquationTest extends BaseTest {
    type: TestType.MathematicalEquation;
    questions: {
        id: number;
        question: string;
        options: number[];
        correct_answer: number;
    }[];
}

export interface NumberSequenceTest extends BaseTest {
    type: TestType.NumberSequence;
    questions: {
        id: number;
        sequence: number[];
        options: number[];
        correct_next_number: number;
        rule_description: string;
    }[];
}

export interface OperatorPlacementTest extends BaseTest {
    type: TestType.OperatorPlacement;
    questions: {
        id: number;
        equation_template: string;
        correct_operators: string[];
    }[];
}

export interface RavenMatricesTest extends BaseTest {
    type: TestType.RavenMatrices;
    questions: {
        id: number;
        matrix: string[][];
        options: string[];
        correct: number;
    }[];
}

export interface WechslerIntelligenceTest extends BaseTest {
    type: TestType.WechslerIntelligence;
    questions: {
        id: number;
        type: string;
        question: string;
        options: (string | number)[];
        correct_answer: string | number;
    }[];
}


export interface LuscherColorTest extends BaseTest {
    type: TestType.LuscherColor;
    colors: { name: string; value: string; meaning: string }[];
}

export interface BeckDepressionTest extends BaseTest {
    type: TestType.BeckDepression;
    questions: {
        id: number;
        question: string;
        options: string[];
    }[];
}

export interface ClockDrawingTest extends BaseTest {
    type: TestType.ClockDrawing;
    instructions: string;
    scoring_criteria: string[];
}

export interface BentonVisualTest extends BaseTest {
    type: TestType.BentonVisual;
    memorizeTimeSeconds: number;
    questions: {
        id: number;
        shapes: { type: string; x: number; y: number; size: number; x1?: number; y1?: number; x2?: number; y2?: number; }[];
    }[];
}

export type AnyTest = 
    | D2Test 
    | SpatialCubesTest 
    | QuestionnaireTest 
    | VerbalAnalogyTest 
    | VisualMemoryTest 
    | StroopTest
    | SentenceCompletionTest
    | GeneralizationTest
    | MathematicalEquationTest
    | NumberSequenceTest
    | OperatorPlacementTest
    | RavenMatricesTest
    | WechslerIntelligenceTest
    | LuscherColorTest
    | BeckDepressionTest
    | ClockDrawingTest
    | BentonVisualTest;


export interface Result {
    type: TestType;
    timestamp: Date;
    [key: string]: any;
}

export type ModalContent = {
    title: string;
    body: ReactNode;
} | null;

export type ResultsHistory = Record<string, Result[]>;