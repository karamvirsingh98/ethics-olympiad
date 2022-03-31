import { User, Event, Template } from "@ethics-olympiad/types";
import { useTemplates } from "../../App";
import Heats from "./subcomponents/Heats";
import Timers from "./subcomponents/Timers";
import templateHelpers from "./helpers";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Items from "../../pages/page/Items";
import useCollection, { SetOneField } from "../../state/hooks/useCollection";
import { client } from "../../main";
import { getDefaultEvent } from "../../state/defaults";
import EventComponent from "../event/Event";

export default function TemplateComponent({ user }: { user: User }) {
  const navigate = useNavigate();
  const { templateID } = useParams();
  const [templates, { setOneField }] = useTemplates(user);
  const [editing, setEditing] = useState(false);

  const [events, eventFunctions] = useCollection<Event>("events", {
    query: { owner: user._id, templateID },
  });

  const template = templates[templateID!];

  const createEvent = async () => {
    const newEvent: Event = await client
      .service("/api/events")
      .create(getDefaultEvent(templateID!));
    eventFunctions.setOne(newEvent._id!, newEvent);
    navigate(`./${newEvent._id!}`);
    setEditing(true);
    document.getElementById("event-title")?.focus();
  };

  return (
    <div className="template">
      <div> {template.templateTitle} </div>
      <div className="page">
        <Routes>
          <Route path="/" element={<TemplateConfig editing={editing} user={user} template={template} setOneField={setOneField}  />} />
          {events && (
            <Route
              path="/:eventID"
              element={
                <EventComponent
                  user={user}
                  eventState={[events, eventFunctions]}
                />
              }
            />
          )}
        </Routes>
        <Items events={events!} onNewClick={createEvent} />
      </div>
    </div>
  );
}

function TemplateConfig({
  editing,
  user,
  template,
  setOneField,
}: {
  editing: boolean;
  user: User;
  template: Template;
  setOneField: SetOneField<Template>;
}) {
  const { addHeat, removeHeat, editTimer } = templateHelpers(
    template,
    setOneField
  );

  return (
    <>
      <Heats
        editing={editing}
        user={user}
        template={template}
        addHeat={addHeat}
        removeHeat={removeHeat}
      />
      <Timers
        editing={editing}
        timers={template.timers}
        onConfirm={editTimer}
      />
    </>
  );
}
