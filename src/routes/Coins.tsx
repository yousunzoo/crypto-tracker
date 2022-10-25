import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom, isDarkTAtom } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Container = styled.div`
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
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.liColor};
  color: ${(props) => props.theme.liTextColor};
  font-size: 18px;
  border-radius: 15px;
  margin-bottom: 10px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.liHoverColor};
  }
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.titleColor};
  font-weight: 700;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Togglebtn = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  left: 20px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.toggleColor};
  outline: none;
  border-radius: 10px;
  border-color: transparent;
  transition: background-color 0.3s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.liHoverColor};
  }
  font-size: 20px;
  width: 50px;
  height: 50px;
  text-align: center;
  z-index: 1;
  span {
    display: block;
    font-size: 16px;
  }
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {}
function Coins({}: ICoinsProps) {
  const darkAtom = useRecoilValue(isDarkAtom);
  const darkTAtom = useRecoilValue(isDarkTAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const setDarkTAtom = useSetRecoilState(isDarkTAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
    darkAtom ? setDarkTAtom("🌞") : setDarkTAtom("🌙");
  };
  const { isLoading, data } = useQuery<ICoin[]>("AllCoins", fetchCoins);
  // useQuery 함수는 fetcher 함수를 부르고 fetcher 함수가 loading 중이라면 react query에서 isLoading에서 알려줌. fetcher 함수가 끝나면 react query에서 json을 data에 넣음

  /*   const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100)); // api json data 중에서 100개만 가져오기
      setLoading(false);
    })();
  }, []); */

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.iconpacks.net/icons/1/free-coin-icon-794-thumb.png"
          sizes="16x16"
        />
      </Helmet>
      <Header>
        <Title>Crypto Tracker</Title>
        <Togglebtn onClick={toggleDarkAtom}>
          <span>{darkTAtom}</span>
        </Togglebtn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name, symbol: coin.symbol.toLowerCase() },
                }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.symbol}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;

// 현 상태의 문제점 : link를 타고 Coin 페이지로 들어갔다가 다시 홈페이지로 돌아오면 데이터가 reload 되면서 useEffect가 실행됨.
// --> 코인 개별페이지로 이동했다가 screen이 바뀌면서 state가 사라지고 홈페이지 돌아올 때마다  API request가 일어남
