import React from 'react';
import {ENTRY_TYPE_DESCRIPTIONS} from '../../types'

export interface EntryTypeProps {
    idEntryType: number
}
const EntryType:React.FC<EntryTypeProps> = ({idEntryType}) => {
    return (
        <span className="tc__action--type">
            {ENTRY_TYPE_DESCRIPTIONS[idEntryType] || 'Unknown'}
        </span>
    );
}

export default EntryType;
