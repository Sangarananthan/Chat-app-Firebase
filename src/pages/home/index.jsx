import { Col, Grid, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomsProvider } from '../../context/roomsContext';
import { Route, Switch } from 'react-router-dom';
import Chat from './Chat';
import { useMediaQuery } from '../../misc/Custom-hooks';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'; // Adjusted import for accuracy

const Home = () => {
  // Custom hook for detecting if the screen size is desktop
  const isDesktop = useMediaQuery(`(min-width: 992px)`);
  // Use route match to determine if the route is an exact match
  const { isExact } = useRouteMatch();

  // Determine if the sidebar should be rendered
  const canRenderSideBar = isDesktop || isExact;

  return (
    // RoomsProvider context for handling room data
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {/* Conditional rendering of Sidebar */}
          {canRenderSideBar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}

          <Switch>
            {/* Route for displaying chat based on chatId */}
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            {/* Fallback for when no specific chat is selected */}
            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h6 className="text-center mt-page">Please Select a Chat</h6>
                </Col>
              )}
              {!isDesktop && (
                <Col xs={24} className="h-100">
                  <h6 className="text-center mt-page">
                    Please select a chat from the sidebar menu
                  </h6>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
