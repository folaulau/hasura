import React from "react";
import { useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import GapUpOrDown from "../pages/GapUpOrDown";
import Dashboard from "../pages/Dashboard";
import OffHourMove from "../pages/OffHourMove";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Trades from "../pages/Trades";
import TradeHistory from "../components/TradeHistory";
import Journal from "../pages/Journal";
import JournalAddUpdate from "../pages/JournalAddUpdate";
import JournalEntry from "../pages/JournalEntry";
import StockPage from "../pages/StockPage";
import OptionPage from "../pages/OptionPage";
import ChartPatternPage from "../pages/chart_patterns/ChartPatternPage";
import DoubleTopChartPatternPage from "../pages/chart_patterns/DoubleTopChartPatternPage";
import DoubleBottomChartPatternPage from "../pages/chart_patterns/DoubleBottomChartPatternPage";
import BollingerBandsPatternPage from "../pages/chart_patterns/BollingerBands";
import ChartPatternOutlet from "../pages/chart_patterns/ChartPatternOutlet";
import StrategyOutlet from "../pages/strategies/StrategyOutlet";
import StrategyPage from "../pages/strategies/StrategyPage";
import EarningStrategyPage from "../pages/strategies/EarningStrategy";
import GapUpDownStrategyPage from "../pages/strategies/GapUpDownStrategy";
import MomentumStrategyPage from "../pages/strategies/MomentumStrategy";
import EarningReportPage from "../pages/EarningReportPage";
import AllStocksPage from "../pages/AllStocksPage";
import AllCryptoPage from "../pages/AllCryptoPage";
import SecurityUpdatePage from "../pages/SecurityUpdatePage";
import SecurityCreatePage from "../pages/SecurityCreatePage";
import IndicatorPage from "../pages/indicators/IndicatorPage";
import IndicatorOutlet from "../pages/indicators/IndicatorOutlet";
import VwapPage from "../pages/indicators/VwapPage";
import RsiPage from "../pages/indicators/RsiPage";
import EmaIndicatorPage from "../pages/indicators/EmaIndicatorPage";
import MacdPage from "../pages/indicators/MacdPage";
import PriceActionStrategyPage from "../pages/strategies/PriceActionStrategy";
import HeadAndShouldersChartPatternPage from "../pages/chart_patterns/HeadAndShouldersChartPatternPage";
import FlagChartPatternPage from "../pages/chart_patterns/FlagChartPatternPage";
import WedgeChartPatternPage from "../pages/chart_patterns/WedgeChartPatternPage";
import VolumeIndicatorPage from "../pages/indicators/VolumeIndicatorPage";
import OptionTradingStrategyPage from "../pages/strategies/OptionTradingStrategy";
import ShortSqueezeChartPatternPage from "../pages/chart_patterns/ShortSqueezeChartPatternPage";
import AlertPage from "../pages/AlertPage";

function PrivateRoutes() {

  useEffect(() => {
  }, []);


  return (
    <>
    <Header /> 
    <div className="row">
      <div className="col-12 col-sm-2">
        <Navbar/>
      </div>
      <div className="col-12 col-sm-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="gap-up-down" element={<GapUpOrDown />} />
            <Route path="off-hour-moves" element={<OffHourMove />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/option" element={<OptionPage />} />
            <Route path="security-update" element={<SecurityUpdatePage />} />
            <Route path="security-create" element={<SecurityCreatePage />} />

            <Route path="all-stocks" element={<AllStocksPage />} />
            <Route path="all-cryptos" element={<AllCryptoPage />} />
            
            <Route path="trade-history" element={<TradeHistory />} />
            <Route path="trades" element={<Trades />} />
            <Route path="journal" element={<Journal />} />
            <Route path="journal/add-update" element={<JournalAddUpdate />} />
            <Route path="journal/view" element={<JournalEntry />} />
            <Route path="earning-report" element={<EarningReportPage />} />
            <Route path="alerts" element={<AlertPage />} />

            <Route path="chart-patterns" element={<ChartPatternOutlet />}>
              <Route index element={<ChartPatternPage />} />
              <Route path="double-top" element={<DoubleTopChartPatternPage />} />
              <Route path="double-bottom" element={<DoubleBottomChartPatternPage />} />
              <Route path="head-and-shoulders" element={<HeadAndShouldersChartPatternPage />} />
              <Route path="flag" element={<FlagChartPatternPage />} />
              <Route path="wedge" element={<WedgeChartPatternPage />} />
              <Route path="short-squeeze" element={<ShortSqueezeChartPatternPage />} />
              <Route path="bollinger-bands" element={<BollingerBandsPatternPage />} />
              <Route path="*" element={<p>Page not found: 404!</p>} />
            </Route>

            <Route path="strategies" element={<StrategyOutlet />}>
              <Route index element={<StrategyPage />} />
              <Route path="price-action" element={<PriceActionStrategyPage />} />
              <Route path="earning" element={<EarningStrategyPage />} />
              <Route path="gap-up-down" element={<GapUpDownStrategyPage />} />
              <Route path="momentum" element={<MomentumStrategyPage />} />
              <Route path="options" element={<OptionTradingStrategyPage />} />
              <Route path="*" element={<p>Page not found: 404!</p>} />
            </Route>

            <Route path="indicators" element={<IndicatorOutlet />}>
              <Route index element={<IndicatorPage />} />
              <Route path="vwap" element={<VwapPage />} />
              <Route path="rsi" element={<RsiPage />} />
              <Route path="ema" element={<EmaIndicatorPage />} />
              <Route path="macd" element={<MacdPage />} />
              <Route path="volume" element={<VolumeIndicatorPage />} />
            </Route>

            <Route path="*" element={<p>Page not found: 404!</p>} />
          </Routes>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default PrivateRoutes;