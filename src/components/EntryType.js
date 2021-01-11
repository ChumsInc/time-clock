import React from 'react';
import {ENTRY_TYPE_DESCRIPTIONS} from '../constants'

const EntryType = ({idEntryType}) => {
    return (
        <span className="tc__action--type">
            {ENTRY_TYPE_DESCRIPTIONS[idEntryType] || 'Unknown'}
        </span>
    );
}

export default EntryType;
