import { User, Event, Template } from "@ethics-olympiad/types";
import { useTemplates } from "../../App";
import Heats from "./subcomponents/Heats";
import Timers from "./subcomponents/Timers";
import templateConfigHelpers, { templateTitleHelpers } from "./helpers";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useCollection, {
  CollectionFunctions,
  RemoveOne,
  SetOneField,
} from "../../state/hooks/useCollection";
import { client } from "../../main";
import { getDefaultEvent } from "../../state/defaults";
import Items from "../../pages/page/Items";
import EventComponent from "../event/Event";
import ToggleInput from "../util/ToggleInput";
import TitleButtons from "../event/subcomponents/TitleButtons";
import Divider from "../util/Divider";

export default function TemplateComponent({ user }: { user: User }) {
  const navigate = useNavigate();
  const { templateID } = useParams();
  const [templates, templateFunctions] = useTemplates(user);
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
      {template && (
        <TemplateTitle
          editing={editing}
          template={template}
          setEditing={setEditing}
          templateFunctions={templateFunctions}
        />
      )}
      <Divider />
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
              template && (
                <TemplateConfig
                  editing={editing}
                  user={user}
                  template={template}
                  setOneField={templateFunctions.setOneField}
                />
              )
            }
          />
          {events && template && (
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
        <Divider vertical />
        <Items events={events!} onNewClick={createEvent} />
      </div>
    </div>
  );
}

function TemplateTitle({
  editing,
  template,
  setEditing,
  templateFunctions,
}: {
  editing: boolean;
  template: Template;
  setEditing: (editing: boolean) => void;
  templateFunctions: CollectionFunctions<Template>;
}) {
  const { getTitle, rename, ...helpers } = templateTitleHelpers(
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
      />
      <TitleButtons
        editing={editing}
        toggleEditing={() => setEditing(!editing)}
        {...helpers}
      />
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
  const { addHeat, removeHeat, editTimer } = templateConfigHelpers(
    template,
    setOneField
  );

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1rem" }}
    >
      <Heats
        editing={editing}
        user={user}
        template={template}
        addHeat={addHeat}
        removeHeat={removeHeat}
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
