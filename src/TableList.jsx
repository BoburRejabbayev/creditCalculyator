import React from 'react'

export default function TableList({day, month, summ, year, index, foiz, asosiy }) {
    return (
        <>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{day}-{month} {year}</td>
                <td>{asosiy}</td>
                <td>{foiz}</td>
                <td>{summ}</td>
            </tr>
        </>
    )
}
