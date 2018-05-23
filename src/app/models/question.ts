export class Question {
    id: number;
    name: string;
    categoryId: number;
    // answers: Answer[];
    explain: string;
}

export class Answer {
    answerId: number;
    answerName: string;
    isCorrect: boolean;
}