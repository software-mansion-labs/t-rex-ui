import {type ReactNode} from 'react';
import clsx from 'clsx';
import EditThisPage from '../EditThisPage';

import LastUpdated from '../LastUpdated';
import styles from './styles.module.css';

type Props = {
  className?: string;
  editUrl?: string;
  lastUpdatedAt?: number;
  lastUpdatedBy?: string;
}

export default function EditMetaRow({
  className,
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
}: Props): ReactNode {
  return (
    <div className={clsx('row', className)}>
      <div className={clsx('col', styles.noPrint)}>
        {editUrl && <EditThisPage editUrl={editUrl} />}
      </div>
      <div className={clsx('col', styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}
