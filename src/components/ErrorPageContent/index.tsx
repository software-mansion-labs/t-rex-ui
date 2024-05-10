import Translate from '@docusaurus/Translate';
import {
  ErrorBoundaryError,
  ErrorBoundaryTryAgainButton,
} from '@docusaurus/theme-common';

export default function ErrorPageContent({
  error,
  tryAgain,
}: {
  error: Error;
  tryAgain?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <main className="container margin-vert--xl">
      <div className="row">
        <div className="col col--6 col--offset-3">
          <h1 className="hero__title">
            <Translate
              id="theme.ErrorPageContent.title"
              description="The title of the fallback page when the page crashed">
              This page crashed.
            </Translate>
          </h1>
          <div className="margin-vert--lg">
            <ErrorBoundaryTryAgainButton
              onClick={tryAgain}
              className="button button--primary shadow--lw"
            />
          </div>
          <hr />
          <div className="margin-vert--md">
            <ErrorBoundaryError error={error} />
          </div>
        </div>
      </div>
    </main>
  );
}
