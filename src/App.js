import "./App.css";
import { Box, ThemeProvider } from "@material-ui/core";
import LotteryHome from "./pages/lotteryhome/LotteryHome";
import PaymentHome from "./pages/paymenthome/PaymentHome";
import WalletHome from "./pages/wallethome/WalletHome";

import { v1Theme } from "./utils/styles";

function App() {
  return (
    <ThemeProvider theme={v1Theme}>
      <Box className="app">
        <LotteryHome></LotteryHome>
      </Box>
    </ThemeProvider>
  );
}

export default App;
