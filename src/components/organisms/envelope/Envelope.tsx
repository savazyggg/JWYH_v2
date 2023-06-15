import "./envelope.css";
const Envelope = () => {
  return (
    <>
      <div className="envelope envelopeLetterCarousel ">
        <div className="cover top  loopLetterAnimation"></div>
        <div className="cover bottom right"></div>
        <div className="cover left"></div>
        <div className="introLetter loopPartOutNInAnimation"></div>
      </div>
    </>
  );
};
export default Envelope;
