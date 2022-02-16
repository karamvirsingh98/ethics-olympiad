import { client } from "../../main";
import { RemoveOne, SetOne } from "../../state/hooks/useCollection";
import { Case } from "../../state/types";

export default function caseHelpers(setOne: SetOne<Case>, removeOne: RemoveOne, setEditing: (editing: boolean) => void) {
  return {
    saveEdits: (id: string, _case: Case) => async () => {
      const updated = await client.service("/api/cases").update(id, _case);
      setOne(updated._id, updated);
      setEditing(false);
    },
    cancelEdits: (id: string) => async () => {
      setOne(id, await client.service("/api/cases").get(id));
      setEditing(false);
    },
    deleteCase: (id: string) => async () => {
      await client.service("api/cases").remove(id);
      removeOne(id);
    },
  };
}