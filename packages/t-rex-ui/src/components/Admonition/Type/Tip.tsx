import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '../Layout';
import AdmonitionIcon from '../Icon';

const infimaClassName = 'alert alert--success';

const defaultProps = {
  icon: <AdmonitionIcon />,
  title: (
    <Translate
      id="theme.admonition.tip"
      description="The default label used for the Tip admonition (:::tip)">
      tip
    </Translate>
  ),
};
export default function AdmonitionTypeTip(props: any) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
