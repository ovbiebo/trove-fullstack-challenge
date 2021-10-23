import {Doughnut} from "react-chartjs-2";

const EquityChart = () => {
    return <Doughnut
        width={100}
        height={100}
        data={
            {
                labels: ['Equity', 'Fixed Income', 'Cash'],
                datasets: [{
                    data: [1, 0, 0],
                    backgroundColor: [
                        'rgba(252, 103, 103, 1)',
                        'rgba(237, 8, 137, 1)',
                        'rgba(150, 201, 61, 1)',
                    ],
                    borderWidth: 0,
                }]
            }
        }
        options={
            {
                cutout: 110,
            }
        }
    />
}

export {EquityChart}
