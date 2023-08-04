import "./App.css";
import StepForm3 from "./component/StepForm3";
import { Routes, Route } from "react-router-dom";
import AllBanks from "./pages/allbanks";
import FormBuilderView from "./pages/form";
import Navbar from "./header/navbar";
import StepData from "./pages/step";
import AddBankPage from "./pages/banks/addbank";
import BankDetailsPage from "./pages/banks/bankdetails";
import AddStep from "./Step/step";
import Forms from "./vikas.js/table";
function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllBanks />}></Route>
        <Route path="/add-bank-From" element={<StepForm3 />}></Route>
        <Route path="/b" element={<FormBuilderView />}></Route>
        <Route path="/all-forms/:bankId" element={<StepData />}></Route>
        <Route path="/add-bank" element={<AddBankPage />}></Route>
        <Route path="/bank-details/:id" element={<BankDetailsPage />}></Route>
        <Route path="/bankformlayout/:bankId" component={StepData} />
        <Route path="/steps" element={<AddStep />} />
        <Route path="/vikas" element={<Forms />} />
      </Routes>
    </div>
  );
}

export default App;

