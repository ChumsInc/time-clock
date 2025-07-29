import {ENTRY_TYPE_DESCRIPTIONS} from '../../types'

export interface EntryTypeProps {
    idEntryType: number
}
const EntryType = ({idEntryType}:EntryTypeProps) => {
    return (
        <span>
            {ENTRY_TYPE_DESCRIPTIONS[idEntryType] || 'Unknown'}
        </span>
    );
}

export default EntryType;
