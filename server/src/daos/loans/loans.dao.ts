import {CreateLoanDto} from "../../dtos/loans/create.loan.dto";

export interface LoansDao {
    addLoan: (loanFields: CreateLoanDto) => Promise<any>;
    getLoanById: (loanId: string) => Promise<CreateLoanDto | undefined>;
    getActiveLoanByApplicantId: (applicantId: string) => Promise<CreateLoanDto | undefined>;
    getLoansByApplicantId: (applicantId: string) => Promise<CreateLoanDto[]>;
}
