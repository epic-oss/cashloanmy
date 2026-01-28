"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LeadFormContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <LeadFormContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);
  if (context === undefined) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return context;
}
