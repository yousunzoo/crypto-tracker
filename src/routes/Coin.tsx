import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
  symbol: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${(props) => props.theme.titleColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  position: relative;
  padding: 20px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 20px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.itemColor};
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const BackBtn = styled.p`
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  left: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.toggleColor};
  outline: none;
  border-radius: 10px;
  border-color: transparent;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.liHoverColor};
  }
  a {
    display: block;
    padding: 10px 15px;
    transition: color 0.3s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  font-size: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
`;

const Description = styled.p`
  margin: 20px 0px;
  line-height: 1.2;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  background-color: ${(props) => props.theme.tabColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.tabTextColor};
  a {
    display: block;
  }
`;

interface ICoinProps {
  isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  // coinId가 변할 때마다 useEffect 다시 실행
  // coinId는 url 값이므로 같은 페이지 내에서 변할 일이 없음. */

  const loading = infoLoading || tickersLoading;
  return (
    <>
      <BackBtn>
        <Link to="/">🏠</Link>
      </BackBtn>
      <Container>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>

        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
          {/* 홈 화면을 통해서 왔을 때 / 바로 접속할 때 */}
        </Header>
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Overview>
              <OverviewItem>
                <span>RANK:</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>SYMBOL:</span>
                <span>{infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>PRICE:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>TOTAL SUPPLY:</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>MAX SUPPLY:</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/price`}>Price</Link>
              </Tab>
            </Tabs>

            <Switch>
              <Route path={`/:coinId/price`}>
                <Price coinId={coinId} />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart isDark={isDark} coinId={coinId} />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </>
  );
}
export default Coin;
