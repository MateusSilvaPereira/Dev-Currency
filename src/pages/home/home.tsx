/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { BiSearch } from "react-icons/bi";
import styles from "./home.module.css";

import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
//https://coinlib.io/api/v1/coinlist?key=cd3af65c4345669a&pref=BTC&page=1&order=volume_desc

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatdPrice: string;
  formatdMarket: string;
  numberDelta: number;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    function getData() {
      fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=cd3af65c4345669a&pref=BRL"
      )
        .then((response) => response.json())
        .then((data: DataProps) => {
          let coinsData = data.coins.slice(0, 15);

          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatdPrice: price.format(Number(item.price)),
              formatdMarket: price.format(Number(item.market_cap)),
              numberDelta: parseFloat(item.delta_24h.replace(",", "."))
            };

            return formated;
          });

          setCoins(formatResult);
        });
    }
    getData();
  }, []);

  function handleSearch(e: FormEvent) {
    e.preventDefault();

    if (inputValue === "") return;

    navigate(`/detail/${inputValue}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          placeholder="Digite o simbolo da moeda: BTC.."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>

        <tbody id="tbody">
          {coins.map((coin) => (
            <tr className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span>{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado">
                {coin.formatdMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {coin.formatdPrice}
              </td>
              <td
                className={
                  coin?.numberDelta >= 0 ? styles.tdProfit : styles.tdLoss
                }
                data-label="Volume"
              >
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </main>
  );
}
