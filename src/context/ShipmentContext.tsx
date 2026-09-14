/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { seedShipments, type Shipment, type ShipmentStatus } from '@/data/shipments';
import { activeTracking as defaultActiveTracking } from '@/data/dashboardStats';

export interface ActiveTrackingData {
  shipmentId: string;
  status: ShipmentStatus | string;
  scheduleNote: string;
  courierLabel: string;
  courierName: string;
  courierCompany: string;
  origin: { label: string; date: string };
  destination: { label: string; date: string };
}

interface ShipmentContextType {
  shipments: Shipment[];
  addShipment: (shipment: Omit<Shipment, 'seedOrder'>) => Shipment;
  updateShipmentStatus: (id: string, status: ShipmentStatus) => void;
  deleteShipment: (id: string) => void;
  activeTracking: ActiveTrackingData;
  setActiveTrackingShipment: (shipmentId: string) => void;
  selectedShipmentForDetail: Shipment | null;
  setSelectedShipmentForDetail: (shipment: Shipment | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

const STORAGE_KEY = 'shipnow_shipments_v1';

export function ShipmentProvider({ children }: { children: ReactNode }) {
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage errors
    }
    return seedShipments;
  });

  const [activeTracking, setActiveTracking] = useState<ActiveTrackingData>(defaultActiveTracking);
  const [selectedShipmentForDetail, setSelectedShipmentForDetail] = useState<Shipment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
    } catch {
      // ignore storage errors
    }
  }, [shipments]);

  function addShipment(data: Omit<Shipment, 'seedOrder'>): Shipment {
    const newShipment: Shipment = {
      ...data,
      seedOrder: 0, // 0 places it at the very top of Newest sort
    };
    setShipments((prev) => [newShipment, ...prev]);
    return newShipment;
  }

  function updateShipmentStatus(id: string, status: ShipmentStatus) {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const progress =
            status === 'Delivered' ? 100 : status === 'In Transit' ? 60 : status === 'Out for Delivery' ? 85 : 30;
          return { ...s, status, progress };
        }
        return s;
      }),
    );

    if (activeTracking.shipmentId === id) {
      setActiveTracking((prev) => ({
        ...prev,
        status,
        scheduleNote: status === 'Delivered' ? 'Completed' : 'On Schedule',
      }));
    }
  }

  function deleteShipment(id: string) {
    setShipments((prev) => prev.filter((s) => s.id !== id));
  }

  function setActiveTrackingShipment(shipmentId: string) {
    const found = shipments.find((s) => s.id.toLowerCase() === shipmentId.toLowerCase());
    if (found) {
      setActiveTracking({
        shipmentId: found.id,
        status: found.status,
        scheduleNote: found.status === 'Delivered' ? 'Delivered successfully' : 'On Schedule',
        courierLabel: 'Carrier',
        courierName: found.company,
        courierCompany: found.carrier,
        origin: { label: found.originCity, date: found.originDate },
        destination: { label: found.destinationCity, date: found.destinationDate },
      });
    }
  }

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        addShipment,
        updateShipmentStatus,
        deleteShipment,
        activeTracking,
        setActiveTrackingShipment,
        selectedShipmentForDetail,
        setSelectedShipmentForDetail,
        isCreateModalOpen,
        setIsCreateModalOpen,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipments() {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
}
