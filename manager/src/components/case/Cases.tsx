import { AppState } from "../../state/types";
import ObjectMap from "../util/ObjectMap";
import CaseComponent from "./Case";

export default function Cases({ state }: { state: AppState }) {
  const {
    cases: [cases, { setOne, setOneField, removeOne }],
  } = state;

  return (
    <div>
      {cases && (
        <ObjectMap
          object={cases}
          map={(id) => (
            <CaseComponent
              Case={cases![id]}
              setOneField={setOneField}
              removeOne={removeOne}
            />
          )}
        />
      )}
    </div>
  );
}
