import React, { Suspense, lazy, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import GlobalStyles from 'style/Global'
import PageLoader from 'components/Loader/PageLoader'
import useAuth from 'hooks/useAuth'


const Home = lazy(() => import('views/Home'))

function App() {
  const history = createBrowserHistory()
  const { login } = useAuth()

  useEffect(() => {
    login()
  }, [login])

  return (
    <Router history={history}>
      <GlobalStyles />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
