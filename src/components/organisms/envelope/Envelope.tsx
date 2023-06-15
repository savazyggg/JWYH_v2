import { useEffect, useRef } from "react";
import "./envelope.css";
const Envelope = () => {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const envelopeTopRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const openEnvelopeOnHover = () => {
    envelopeTopRef.current?.classList.remove("close");
    envelopeTopRef.current?.classList.add("open");

    pullOutPartial();
  };

  const pullOutPartial = () => {
    letterRef.current?.classList.remove("in");
    letterRef.current?.classList.add("out-partial");
  };

  const closeEnvelopeOnHover = () => {
    putIn();
    setTimeout(function () {
      envelopeTopRef.current?.classList.remove("open");
      envelopeTopRef.current?.classList.add("close");
    }, 400);
  };

  const putIn = () => {
    letterRef.current?.classList.remove("out-partial");
    letterRef.current?.classList.add("in");
  };

  useEffect(() => {
    envelopeRef.current?.addEventListener("mouseover", () => {
      openEnvelopeOnHover();
    });
    envelopeRef.current?.addEventListener("mouseout", () => {
      closeEnvelopeOnHover();
    });
  }, []);

  return (
    <>
      <div ref={envelopeRef} className="envelope">
        <div ref={envelopeTopRef} className="cover top close"></div>
        <div className="cover bottom right"></div>
        <div className="cover left"></div>
        <div ref={letterRef} className="introLetter"></div>
      </div>
    </>
  );
};
export default Envelope;
