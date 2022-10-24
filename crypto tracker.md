## 메인페이지

/ -> All coins (Home screen)

## 서브페이지

/:id -> ex) /btc -> Coin Detail (detail screen)

## nesting : 한 라우터 안에 스크린 중첩

/btc/information
/btc/chart

---

# style setting

: styled-component로부터 createGlobalStyle 기능 사용 가능

createGlobalStyle : 전역에 적용할 수 있는 스타일

- 사용 방법 : const GlobalStyle = createGlobalStyle`적용할 스타일 내용`
- return 부분에서 전체를 <></> (React.Fragment)로 감싸준뒤 <GlobalStyle /><Router /> 순으로 작성

- 폰트 적용하려면 createGlobalStyle``내부에 @import url('') 작성, body 부분에`font-family : 폰트 이름` 작성

# react-router

- Link : 해당 링크로 연결해주는 컴포넌트
- react router link들은 anchor로 바뀐다.
- handle event도 있음
  `<Link to={`/링크주소(보통 id)`}>링크 내용</Link>`

# interface

`const [coins, setCoins] = useState<CoinInterface[]>([]);`
CoinInterface[] : 배열형식임을 알려줌

# Link로부터 state 받아오기

- Link를 통해서 state 등의 정보를 페이지로 보낼 수 있음
- `<Link to={{pathname=`/${coin.name}`, state: { name: coin.name },}}>`
- 세부 페이지에서 `import {useLocation} from "react-router-dom";`
- `const { state } = useLocation<RouteState>();`
- useLocation()으로 Link로부터 받은 데이터 불러오기

- Coin 페이지는 홈페이지를 통해서 접근해야지만 데이터 불러올 수 있음.
- Coin 페이지에 직접 접근했을 때 띄워줄 메세지 필요
- `{state?.name || "Loading.."}` : state가 존재하는 경우에 state에 name이 존재한다면 보여주고 아닐 시 "Loading"을 띄워라. --> 옵셔널 체이닝 `?.`

# Coin data

코인 정보 : https://api.coinpaprika.com/v1/coins/btc-bitcoin
코인 가격 : https://api.coinpaprika.com/v1/tickers/btc-bitcoin

- 현재 문제) 코인 정보와 가격에 대한 state를 만들었을 때, info와 priceInfo는 TS에서 빈 배열로 인식을 해서 에러를 발생시킨다.

- 객체로 된 데이터를 가져와서 TS interface 세팅할 때
  1. 콘솔 창에서 각 객체를 오른쪽 마우스 클릭 후 set global Values
  2. Object.keys(temp1).join() => temp1 객체의 키 값을 문자형식으로 가져옴
  3. Object.values(temp1).map(v => typeof v).join() => temp1 객체의 값의 타입을 문자형식으로 가져옴

# VSCode shortcut

- ctrl + D : 같은 문자열 선택
- shift + Alt + i : 선택한 모든 문자열의 가장 우측 끝으로 포커싱
- ctrl + shift + 오른쪽 화살표 : 현재 선택한 문자열을 기준으로 우측 끝까지 문자열 전체 선택

# useEffect deps

- 일반적으로 페이지가 실행될 때 useEffect를 한번 실행하기 위해선 useEffect(()=>{},[]) 으로 deps 단계에 빈 배열을 넣음.

- hooks는 최상의 상태를 유지하기 위해 dependency에 값을 넣어야 한다.

# nested routes

- 중첩 라우팅 : 라우팅 맵핑을 최상위 컴포넌트 뿐만 아니라 여러 개의 컴포넌트에 걸쳐서 단계별로 정의하는 라우팅 기법

- http://localhost:3000/eth-ethereum/price 라고 입력했을 때 해당 코인의 가격 정보가 표시되고,
- http://localhost:3000/eth-ethereum/chart 라고 입력했을 때 해당 코인의 차트 정보가 표시되도록 하는 것

- 즉, 페이지 내에서 그 페이지에 대한 상세 정보를 표시 시키는 것

- 만들어야 할 것) price와 chart를 스위치하는 탭
- Link와 Switch 컴포넌트를 이용해 만들기

- useRouteMatch("/링크") : 지금 페이지 링크와 RouteMatch 링크가 동일하다면 객체를 반환, 아니라면 null 값을 반환
- Tab에 isActive 속성을 부여해서 해당 탭이 실행되었을 때 style 수정

# React query

- fetcher 함수를 만들 수 있다. -- useStatae, useEffect를 대신해줌!
- 아주 강력한 caching 매커니즘을 가지고 있음 -- 데이터를 쿼리로 캐시에 저장해줌.

- fetcher 함수는 꼭 fetch promise를 return해줘야 한다.

- useQuery(queryKey, queryFn)
- 첫번째 인수에는 queryKey, 두번째 인수에는 fetcher 함수
- key는 react query 캐시 시스템에서 저장되고 작동되기 위해 고유한 값이여야 한다.

- queryFn 자리에는 함수의 형태로 인자를 넘겨줘야 한다.
  - 함수가 들어가야 하지 함수의 실행값이 들어가면 안됨.
  - 함수에 argument가 있을 때 : `useQuery(["info", coinId],() => fetchCoinInfo(coinId))` 형식
  - 함수에 argument가 없을 때 : `useQuery("AllCoins",() => fetchCoin)` 형식
- react query를 이용하면 세부 페이지로 이동했다 다시 홈페이지로 넘어와도 리로딩이 되지 않는다.
  => react query가 데이터를 캐시에 저장해두기 때문
- `const { isLoading, data } = useQuery<ICoin[]>("AllCoins", fetchCoins);`
- isLoading 에서 fetch가 이뤄지는 동안에는 true, 데이터를 받은 후에는 false 값 반환
- fetch 가 이뤄지면 data에 json 데이터 반환.

- 한 파일 안에서 useQuery를 많이 쓸 때, key 값을 다르게 설정해줘야 한다.
  `const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>( ["info", coinId], () => fetchCoinInfo(coinId) );`
- queryKey는 배열형식으로 줄 수 있음.
- isLoading과 data도 각 객체에 이름을 부여해줄 수 있음

`import { ReactQueryDevtools } from "react-query/devtools";`
`<ReactQueryDevtools initialIsOpen={true} />`
-> react query에서 일어나고 있는 일들을 개발도구로 볼 수 있음

# Chart component

- 우리가 보고자 하는 가격의 암호화폐가 무엇인지 알아야 한다.

# APEXCHARTS

: 차트를 제공해주는 라이브러리
npm i --save react-apexcharts apexcharts

- 제공된 데이터가 문자일 때, 숫자형으로 바꾸는 방법
  => `data : data?.map((price) => parseFloat(price.close)) ?? []`
  - 앞의 계산값이 존재하지 않으면 빈 배열 반환
- `<Apexcharts type="line" series={[ name : 'sales', data : [10,20,30,40,50] ]} options ={{theme : {mode : "dark"}}}/>` 형식으로 입력

- https://apexcharts.com/docs/options/ 에서 차트 옵션 확인 가능
