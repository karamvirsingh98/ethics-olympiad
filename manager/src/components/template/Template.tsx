import { User, Event, Template } from "@ethics-olympiad/types";
import Heats from "./subcomponents/Heats";
import Timers from "./subcomponents/Timers";
import templateConfigHelpers, {
  formatTemplateLevel,
  templateTitleHelpers,
} from "./helpers";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import useCollection, {
  CollectionFunctions,
  SetOneField,
} from "../../state/hooks/useCollection";
import { client } from "../../main";
import { getDefaultEvent } from "../../state/defaults";
import EventsComponent from "./subcomponents/Events";
import EventComponent from "../event/Event";
import ToggleInput from "../util/ToggleInput";
import TitleButtons from "../event/subcomponents/TitleButtons";
import Divider from "../util/Divider";
import { Templates } from "../../state/types";

export default function TemplateComponent({
  user,
  templateState,
  editing,
  setEditing,
}: {
  user: User;
  templateState: [
    templates: Templates,
    templateFunctions: CollectionFunctions<Template>
  ];
  editing: boolean;
  setEditing: (editing: boolean) => void;
}) {
  const navigate = useNavigate();
  const { templateID, ...params } = useParams();
  const [templates, templateFunctions] = templateState;
  const [eventEditing, setEventEditing] = useState(false);
  const [inEvent, setInEvent] = useState(false);

  function getDepth() {
    const p = window.location.pathname;
    let depth = 0;
    for (let i = 0; i < p.length; i++) {
      if (p[i] === "/") depth++;
    }
    return depth;
  }

  useEffect(() => {
    setInEvent(getDepth() > 2);
  }, [window.location.pathname]);

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
    setEventEditing(true);
    document.getElementById("event-title")?.focus();
    setEventEditing(true);
  };

  return (
    <div className="template">
      {template && (
        <TemplateTitle
          editing={editing}
          template={template}
          setEditing={setEditing}
          templateFunctions={templateFunctions}
          hideButtonsWhen={inEvent}
        />
      )}
      <Divider />
      {template && events && (
        <div
          style={{
            display: " grid",
            gridTemplateColumns: "3fr auto 1fr",
            gap: "1rem",
            paddingTop: "1rem",
          }}
        >
          <Routes>
            <Route
              path="/*"
              element={
                <TemplateConfig
                  editing={editing}
                  user={user}
                  template={template}
                  setOneField={templateFunctions.setOneField}
                />
              }
            />
            <Route
              path="/:eventID"
              element={
                Object.keys(events).length > 0 && (
                  <EventComponent
                    eventState={[events, eventFunctions]}
                    editing={eventEditing}
                    setEditing={setEventEditing}
                  />
                )
              }
            />
          </Routes>
          <Divider vertical />
          <EventsComponent
            events={events!}
            onNewClick={createEvent}
            templateID={template._id!}
            setEditing={setEventEditing}
            isTemplateEditing={editing}
            isEventEditing={eventEditing}
            inEvent={inEvent}
          />
        </div>
      )}
    </div>
  );
}

function TemplateTitle({
  editing,
  template,
  setEditing,
  templateFunctions,
  hideButtonsWhen,
}: {
  editing: boolean;
  template: Template;
  setEditing: (editing: boolean) => void;
  templateFunctions: CollectionFunctions<Template>;
  hideButtonsWhen?: boolean;
}) {
  const { getTitle, rename, ...helpers } = templateTitleHelpers(
    editing,
    template,
    templateFunctions,
    setEditing
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ToggleInput
        editing={editing}
        value={getTitle()}
        onEdit={rename}
        fontSize="2rem"
        id={"template-title"}
        style={{ width: "50%" }}
        placeholder="Name This Template"
      />
      <div> {formatTemplateLevel(template.level)} </div>
      {!hideButtonsWhen && (
        <TitleButtons
          editing={editing}
          toggleEditing={() => setEditing(!editing)}
          {...helpers}
          extraText="Template"
        />
      )}
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
  const { addHeat, removeHeat, editTimer } = useMemo(
    () => templateConfigHelpers(template, setOneField),
    [template]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "1rem",
      }}
    >
      <Heats
        editing={editing}
        user={user}
        template={template}
        addHeat={addHeat}
        removeHeat={removeHeat}
        setOneField={setOneField}
      />
      <Divider vertical />
      <Timers
        editing={editing}
        timers={template.timers}
        onConfirm={editTimer}
      />
    </div>
  );
}
