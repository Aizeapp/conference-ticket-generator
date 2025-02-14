import { useState } from "react";
import "./App.css";
import TicketSelection from "./TicketSelection";
import ProfileCompletion from "./ProfileCompletion";

function App() {
  const [step, setStep] = useState(1); 
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);

  const handleNext = () => {
    if (step === 1 && selectedTicket) {
      setStep(2); 
    }
  };

  return (
    <div className="container">
      {step === 1 && (
        <TicketSelection
          selectedTicket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
          ticketCount={ticketCount}
          setTicketCount={setTicketCount}
          onNext={handleNext}
        />
      )}

      {step === 2 && <ProfileCompletion />}
    </div>
  );
}

export default App;