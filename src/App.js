import React from 'react';
// import './app.css'
import './app.scss'
import Table from './Table';

function App() {

  let credit = {}

  const [creditTypes, setCreditType] = React.useState(['Annuitet', 'Differensial'])
  const [activeType, setActiveType] = React.useState(['Annuitet'])
  const [openType, setOpenType] = React.useState(false)
  const typeIndex = creditTypes.findIndex((el) => el === activeType)
  const [perMonth, setPerMonth] = React.useState([])
  const [foizi, setFoizi] = React.useState([])
  const [asosiy, setAsosiy] = React.useState([])
  const [table, setTable] = React.useState(false)
  // const [calculating, setCalculating] = React.useState(['Hisoblash', 'clear'])
  const [activeCalculate, setActiveCalculate] = React.useState('Hisoblash')

  // const inputRef = React.useRef()

  const [summValue, setSummValue] = React.useState()
  const [timeValue, setTimeValue] = React.useState()
  const [percentValue, setPercentValue] = React.useState()


  const onClicked = () => {
    if (summValue > 1000000000 || timeValue > 10 || percentValue > 40) {
      alert('Notogri Malumot Kiritildi')
    }
    else {
      if (activeCalculate === 'Hisoblash') {
        credit = { summ: summValue, time: timeValue, percent: percentValue }
        setTable(true)
        console.log(credit.time);
        console.log(credit.summ);
        console.log(credit.percent);
        let foizSumma = credit.summ
        // Differensial
        if (activeType === 'Differensial') {
          for (let i = 1; i <= Number(credit.time) * 12; i++) {
            let foiz = Math.floor((foizSumma * (credit.percent * 5 / 6)) / 1000)
            foizi.push(foiz)
            asosiy.push(Math.floor(Number(credit.summ) / (Number(credit.time) * 12)))
            foizSumma = foizSumma - asosiy[i - 1]
            perMonth.push(asosiy[i - 1] + foizi[i - 1])
          }
        }
        // Annuitet
        else {
          for (let i = 1; i <= Number(credit.time) * 12; i++) {
            let kef = Number(credit.percent) / (100 * 12)
            let pow = Number(credit.time) * 12
            let monthKef = (kef * (Math.pow((1 + kef), pow))) / (Math.pow((1 + kef), pow) - 1)
            foizi.push(Math.floor(foizSumma * ((credit.percent * 5 / 6)) / 1000))
            asosiy.push(Math.floor(Number(credit.summ) * monthKef) - foizi[i - 1])
            foizSumma = foizSumma - asosiy[i - 1]
            perMonth.push(Math.floor(Number(credit.summ) * monthKef))
          }
        }
        setActiveCalculate('clear')
      }
      else if (activeCalculate === 'clear') {
        setTable(false)
        credit = {}
        setPerMonth([])
        setFoizi([])
        setAsosiy([])
        setSummValue('')
        setTimeValue('')
        setPercentValue('')
        setActiveCalculate('Hisoblash')
      }
    }
  }

  const onSelected = (i, el) => {
    setOpenType(!openType)
    setActiveType(el)

  }

  const onSetTypeCredit = (i, el) => {
    onSelected(i, el)
  }


  const onOpenTypes = () => {
    setOpenType(!openType)
  }

  return (
    <div className='app'>
      <div className='app__info'>
        {/* <input onChange={(el) => setCredit({ summ: el.target.value })} placeholder='Summani kefiriting' /> */}
        <div className="input-group">
          <input
            // ref={inputRef}
            value={summValue}
            onChange={(el) => setSummValue(el.target.value)}
            placeholder='Summani kefiriting'
            type="number"
            className="form-control"
            aria-label="Dollar amount (with dot and two decimal places)"
          />
          <span className="input-group-text">so'm</span>
        </div>
        <input
          // ref={inputRef}
          value={percentValue} type='number' onChange={(el) => setPercentValue(el.target.value)} placeholder='Credit Foizi 24%' className='input-color form-control' />
        <div className="sort">
          {openType &&
            <div className="sort__popup">
              <ul>
                {creditTypes.map((el, i) => <li onClick={() =>
                  onSetTypeCredit(i, el)}
                  className={typeIndex === i ? 'active' : ' '}
                  key={i} >{creditTypes[i]}</li>)}
              </ul>
            </div>
          }
          <div className="sort__label" onClick={() => onOpenTypes()} >
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#2C2C2C"
              />
            </svg>
            <span >{activeType}</span>
          </div>
        </div>


        <div className="input-group">
          <input
            //  ref={inputRef}
            value={timeValue} type="text" className="form-control" onChange={(el) => setTimeValue(el.target.value)} placeholder='Muddatni kefiriting (yilda)' aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button onClick={() => onClicked()} className="btn btn-outline-success" type="button" id="button-addon2">{activeCalculate}</button>
        </div>

      </div>
      {table ?
        <div>
          <Table
            summ={perMonth}
            foiz={foizi}
            asosiy={asosiy}
            creditTime={Number(timeValue)}
            creditSumm={summValue}
            overalSumm={perMonth.reduce((acc, el) => acc + el, 0)}
          />
        </div>
        : ''
      }



    </div>
  );
}

export default App;
