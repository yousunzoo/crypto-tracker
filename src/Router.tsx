import { HashRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  toggleDark: () => void;
  isDarkIcon: string;
  isDark: boolean;
}
function Router({ toggleDark, isDarkIcon, isDark }: IRouterProps) {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark} isDarkIcon={isDarkIcon} />
        </Route>
      </Switch>
    </HashRouter>
  );
}
export default Router;

// gh-pages로 publish 했을 때 fetch 함수가 다 뒤에 /react-masterclass 붙은 채로 되어서 오류 생성됨
// 해결책: BrowserRouter에 basename="/프로젝트폴더명" 작성
