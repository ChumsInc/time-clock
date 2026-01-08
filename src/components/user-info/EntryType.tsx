import {ENTRY_TYPE_DESCRIPTIONS} from '../../types'

export interface EntryTypeProps {
    idEntryType: number
}

export default function EntryType({idEntryType}: EntryTypeProps) {
    return (
        <span>
            {ENTRY_TYPE_DESCRIPTIONS[idEntryType] || 'Unknown'}
        </span>
    );
}
