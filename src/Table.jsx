import React from 'react'
import TableList from './TableList'

export default function Table({ summ, creditSumm, creditTime, foiz, asosiy, overalSumm }) {

    const date = new Date()
    let [day, month, year] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear()
    ]
    const months = ["Yanvar", "fevral", 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr']
    const paymentMonths = []
    const [years, setYears] = React.useState([])
    let fisrtPayment = month
    let paymentYear = year
    for (let i = 0; i < creditTime * 12; i++) {
        let count = 0
        if (fisrtPayment >= 12) {
            count = 0;
            paymentYear = paymentYear + 1
            fisrtPayment = 0
        }
        count = count + 1
        years.push(paymentYear)
        paymentMonths.push(months[fisrtPayment])
        fisrtPayment++
    }

    return (
        <div>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date to payment</th>
                        {/* <th scope="col">Month</th> */}
                        <th scope="col">asosiy</th>
                        <th scope="col">foiz</th>
                        <th scope="col">summa</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        summ.map((_, index) =>
                            <TableList
                                key={index}
                                month={paymentMonths[index]}
                                day={day}
                                year={years[index]}
                                foiz={foiz[index]}
                                asosiy={asosiy[index]}
                                summ={summ[index]}
                                index={index}
                            />
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Overal:</th>
                        <th scope="col">Asosiy Summa: {creditSumm} </th>
                        <th scope="col">foiz summa: {overalSumm - creditSumm} </th>
                        <th scope="col">Umumiy summa: {overalSumm} </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
