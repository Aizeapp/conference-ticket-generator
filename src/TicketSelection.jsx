import { useState } from "react";

function TicketSelection({ selectedTicket, setSelectedTicket, ticketCount, setTicketCount, onNext }) {
  const ticketTypes = [
    { id: "free", label: "Free", price: "$0", type: "Regular", access: "Access" },
    { id: "vip", label: "$150 VIP", price: "$150", type: "Premium", access: "Access" },
    { id: "vvip", label: "$150 VVIP", price: "$150", type: "Premium", access: "Access" },
  ];

  return (
    <div className="ticket-selection">
      <h1>Techember Fest '25</h1>
      <p className="event-details">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
      <p className="event-details">[Event Location] || March 15, 2025 | 7:00 PM</p>

      <div className="ticket-table">
        <div className="table-header">
          <div>Ticket Type</div>
          <div>Price</div>
          <div>Type</div>
          <div>Access</div>
        </div>
        {ticketTypes.map((ticket) => (
          <div
            key={ticket.id}
            className={`ticket-row ${selectedTicket === ticket.id ? "selected" : ""}`}
            onClick={() => setSelectedTicket(ticket.id)}
          >
            <div>{ticket.label}</div>
            <div>{ticket.price}</div>
            <div>{ticket.type}</div>
            <div>{ticket.access}</div>
          </div>
        ))}
      </div>

      <div className="tickets">
        <label>Number of Tickets:</label>
        <input
          type="number"
          value={ticketCount}
          onChange={(e) => setTicketCount(parseInt(e.target.value))}
          min="1"
        />
      </div>

      <div className="tickets">
        <strong>Selected Tickets:</strong> {ticketCount}
      </div>

      <div className="actions">
        <button className="cancel-button">Cancel</button>
        <button className="next-button" onClick={onNext} disabled={!selectedTicket}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TicketSelection;