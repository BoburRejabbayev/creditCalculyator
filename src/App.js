import React from 'react';
import './app.css'
import Table from './Table';

function App() {

  const [credit, setCredit] = React.useState([])
  const [perMonth, setPerMonth] = React.useState([])
  const [foizi, setFoizi] = React.useState([])
  const [asosiy, setAsosiy] = React.useState([])
  const [table, setTable] = React.useState(false)

  const onClicked = () => {
    let kef = (24 / (12)) / 100
    let pow = Number(credit.time) * 12
    let monthKef = (kef * (Math.pow((1 + kef), pow))) / (Math.pow((1 + kef), pow) - 1)
    let foizSumma = credit.summ
    for (let i = 1; i <= Number(credit.time) * 12; i++) {
      foizi.push(Math.floor(foizSumma * 0.02))
      asosiy.push(Math.floor(Number(credit.summ) * monthKef) - foizi[i - 1])
      foizSumma = foizSumma - (Math.floor(Number(credit.summ) * monthKef) - foizSumma * 0.02)
      perMonth.push(Math.floor(Number(credit.summ) * monthKef))
    }
    setTable(true)
  }

  return (
    <div className='app'>
      <div>
        <input onChange={(el) => setCredit({ summ: el.target.value })} type='text' placeholder='Summani kefiriting' />
        <input onChange={(el) => setCredit({ ...credit, time: el.target.value })} type='text' placeholder='Muddatni kefiriting (yilda)' />
        <input type='number' disabled placeholder='Credit Foizi 24%' className='input-color' />
        <button className='' onClick={onClicked} >Click</button>
      </div>
      {table ?
        <div>
          <Table
            summ={perMonth}
            foiz={foizi}
            asosiy={asosiy}
            creditTime={credit.time}
            creditSumm={credit.summ}
            overalSumm={perMonth[1] * Number(credit.time) * 12}
          />
        </div>
        : <div>fkjbewkj</div>
      }


    </div>
  );
}

export default App;
