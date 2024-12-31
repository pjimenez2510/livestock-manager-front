"use client";

import React, { useCallback, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  View,
  SlotInfo,
  NavigateAction,
} from "react-big-calendar";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import "../../styles/react-calendar.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEventsQuery } from "../../hooks/use-event-query";
import { Event } from "../../interfaces/event.interface";
import { EventForm } from "../components/event-form";

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
};

const CalendarioEventos = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  // Usar el hook de react-query para obtener los eventos
  const { data: eventos = [], isLoading } = useEventsQuery();

  // Transformar los eventos para que coincidan con el formato esperado por Big Calendar
  const mappedEvents = eventos.map((evento: Event) => ({
    id: evento.id,
    title: evento.title,
    start: new Date(evento.startDate),
    end: new Date(evento.endDate),
    desc: evento.description,
    allDay: false,
    style: {
      backgroundColor: evento.color,
      borderColor: evento.color,
    },
  }));

  const handleNavigate = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (newDate: Date, view: View, action: NavigateAction) => {
      setDate(newDate);
    },
    []
  );

  const handleViewChange = useCallback((newView: View) => {
    setView(newView);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectEvent = useCallback((event: any) => {
    // Abrir el dialog con el evento seleccionado
    setSelectedEvent({
      id: event.id,
      title: event.title,
      description: event.desc,
      startDate: event.start,
      endDate: event.end,
      color: event.style.backgroundColor,
    });
    setIsDialogOpen(true);
  }, []);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    // Abrir el dialog para crear nuevo evento con las fechas preseleccionadas
    console.log(slotInfo.start.toISOString());
    setSelectedEvent({
      id: 0,
      title: "",
      description: "",
      startDate: slotInfo.start,
      endDate: slotInfo.end,
      color: "#3b82f6",
    });
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedEvent(undefined);
  }, []);

  if (isLoading) {
    return <div>Cargando eventos...</div>;
  }

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="h-[800px]">
            <Calendar
              localizer={localizer}
              events={mappedEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              messages={messages}
              date={date}
              onNavigate={handleNavigate}
              view={view}
              onView={handleViewChange}
              selectable
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              views={["month", "week", "day", "agenda"]}
              popup
              culture="es"
              components={{
                toolbar: (props) => (
                  <div className="flex gap-2 flex-col justify-center items-center md:flex-row md:justify-between mb-2">
                    <span className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => props.onNavigate("PREV")}
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => props.onNavigate("TODAY")}
                      >
                        Hoy
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => props.onNavigate("NEXT")}
                      >
                        Siguiente
                      </Button>
                    </span>
                    <span className="">{props.label}</span>
                    <span className="flex gap-2">
                      {["month", "week", "day", "agenda"].map((viewOption) => (
                        <Button
                          key={viewOption}
                          variant={view === viewOption ? "default" : "outline"}
                          onClick={() => props.onView(viewOption as View)}
                        >
                          {messages[viewOption as keyof typeof messages]}
                        </Button>
                      ))}
                    </span>
                  </div>
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                eventWrapper: (props: any) => (
                  <div
                    style={{
                      ...props.style,
                      backgroundColor: props.event.style?.backgroundColor,
                      borderColor: props.event.style?.borderColor,
                    }}
                  >
                    {props.children}
                  </div>
                ),
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.id ? "Editar evento" : "Crear nuevo evento"}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            event={selectedEvent}
            handleDialogClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CalendarioEventos;
