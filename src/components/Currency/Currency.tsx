import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CurrencySelector from "./CurrencySelector";

// Porada: axios.get(`http.....') kod jest powtarzany, mozna stworzyc funkcje (zadeklarowana przed funkcja komponentu, ktora obsluzy to )
// - najkorzystniej byloby aby mozna bylo odpalic getCurrencyData(currencyName: string)

const Currency = () => {
  const [inSelected, setInSelected] = useState("chf");
  const [outSelected, setOutSelected] = useState("usd");

  const [startAmount, setStartAmuount] = useState("0");

  const [inCurrency, setInCurrency] = useState(0); // change name to firstCurrencyValueInPLN
  useEffect(() => {
    axios
      .get(`http://api.nbp.pl/api/exchangerates/rates/a/${inSelected}/?`)
      .then((inCurrencyData) =>
        setInCurrency(inCurrencyData.data.rates[0].mid)
      );
  }, [inSelected]);

  const [outCurrency, setOutCurrency] = useState(0); // change name to secondCurrencyValueInPLN
  useEffect(() => {
    axios
      .get(`http://api.nbp.pl/api/exchangerates/rates/a/${outSelected}/?`)
      .then((outCurrencyData) =>
        setOutCurrency(outCurrencyData.data.rates[0].mid)
      );
  }, [outSelected]);

  console.log(inSelected);

  console.log(outSelected);

  const finalCash = (parseInt(startAmount) * inCurrency) / outCurrency;

  const setFirstCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInSelected(event.target.value);
  };

  const setSecondCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOutSelected(event.target.value);
  };

  return (
    <div>
      <input
        type="number"
        value={startAmount}
        onChange={(e) => setStartAmuount(e.target.value)}
      ></input>
      <CurrencySelector onChange={setFirstCurrency} />= {finalCash.toFixed(2)}
      <CurrencySelector onChange={setSecondCurrency} />
    </div>
  );
};

export default Currency;
