import { FC, useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const Home: FC<any> = () => {
  const [values, setValues] = useState<any>({
    firstNumber: false,
    secondNumber: false,
    thirdNumber: false
  })
  const [operator, setOperator] = useState<string>("+")
  const [result, setResult] = useState<number>(0)
  const [showModalError, setShowModalError] = useState<boolean>(false)
  const [checked1, setChecked1] = useState<boolean>(true)
  const [checked2, setChecked2] = useState<boolean>(true)
  const [checked3, setChecked3] = useState<boolean>(true)

  const handleChange = (e: any): void => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleCount = (): void => {
    const valuesToArray = Object.values(values)

    let res: any = 0
    if (operator !== '+') res = valuesToArray[0] || 0
    valuesToArray.map((value: any, i: number) => {
      const numberValue = Number(value)
      switch (operator) {
        case '-':
          if (i !== 0 && numberValue !== 0) res = res - numberValue
          break;
        case '*':
          if (i !== 0 && numberValue !== 0) res = res * numberValue
          break;
        case '/':
          if (i !== 0 && numberValue !== 0) res = res / numberValue
          break;
        default:
          res = res + numberValue
          break;
      }
    })
    setResult(res)
  }

  const handleOnclickCheck = (param: number) => {
    if (param === 1) {
      setChecked1(!checked1)
      setValues({ ...values, firstNumber: false })

    }
    if (param === 2) {
      setChecked2(!checked2)
      setValues({ ...values, secondNumber: false })
    }
    if (param === 3) {
      setChecked3(!checked3)
      setValues({ ...values, thirdNumber: false })
    }
  }

  const validate = () => {
    const listDisabled = [
      checked1,
      checked2,
      checked3
    ]
    const countDisabled = listDisabled.filter(v => v === false)
    if (countDisabled.length === 1)
      setShowModalError(true)
    else
      setShowModalError(false)
  }


  useEffect(() => {
    if (values !== null) handleCount()
  }, [values, operator])

  useEffect(() => {
    validate()
  }, [checked1, checked2, checked3])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Simple Calculator</a>
        </h1>

        <p className={styles.description}>
          Technical test for freelance web nusantech
        </p>

        <div className={styles.calculator}>
          <div className={styles.input}>
            <div className={styles.input_item}>
              <input
                type="number"
                onKeyUp={checked1 ? () => { } : handleChange}
                disabled={checked1}
                name="firstNumber"
              />
              <input
                type="checkbox"
                className={styles.input_checkbox}
                onClick={() => handleOnclickCheck(1)}
              />
            </div>
            <div className={styles.input_item}>
              <input
                type="number"
                onKeyUp={checked2 ? () => { } : handleChange}
                disabled={checked2}
                name="secondNumber"
              />
              <input
                type="checkbox"
                className={styles.input_checkbox}
                onClick={() => handleOnclickCheck(2)}
              />
            </div>
            <div className={styles.input_item}>
              <input
                type="number"
                onKeyUp={checked3 ? () => { } : handleChange}
                disabled={checked3}
                name="thirdNumber"
              />
              <input
                type="checkbox"
                className={styles.input_checkbox}
                onClick={() => handleOnclickCheck(3)}
              />
            </div>
          </div>

          <div className={styles.operator}>
            <div className={styles.operator_item}>
              <input
                type="radio"
                name="operator"
                onClick={() => setOperator("+")}
                className={styles.operator_radio}
                defaultChecked={operator === "+"}
              />
              <label>+</label>
            </div>
            <div className={styles.operator_item}>
              <input
                type="radio"
                name="operator"
                onClick={() => setOperator("-")}
                className={styles.operator_radio}
                defaultChecked={operator === "-"}
              />
              <label>-</label>
            </div>
            <div className={styles.operator_item}>
              <input
                type="radio"
                name="operator"
                onClick={() => setOperator("*")}
                className={styles.operator_radio}
                defaultChecked={operator === "*"}
              />
              <label>X</label>
            </div>
            <div className={styles.operator_item}>
              <input
                type="radio"
                name="operator"
                onClick={() => setOperator("/")}
                className={styles.operator_radio}
                defaultChecked={operator === "/"}
              />
              <label>/</label>
            </div>
          </div>

          <div className={styles.result}>
            <h3>Hasil: {result}</h3>
          </div>
        </div>
      </main>
      {showModalError &&
        <div className={styles.modal_backgroud}>
          <div className={styles.modal_content}>
            <h2>Tidak boleh hanya 1 input</h2>
            <p>
              Silakan tambah inputan anda
            </p>
            <button onClick={() => setShowModalError(false)}>kembali</button>
          </div>
        </div>
      }

      <footer className={styles.footer}>
        <a
          href="https://www.linkedin.com/in/helmi-fauzi-12b872143/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            {' '} Helmi Fauzi
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
