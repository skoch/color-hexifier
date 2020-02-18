import 'normalize.css';

import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import Index from './pages/Index';
import Secondary from './pages/Secondary';

const Root = styled.section`
  display: flex;
  background-color: transparent;
`;

const Main = styled.section`
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <Root>
      <BrowserRouter>
        <Main className="content">
          <Switch>
            <Route exact path="/:c1?/:c2?/:opacity?" component={Secondary} />
            {/* <Route exact path="/:c1?/:c2?/:opacity?" component={Index} /> */}
            <Route exact path="/">
              <Redirect to="/d2d200/72e8e8/50" />
            </Route>
          </Switch>
        </Main>
      </BrowserRouter>
    </Root>
  );
};

export default App;
