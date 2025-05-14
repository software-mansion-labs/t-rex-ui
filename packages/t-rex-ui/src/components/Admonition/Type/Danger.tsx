import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '../Layout';
import AdmonitionIcon from '../Icon';
import { AdmonitionTypeProps } from '../Types';

const infimaClassName = 'alert alert--danger';

const defaultProps = {
  icon: <AdmonitionIcon />,
  title: (
    <Translate
      id="theme.admonition.danger"
      description="The default label used for the Danger admonition (:::danger)">
      danger
    </Translate>
  ),
};
export default function AdmonitionTypeDanger(props: AdmonitionTypeProps) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
