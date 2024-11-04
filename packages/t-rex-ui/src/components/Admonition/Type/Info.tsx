import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '../Layout';
import AdmonitionIcon from '../Icon';

const infimaClassName = 'alert alert--info';

const defaultProps = {
  icon: <AdmonitionIcon />,
  title: (
    <Translate
      id="theme.admonition.info"
      description="The default label used for the Info admonition (:::info)">
      info
    </Translate>
  ),
};
export default function AdmonitionTypeInfo(props: any) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}
