import {Doughnut} from "react-chartjs-2";

const LoanPaymentChart = ({amountPaid, outstandingPrincipal}) => {
    return <Doughnut
        data={
            {
                labels: ['Amount Paid', 'Outstanding Principal'],
                datasets: [{
                    data: [amountPaid, outstandingPrincipal],
                    backgroundColor: [
                        'rgba(252, 103, 103, 1)',
                        'rgba(237, 8, 137, 1)',
                    ],
                    borderWidth: 4,
                }]
            }
        }
        options={
            {
                cutout: 70,
            }
        }
    />
}

export {LoanPaymentChart}
