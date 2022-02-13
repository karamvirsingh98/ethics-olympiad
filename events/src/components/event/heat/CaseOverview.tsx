import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Case } from "../../../state/types";
import { generateEmbed } from "../../../util/helpers";
import IfElse from "../../util/IfElse";

export default function CaseOverview({ _case }: { _case: Case }) {
  const navigate = useNavigate();

  return (
    <div className="case-overview">
      <div className="case-title">
        {_case.title}
        <button
          className="green"
          onClick={() => navigate("./stage1")}
          style={{ fontSize: "2rem" }}
        >
          Start Round
        </button>
      </div>
      <IfElse
        showIf={_case.isVideo}
        showTrue={<Video url={_case.videoURL!} />}
        showFalse={<Text text={_case.bodyText!} />}
      />
    </div>
  );
}

function Video({ url }: { url: string }) {
  const [loading, set] = useState(true);

  return (
    <Fragment>
      {loading && <div className="spinner" />}
      <IfElse
        showIf={generateEmbed(url) ? true : false}
        showTrue={
          <iframe
            frameBorder="0"
            src={generateEmbed(url)}
            style={{ width: "100%", height: "100%" }}
            onLoad={() => set(false)}
            title="Case Video"
          />
        }
        showFalse={
          <div style={{ placeSelf: "center", fontSize: "2rem" }}>
            {" "}
            Error Loading Video...{" "}
          </div>
        }
      />
    </Fragment>
  );
}

function Text({ text }: { text: string }) {
  return (
    <div style={{ width: "100%", overflowY: "scroll" }}>
      <div className="text-case">{text}</div>
    </div>
  );
}
