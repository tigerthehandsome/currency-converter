import { useEffect, useState } from "react";
import axios from "axios";

const CURRENCIES = ["TWD", "USD", "JPY", "CNY", "KRW", "GBP"];

export default function App() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("TWD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (fromCurrency && toCurrency && amount > 0) {
      convertCurrency();
    }
  }, [fromCurrency, toCurrency, amount]);

  const convertCurrency = async () => {
    try {
      const res = await axios.get(
        `https://v6.exchangerate-api.com/v6/123456778/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      setResult(res.data.conversion_result);
    } catch (error) {
      console.error("匯率查詢失敗：", error);
      setResult("錯誤");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">💸 幣幣叫轉換器</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="block mb-1">金額：</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex mb-4 gap-4">
          <div className="flex-1">
            <label className="block mb-1">從哪個貨幣：</label>
            <select
              className="w-full p-2 border rounded"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {CURRENCIES.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1">轉換成：</label>
            <select
              className="w-full p-2 border rounded"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {CURRENCIES.map((cur) => (
                <option key={cur}>{cur}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold">
            換算結果：{result !== null ? `${result} ${toCurrency}` : "載入中..."}
          </p>
        </div>
      </div>
    </div>
  );
}
