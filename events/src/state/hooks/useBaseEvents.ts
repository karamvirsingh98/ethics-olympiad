import { Template } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../main";
import { BaseEvent } from "../types";

export default function useBaseEvents() {
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  useEffect(() => {
    client.service("api/events").find().then(setEvents);
    client.service("api/templates").find().then(setTemplates);
  }, []);
  return { events, templates };
}
