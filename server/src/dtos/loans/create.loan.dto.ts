export interface CreateLoanDto {
    applicantId: string;
    duration: number;
    dateIssued: Date;
    amount: number;
    status: number;
}
