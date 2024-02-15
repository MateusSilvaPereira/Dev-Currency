/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../detail/detail.module.css";
interface CoinProps {
  symbol: string;
  name: string;
  price: string;
  market_cap: string;
  low_24h: string;
  high_24h: string;
  total_volume: string;
  delta_24h: string;
  formatedPrice: string;
  formatedMarcket: string;
  formatedLowprice: string;
  formatedHighprice: string;
  error?: string;
  numberDelta: number;
}

export function Detail() {
  const { cripto } = useParams();
  const [detail, setDetail] = useState<CoinProps>();
  const [loading, setLoanding] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    function getData() {
      fetch(
        `https://sujeitoprogramador.com/api-cripto/coin/?key=cd3af65c4345669a&symbol=${cripto}`
      )
        .then((response) => response.json())
        .then((data: CoinProps) => {

          if(data.error){
            navigate("/");
          }

          let price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          const resultData = {
            ...data,
            formatedPrice: price.format(Number(data.price)),
            formatedMarcket: price.format(Number(data.market_cap)),
            formatedLowprice: price.format(Number(data.low_24h)),
            formatedHighprice: price.format(Number(data.high_24h)),
            numberDelta: parseFloat(data.delta_24h.replace(",", "."))
          };

          setDetail(resultData);
          setLoanding(false);
        });
    }

    getData();
  }, [cripto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.center}>Carregando informações...</h1>
        <Link className={styles.btnLink} to='/'>
             Cancelar     
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}> {detail?.name}</h1>
      <p className={styles.center}> {detail?.symbol} </p>

      <section className={styles.content}>
        <p>
          <strong>Preço:</strong> {detail?.formatedPrice}
        </p>
        <p>
          <strong>Maior preço 24h:</strong> {detail?.formatedHighprice}
        </p>
        <p>
          <strong>Menor preço 24h:</strong> {detail?.formatedLowprice}
        </p>
        <p>
          <strong>Delta 24h:</strong>
          <span
            className={
             detail?.numberDelta && detail?.numberDelta >= 0 ? styles.profit : styles.loss
            }
          >
            {detail?.delta_24h}
          </span>
        </p>
        <p>
          <strong>Valor mercado:</strong> {detail?.formatedMarcket}
        </p>

        <Link to="/">Ver outras moedas</Link>
      </section>
    </div>
  );
}
