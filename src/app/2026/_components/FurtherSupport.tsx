const FurtherSupport = () => {
  return (
    <div className="container box-border">
      <h2>Further Support.</h2>

      <p>
        If you require immediate support and you are feeling overwhelmed by
        stress or anxiety, you can contact the following for free, confidential,
        and anonymous support:
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-md bg-gray-700/60 px-8 py-4">
          <h3>UNSW Mental Wellbeing Support:</h3>
          <ul className="mt-4 flex flex-col gap-2">
            <li className="text-rose-500">
              <strong>
                If your life or somebody else&apos;s life is at risk, call 000
                immediately.
              </strong>
            </li>
            <li>
              <b>24/7 UNSW Mental Health Support</b>:{" "}
              <a className="underline underline-offset-2" href="tel:0293855418">
                (02) 9385 5418
              </a>
            </li>
            <li>
              <b>After-hours SMS support</b>: Text{" "}
              <a className="underline underline-offset-2" href="tel:0485826595">
                0485 826 595
              </a>{" "}
              for confidential one-to-one chat (Available Monday - Friday, 5pm -
              9am / 24 hours on weekends and public holidays)
            </li>
          </ul>
        </div>
        <div className="rounded-md bg-gray-700/60 px-8 py-4">
          <h3>For students in Australia:</h3>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <b>Lifeline (24 hour)</b>:{" "}
              <a className="underline underline-offset-2" href="tel:131114">
                13 11 14
              </a>{" "}
              phone line for crisis support and suicide prevention.
            </li>
            <li>
              <b>Mental Health Line (24 hour)</b>:{" "}
              <a className="underline underline-offset-2" href="tel:1800011511">
                1800 011 511
              </a>{" "}
              phone line for mental health acute care.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FurtherSupport;
